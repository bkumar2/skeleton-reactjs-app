import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage, updateText } from "../redux/MessageReducer";

function Redux(props) {
    const message = useSelector(state => state.message.value);
    const text = useSelector(state => state.message.text);
    const dispatch = useDispatch();
    return <div>
        <h3>Message from redux store ...</h3>
        <input onChange={(event) => dispatch(updateText(event.target.value))} value={text}></input>
        <Button onClick={() => dispatch(updateMessage("test"))}>
            Submit
        </Button>
        <blockquote className="blockquote h1"><p>{message}</p></blockquote>
    </div>;
}
export default Redux;