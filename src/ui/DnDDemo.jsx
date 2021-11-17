import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDrag, useDrop } from 'react-dnd';

function DraggableText(props) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: props.type,
        item: { text: props.text },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return <div ref={drag} style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: "black",
        color: "white",
        cursor: "pointer",
        padding: "0 1em",
        fontSize: "2em",
        margin: "1em 0"
    }}>{props.text}</div>;
}

function DroppableContainer(props) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: props.accept,
        drop: (item) => {
            console.log("received drop:", item.text);
            props.onChange(item.text);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    return <Col ref={drop} style={{ backgroundColor: props.color }}>
        {props.data.map((text, i) => <DraggableText type={props.type} key={i} text={text} />)}
    </Col>
}

function move(text, arrayIndex, arrays, setArrays) {
    let sourceArray = arrays[(arrayIndex + 1) % 2].filter((item) => item !== text);
    let targetArray = [text, ...arrays[arrayIndex]];
    let newArrays = [];
    newArrays[arrayIndex] = targetArray;
    newArrays[(arrayIndex + 1) % 2] = sourceArray;
    setArrays(newArrays);
    console.log("Moving to arrayIndex:", arrayIndex, " result ", newArrays);
}

function DnDDemo(props) {
    const [arrays, setArrays] = useState([["A", "B", "C"], ["1", "2"]]);
    return <Row>
        <DroppableContainer type="left" accept="right" data={arrays[0]} onChange={(text) => move(text, 0, arrays, setArrays)} color="orange" />
        <DroppableContainer type="right" accept="left" data={arrays[1]} onChange={(text) => move(text, 1, arrays, setArrays)} color="skyblue" />
    </Row >;
}
export default DnDDemo;