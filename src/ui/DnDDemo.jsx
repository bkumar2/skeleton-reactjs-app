import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";

const move = (topItem, bottomItem, swapFn, insertFn, divRef, monitor) => {
    if (!divRef.current) return;
    const hoverItemArrayIndex = topItem.dnd.arrayIndex;
    const bottomItemArrayIndex = bottomItem.dnd.arrayIndex;
    const hoverItemIndex = topItem.dnd.index;
    const bottomItemIndex = bottomItem.dnd.index;
    // Don't replace items with themselves
    if (hoverItemArrayIndex === bottomItemArrayIndex && hoverItemIndex === bottomItemIndex) return;
    // Determine rectangle on screen
    const bottomItemBoundingRect = divRef.current?.getBoundingClientRect();
    // Get vertical middle
    const bottomeItemMiddleY = (bottomItemBoundingRect.bottom - bottomItemBoundingRect.top) / 2;
    // Determine mouse position
    const mousePointerOffset = monitor.getClientOffset();
    // Get pixels to the top
    const mousePointerYDiff = mousePointerOffset.y - bottomItemBoundingRect.top;
    // If same array, swap if required
    if (hoverItemArrayIndex === bottomItemArrayIndex) {
        // no action till mouse cross half w.r.t downwards or upwards drag
        if (
            (hoverItemIndex < bottomItemIndex && mousePointerYDiff < bottomeItemMiddleY) ||
            (hoverItemIndex > bottomItemIndex && mousePointerYDiff > bottomeItemMiddleY)
        )
            return;
        swapFn(topItem, bottomItem);
        topItem.dnd.index = bottomItemIndex;
    }
    // If different array, insert above or below
    else {
        let level = mousePointerYDiff < bottomeItemMiddleY ? 0 : 1;
        insertFn(topItem, bottomItem, level);
        topItem.dnd.index = bottomItemIndex + level;
        topItem.dnd.arrayIndex = bottomItemArrayIndex;
    }
};

function DragDropItem(props) {
    const ITEM_TYPE = "ArrayElement";
    const divRef = useRef(null);
    let currentDragDropItem = {
        dnd: { arrayIndex: props.arrayIndex, index: props.index },
        data: props.text,
    };

    const [, drop] = useDrop(
        () => ({
            accept: ITEM_TYPE,
            hover: (hoverItem, monitor) => {
                move(hoverItem, currentDragDropItem, props.onSwap, props.onInsert, divRef, monitor);
            },
        }),
        [currentDragDropItem, divRef]
    );

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ITEM_TYPE,
            item: currentDragDropItem,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: () => {
                props.onDrop();
            },
        }),
        [currentDragDropItem]
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
                cursor: "move",
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
        ["a", "b", "c", "d", "e"],
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
                                    let tempItem = newArray[topItem.dnd.index];
                                    newArray[topItem.dnd.index] = newArray[bottomItem.dnd.index];
                                    newArray[bottomItem.dnd.index] = tempItem;
                                    setDragIndex([bottomItem.dnd.arrayIndex, bottomItem.dnd.index]);
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
                                    let newTopItemArray = [...arrays[topItem.dnd.arrayIndex]];
                                    let newBottomItemArray = [...arrays[bottomItem.dnd.arrayIndex]];
                                    newTopItemArray.splice(topItem.dnd.index, 1);
                                    newBottomItemArray.splice(
                                        bottomItem.dnd.index + level,
                                        0,
                                        topItem.data
                                    );
                                    let newArrays = [...arrays];
                                    newArrays[topItem.dnd.arrayIndex] = newTopItemArray;
                                    newArrays[bottomItem.dnd.arrayIndex] = newBottomItemArray;
                                    setArrays(newArrays);
                                    setDragIndex([
                                        bottomItem.dnd.arrayIndex,
                                        bottomItem.dnd.index + level,
                                    ]);
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
