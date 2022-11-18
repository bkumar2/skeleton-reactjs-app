import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";

function DragDropItem(props) {
    const divRef = useRef(null);
    let ITEM = { index: props.index, text: props.text, arrayIndex: props.arrayIndex };

    const [, drop] = useDrop(
        () => ({
            accept: "item",
            drop: (droppedItem) => {
                console.log("received drop of:", droppedItem, " on:", ITEM);
            },
            hover: (hoverItem, monitor) => {
                if (!divRef.current) {
                    return;
                }
                const hoverItemArrayIndex = hoverItem.arrayIndex;
                const bottomItemArrayIndex = ITEM.arrayIndex;
                const hoverItemIndex = hoverItem.index;
                const bottomItemIndex = ITEM.index;
                // Don't replace items with themselves
                if (
                    hoverItemArrayIndex === bottomItemArrayIndex &&
                    hoverItemIndex === bottomItemIndex
                )
                    return;

                // Determine rectangle on screen
                const bottomItemBoundingRect = divRef.current?.getBoundingClientRect();
                // Get vertical middle
                const bottomeItemMiddleY =
                    (bottomItemBoundingRect.bottom - bottomItemBoundingRect.top) / 2;
                // Determine mouse position
                const mousePointerOffset = monitor.getClientOffset();
                // Get pixels to the top
                const mousePointerYDiff = mousePointerOffset.y - bottomItemBoundingRect.top;
                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                // When dragging upwards, only move when the cursor is above 50%
                // If same array
                if (hoverItemArrayIndex === bottomItemArrayIndex) {
                    // Dragging downwards
                    if (
                        hoverItemIndex < bottomItemIndex &&
                        mousePointerYDiff < bottomeItemMiddleY
                    ) {
                        return;
                    }
                    // Dragging upwards
                    if (
                        hoverItemIndex > bottomItemIndex &&
                        mousePointerYDiff > bottomeItemMiddleY
                    ) {
                        return;
                    }
                    props.onSwap(hoverItem, ITEM);
                    hoverItem.index = bottomItemIndex;
                } else {
                    // Insert Above
                    if (mousePointerYDiff < bottomeItemMiddleY) {
                        props.onInsert(hoverItem, ITEM, 0);
                        hoverItem.index = bottomItemIndex;
                    }
                    // Insert Below
                    else {
                        props.onInsert(hoverItem, ITEM, 1);
                        hoverItem.index = bottomItemIndex + 1;
                    }
                    hoverItem.arrayIndex = bottomItemArrayIndex;
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
            end: () => {
                props.onDrop();
            },
        }),
        [ITEM]
    );

    drag(drop(divRef));

    return (
        <div
            ref={divRef}
            style={{
                opacity:
                    props.dragging ||
                    (props.dragIndex[0] === -1 && props.dragIndex[1] === -1 && isDragging)
                        ? 0.5
                        : 1,
                backgroundColor: "white",
                color: "black",
                cursor: "pointer",
                padding: "0 1em",
                fontSize: "2em",
                borderTop: "1px solid black",
            }}
        >
            {props.text}
        </div>
    );
}

function DnDDemo(props) {
    const [arrays, setArrays] = useState([
        ["A", "B", "C", "D", "E"],
        ["1", "2", "3", "4", "5"],
    ]);
    const [dragIndex, setDragIndex] = useState([-1, -1]);
    console.log("arrays:", arrays, " dragIndex:", dragIndex);
    return (
        <Container>
            <Row
                style={{
                    backgroundColor: "black",
                    padding: "0.5em 0",
                }}
            >
                {arrays.map((array, i) => (
                    <Col key={i}>
                        {array.map((arrayElement, index) => (
                            <DragDropItem
                                arrayIndex={i}
                                index={index}
                                text={arrayElement}
                                key={index}
                                dragIndex={dragIndex}
                                dragging={dragIndex[0] === i && dragIndex[1] === index}
                                onDrop={() => {
                                    console.log("Item dropped");
                                    setDragIndex([-1, -1]);
                                }}
                                onSwap={(topItem, bottomItem) => {
                                    console.log(
                                        "swapping topItem:",
                                        topItem,
                                        " bottomItem:",
                                        bottomItem
                                    );
                                    let newArray = [...array];
                                    let tempItem = newArray[topItem.index];
                                    newArray[topItem.index] = newArray[bottomItem.index];
                                    newArray[bottomItem.index] = tempItem;
                                    setDragIndex([bottomItem.arrayIndex, bottomItem.index]);
                                    let newArrays = [...arrays];
                                    newArrays[i] = newArray;
                                    setArrays(newArrays);
                                }}
                                onInsert={(topItem, bottomItem, level) => {
                                    console.log(
                                        "Inserting topItem:",
                                        topItem,
                                        " bottomItem:",
                                        bottomItem,
                                        " level:",
                                        level
                                    );
                                    let newTopItemArray = [...arrays[topItem.arrayIndex]];
                                    let newBottomItemArray = [...arrays[bottomItem.arrayIndex]];
                                    newTopItemArray.splice(topItem.index, 1);
                                    newBottomItemArray.splice(
                                        bottomItem.index + level,
                                        0,
                                        topItem.text
                                    );
                                    let newArrays = [...arrays];
                                    newArrays[topItem.arrayIndex] = newTopItemArray;
                                    newArrays[bottomItem.arrayIndex] = newBottomItemArray;
                                    setArrays(newArrays);
                                    setDragIndex([bottomItem.arrayIndex, bottomItem.index + level]);
                                }}
                            />
                        ))}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
export default DnDDemo;
