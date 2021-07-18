import {
    createSlice
} from '@reduxjs/toolkit';
import Logger from "../utils/Logger";

const LOG = new Logger("MessageReducer");

export const messageSlice = createSlice({
    name: 'MessageReducer',
    initialState: {
        value: "Hello World!"
    },
    reducers: {
        updateMessage: (localState, action) => {
            let message = action.payload;
            LOG.info("Updating message:", message);
            localState.value = (message === "" ? "Hello World!" : "Hello " + message + "!");
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    updateMessage
} = messageSlice.actions;

export default messageSlice.reducer;