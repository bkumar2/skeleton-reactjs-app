import moment from 'moment';

const LOG_LEVEL = {
    DEBUG: 0,
    INFO: 1,
    ERROR: 2,
};

const LOG_LEVEL_NAMES = Object.keys(LOG_LEVEL);

class LoggerFactory {
    constructor(config) {
        this.config = config;
    }

    getLogger(name) {
        return new Logger(name, this);
    }

    shouldLog(name, level) {
        if (this.config.default !== null) {
            if (this.config.default.level <= level) {
                return true;
            }
        }
        if (this.config.loggers !== null && this.config.loggers.length > 0) {
            this.config.loggers.forEach(logger => {
                if (logger.name === name && logger.level <= level) {
                    return true;
                }
            });
        }
        return false;
    }

    log(name, level, ...params) {
        const NAME_LENGTH = 20;
        const NAME_EXTRA_LENGTH_REPLACE_STRING = "..";
        const DATE_FORMAT = 'YYYY-MM-DD,HH:mm:ss';
        if (this.shouldLog(name, level)) {
            let formattedName = name.length > NAME_LENGTH ?
                name.substring(0, NAME_LENGTH / 2) + NAME_EXTRA_LENGTH_REPLACE_STRING +
                name.substring(name.length - (NAME_LENGTH / 2 - NAME_EXTRA_LENGTH_REPLACE_STRING.length), name.length) :
                name.padStart(NAME_LENGTH);
            console.log(moment().format(DATE_FORMAT), formattedName,
                LOG_LEVEL_NAMES[level].padStart(5), ...params);
        }
    }
}

const LOGGER_FACTORY = new LoggerFactory({
    default: {
        level: LOG_LEVEL.INFO,
    },
    loggers: []
});

class Logger {
    constructor(name) {
        this.name = name;
        this.factory = LOGGER_FACTORY;
    }

    debug(...params) {
        this.factory.log(this.name, LOG_LEVEL.DEBUG, ...params);
    }

    info(...params) {
        this.factory.log(this.name, LOG_LEVEL.INFO, ...params);
    }

    error(...params) {
        this.factory.log(this.name, LOG_LEVEL.ERROR, ...params);
    }
}

export default Logger;