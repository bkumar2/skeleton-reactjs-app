import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../redux/MessageReducer";

function ReduxDemo(props) {
    // local state for textbox
    const [text, setText] = useState("");
    // redux state for message updates
    const message = useSelector(state => state.message.value);
    const dispatch = useDispatch();
    return <div>
        <h1>Redux demo</h1>
        <input onChange={(event) => setText(event.target.value)} value={text}></input>
        <Button onClick={() => dispatch(updateMessage(text))}>
            Submit
        </Button>
        <h3>{message}</h3>
    </div>;
}
export default ReduxDemo;