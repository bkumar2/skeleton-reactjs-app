import Logger from "../utils/Logger";

const LOG = new Logger("Reducer");

function getInitialState() {
    let initialState = {

    };
    return initialState;
}

function Reducer(state = getInitialState(), action) {
    LOG.info("action", action);
    switch (action.type) {
        default:
            return state;
    }
}
export default Reducer;