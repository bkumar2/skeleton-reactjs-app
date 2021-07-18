import { ListGroup } from "react-bootstrap";

function Libraries(props) {
    return <div>
        <h1>Libraries</h1>
        <ListGroup>
            <ListGroup.Item>React Router</ListGroup.Item>
            <ListGroup.Item>React Redux</ListGroup.Item>
            <ListGroup.Item>React Bootstrap</ListGroup.Item>
            <ListGroup.Item>React Data Table Component</ListGroup.Item>
            <ListGroup.Item>Axios</ListGroup.Item>
            <ListGroup.Item>MomentJS</ListGroup.Item>
        </ListGroup>
    </div>;
}
export default Libraries;