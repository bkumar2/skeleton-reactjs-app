import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

function DragDropItem(props) {
    let ITEM = { index: props.index, text: props.text };
    console.log("ITEM", ITEM);

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "item",
            drop: (item) => {
                console.log("received drop of:", item.index, item.text);
                props.onDrop(item, ITEM);
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        [ITEM]
    );

    const [collected, drag] = useDrag(
        () => ({
            type: "item",
            item: ITEM,
        }),
        [ITEM]
    );

    return (
        <div ref={drop}>
            <div
                id={props.index}
                ref={drag}
                style={{
                    backgroundColor: isOver ? "gray" : "white",
                    borderTop: isOver ? "3px yellow solid" : null,
                    color: "black",
                    cursor: "pointer",
                    padding: "0 1em",
                    fontSize: "2em",
                    margin: "0.5em",
                }}
            >
                {props.text}
            </div>
        </div>
    );
}

function DnDDemo(props) {
    const [array, setArray] = useState(["A", "B", "C", "D", "E"]);
    console.log("array", array);
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
                        console.log("dropped", topItem, "on", bottomItem);
                        let newArray = [...array];
                        newArray.splice(topItem.index, 1);
                        console.log(
                            "newArray remove",
                            topItem.index,
                            topItem.text
                        );
                        newArray.splice(
                            topItem.index < bottomItem.index
                                ? bottomItem.index - 1
                                : bottomItem.index,
                            0,
                            topItem.text
                        );
                        console.log(
                            "newArray insert",
                            topItem.index < bottomItem.index
                                ? bottomItem.index - 1
                                : bottomItem.index,
                            topItem.text
                        );
                        console.log("newArray", newArray);
                        setArray(newArray);
                    }}
                />
            ))}
        </div>
    );
}
export default DnDDemo;
