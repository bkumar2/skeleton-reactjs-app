import {
    configureStore
} from '@reduxjs/toolkit';
import MessageReducer from './MessageReducer';

export default configureStore({
    reducer: {
        message: MessageReducer
    },
});