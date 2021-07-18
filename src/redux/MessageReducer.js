import {
    createSlice
} from '@reduxjs/toolkit';
import Logger from "../utils/Logger";

const LOG = new Logger("MessageReducer");

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        value: "Hello World!",
        text: "",
    },
    reducers: {
        updateMessage: (localState) => {
            LOG.info("Updating message.");
            localState.value = localState.text === "" ? "Hello World!" : "Hello " + localState.text + "!";
        },
        updateText: (localState, action) => {
            LOG.info("Text", action.payload);
            localState.text = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    updateMessage,
    updateText
} = messageSlice.actions;

export default messageSlice.reducer;