import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const HOVER_POSITION = {
    TOP: 1,
    BOTTOM: -1,
    NONE: 0,
};

function DragDropItem(props) {
    const divRef = useRef(null);
    const [hoverPosition, setHoverPosition] = useState(HOVER_POSITION.NONE);
    let ITEM = { index: props.index, text: props.text };

    const [isOver, drop] = useDrop(
        () => ({
            accept: "item",
            drop: (droppedItem) => {
                console.log("received drop of:", droppedItem);
                setHoverPosition(HOVER_POSITION.NONE);
                props.onSwap(droppedItem, ITEM, hoverPosition);
            },
            hover: (hoverItem, monitor) => {
                if (!divRef.current) {
                    return;
                }
                const dragIndex = hoverItem.index;
                const hoverIndex = ITEM.index;
                // Don't replace items with themselves
                if (dragIndex === hoverIndex) {
                    setHoverPosition(HOVER_POSITION.NONE);
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
                if (hoverClientY < hoverMiddleY) {
                    setHoverPosition(HOVER_POSITION.TOP);
                }
                // Dragging upwards
                if (hoverClientY > hoverMiddleY) {
                    setHoverPosition(HOVER_POSITION.BOTTOM);
                }
                // Time to actually perform the action
                // console.log("swap top", hoverItem, "bottom", ITEM);
                // props.onSwap(hoverItem, ITEM);
                // Note: we're mutating the monitor item here!
                // Generally it's better to avoid mutations,
                // but it's good here for the sake of performance
                // to avoid expensive index searches.
                // hoverItem.index = hoverIndex;
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
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

    if (isOver) console.log("isOver ", ITEM);

    return (
        <div
            ref={divRef}
            id={props.index}
            style={{
                opacity: isDragging ? 0 : 1,
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
                    onSwap={(topItem, bottomItem, hoverPosition) => {
                        let newArray = [...array];
                        if (hoverPosition === HOVER_POSITION.TOP) {
                            newArray.splice(topItem.index, 1);
                            newArray.splice(
                                topItem.index < bottomItem.index
                                    ? bottomItem.index - 1
                                    : bottomItem.index,
                                0,
                                topItem.text
                            );
                        } else {
                            newArray.splice(topItem.index, 1);
                            newArray.splice(
                                topItem.index < bottomItem.index
                                    ? bottomItem.index
                                    : bottomItem.index + 1,
                                0,
                                topItem.text
                            );
                        }
                        console.log("newArray", newArray);
                        setArray(newArray);
                    }}
                />
            ))}
        </div>
    );
}
export default DnDDemo;
