import "./App.css"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState } from "react"

function App() {
    const [dropCount, setDropCount] = useState(0)
    const [box, setBox] = useState(
        [
            {
                id: 0,
                bg: "blue"
            },
            {
                id: 1,
                bg: "violet"
            },
            {
                id: 2,
                bg: "cyan"
            },
            {
                id: 3,
                bg: "indigo"
            },
            {
                id: 4,
                bg: "teal"
            },
            {
                id: 5,
                bg: "purple"
            },
            {
                id: 6,
                bg: "green"
            },
            {
                id: 7,
                bg: "magenta"
            },
            {
                id: 8,
                bg: "orange"
            },
            {
                id: 9,
                bg: "red"
            },
            {
                id: 10,
                bg: "gold"
            },
            {
                id: 11,
                bg: "darkblue"
            }
        ]
    )
    const [bux, setBux] = useState([])
    const [isDragging, setIsDragging] = useState(false);

    const handleOnDragStart = () => {
        setIsDragging(true);
    }

    function handleOnDragEnd(result) {
        setIsDragging(false)
        if (!result.destination) {
            return
        }
        if (result.source.droppableId === result.destination.droppableId) {
            // Reordering within the same list
            if (result.source.droppableId === "boxes") {
                const newBox = Array.from(box)
                const [draggedItem] = newBox.splice(result.source.index, 1)
                newBox.splice(result.destination.index, 0, draggedItem)
                setBox(newBox)
            } else {
                const newBux = Array.from(bux);
                const [draggedItem] = newBux.splice(result.source.index, 1)
                newBux.splice(result.destination.index, 0, draggedItem)
                setBux(newBux)
            }
        } else {
            // Moving between lists
            let sourceList = result.source.droppableId === "boxes" ? box : bux;
            let destinationList = result.destination.droppableId === "boxes" ? box : bux;
            const [draggedItem] = sourceList.splice(result.source.index, 1);
            destinationList.splice(result.destination.index, 0, draggedItem);

            if (result.source.droppableId === "boxes") {
                setBox([...sourceList]);
                setBux([...destinationList]);
            } else {
                setBux([...sourceList]);
                setBox([...destinationList]);
            }
        }

        // Only add to drop count if item was actually moved
        if (result.source.index !== result.destination.index || result.source.droppableId !== result.destination.droppableId) {
            setDropCount(dropCount + 1);
        }
    }

    return (
        <>
        <div className="headings">
            <h1>Drag N Drop</h1>
            <h2>Drag and drop the colored boxes to new positions</h2>
        </div>
        <div className="drop-count">
            <p>Boxes Moved: {dropCount}</p>
        </div>
        <DragDropContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
            <div className="columns">
                <Droppable droppableId="boxes">
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps} style={{marginTop: "30px"}}>
                            {box.map(({id, bg}, index) => {
                                    return (
                                        <Draggable
                                            key={id}
                                            draggableId={id.toString()}
                                            isDragDisabled={isDragging}
                                            index={index}
                                        >
                                        {(provided) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <div className={`box ${bg}`}></div>
                                            </li>
                                        )}
                                    </Draggable>
                                    )
                                }
                            )}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                <Droppable droppableId="buxes">
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps} style={{marginTop: "30px"}}>
                            {bux.map(({id, bg}, index) => {
                                    return (
                                        <Draggable
                                            key={id}
                                            draggableId={id.toString()}
                                            isDragDisabled={isDragging}
                                            index={index}
                                        >
                                        {(provided) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <div className={`box ${bg}`}></div>
                                            </li>
                                        )}
                                    </Draggable>
                                    )
                                }
                            )}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
        <div className="credits">
            <small>Developed by <a href="https://jameslycett.com" target="_blank" rel="noreferrer">James Lycett</a> as a practice project to learn how to drag-and-drop elements with help from <a href="https://medium.com/codex/how-to-implement-a-simple-drag-and-drop-using-create-react-app-and-react-beautiful-dnd-4e6e57a2299f" target="_blank" rel="noreferrer">this article</a>. Uses <a href="https://react.dev/" target="_blank" rel="noreferrer">React</a> and <a href="https://github.com/atlassian/react-beautiful-dnd" target="_blank" rel="noreferrer">React Beautiful DND</a>.</small>
        </div>
        </>
    )
}

export default App;
