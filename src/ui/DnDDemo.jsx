import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

function DragDropItem(props) {
    const divRef = useRef(null);
    const [hoverPosition, setHoverPosition] = useState(0);
    let ITEM = { index: props.index, text: props.text };

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "item",
            drop: (droppedItem) => {
                console.log("received drop of:", droppedItem.index, droppedItem.text);
                props.onDrop(droppedItem, ITEM);
            },
            hover: (hoverItem, monitor) => {
                let hoverItemOffsetY = monitor.getClientOffset().y;
                let currentItemOffsetY = divRef.current.offsetTop;
                const HEIGHT = divRef.current.clientHeight;
                let yDiff = hoverItemOffsetY - currentItemOffsetY;
                if (yDiff > 0 && yDiff < HEIGHT) {
                    if (yDiff < HEIGHT / 2 && yDiff !== 1) {
                        setHoverPosition(1);
                    } else {
                        setHoverPosition(-1);
                    }
                }
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        [ITEM, divRef]
    );

    const [collected, drag] = useDrag(
        () => ({
            type: "item",
            item: ITEM,
        }),
        [ITEM]
    );

    drag(drop(divRef));

    return (
        <div
            ref={divRef}
            id={props.index}
            style={{
                backgroundColor: isOver ? "gray" : "white",
                border: "none",
                borderTop: isOver && hoverPosition === 1 ? "3px yellow solid" : null,
                borderBottom: isOver && hoverPosition === -1 ? "3px yellow solid" : null,
                color: "black",
                cursor: "pointer",
                padding: "0 1em",
                fontSize: "2em",
                margin: "0.5em",
            }}
        >
            {props.text}
        </div>
    );
}

function DnDDemo(props) {
    const [array, setArray] = useState(["A", "B", "C", "D", "E"]);
    return (
        <div
            style={{
                backgroundColor: "black",
                width: "50%",
                padding: "0.5em",
            }}
        >
            {array.map((arrayElement, index) => (
                <DragDropItem
                    index={index}
                    text={arrayElement}
                    key={index}
                    onDrop={(topItem, bottomItem) => {
                        let newArray = [...array];
                        newArray.splice(topItem.index, 1);
                        newArray.splice(
                            topItem.index < bottomItem.index
                                ? bottomItem.index - 1
                                : bottomItem.index,
                            0,
                            topItem.text
                        );
                        setArray(newArray);
                    }}
                />
            ))}
        </div>
    );
}
export default DnDDemo;
