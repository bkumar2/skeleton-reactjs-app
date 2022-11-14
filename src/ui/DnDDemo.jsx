import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

function DragDropItem(props) {
    const divRef = useRef(null);
    let ITEM = { index: props.index, text: props.text };

    const [, drop] = useDrop(
        () => ({
            accept: "item",
            drop: (droppedItem) => {
                console.log("received drop of:", droppedItem, " on:", ITEM);
                props.onDrop();
            },
            hover: (hoverItem, monitor) => {
                if (!divRef.current) {
                    return;
                }
                const dragIndex = hoverItem.index;
                const hoverIndex = ITEM.index;
                // Don't replace items with themselves
                if (dragIndex === hoverIndex) {
                    return;
                }
                // Determine rectangle on screen
                const hoverBoundingRect = divRef.current?.getBoundingClientRect();
                // Get vertical middle
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                // Determine mouse position
                const clientOffset = monitor.getClientOffset();
                // Get pixels to the top
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                // When dragging upwards, only move when the cursor is above 50%
                // Dragging downwards
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                // Dragging upwards
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                // Time to actually perform the action
                // console.log("swap top", hoverItem, "bottom", ITEM);
                // props.onSwap(hoverItem, ITEM);
                // Note: we're mutating the monitor item here!
                // Generally it's better to avoid mutations,
                // but it's good here for the sake of performance
                // to avoid expensive index searches.
                // hoverItem.index = hoverIndex;
                props.onSwap(hoverItem, ITEM);
                hoverItem.index = hoverIndex;
            },
        }),
        [ITEM, divRef]
    );

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "item",
            item: ITEM,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [ITEM]
    );

    drag(drop(divRef));

    return (
        <div
            ref={divRef}
            id={props.index}
            style={{
                opacity: props.dragging ? 0 : 1,
                backgroundColor: "white",
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
    const [dragIndex, setDragIndex] = useState(-1);
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
                    dragging={dragIndex === index}
                    onDrop={() => setDragIndex(-1)}
                    onSwap={(topItem, bottomItem) => {
                        console.log("swapping topItem:", topItem, " bottomItem:", bottomItem);
                        let newArray = [...array];
                        let tempItem = newArray[topItem.index];
                        newArray[topItem.index] = newArray[bottomItem.index];
                        newArray[bottomItem.index] = tempItem;
                        setDragIndex(bottomItem.index);
                        setArray(newArray);
                    }}
                />
            ))}
        </div>
    );
}
export default DnDDemo;
