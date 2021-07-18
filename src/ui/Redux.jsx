import { useSelector } from "react-redux";

function Redux(props) {
    const message = useSelector(state => state.message);
    return <div>
        <h3>Message from redux store ...</h3>
        <blockquote className="blockquote h1"><p>{message}</p></blockquote>
    </div>;
}
export default Redux;