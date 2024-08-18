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
    const [isDragging, setIsDragging] = useState(false);

    const handleOnDragStart = () => {
        setIsDragging(true);
    }

    function handleOnDragEnd(result) {
        setIsDragging(false)
        if (!result.destination) {
            return
        }
        const newBox = Array.from(box)
        const [draggedItem] = newBox.splice(result.source.index, 1)
        newBox.splice(result.destination.index, 0, draggedItem)
        setBox(newBox)
        if (result.source.index !== result.destination.index) {
            setDropCount(dropCount + 1)
        }
    }

    return (
        <>
        <div className="headings">
            <h1>Drag N Drop</h1>
            <h2>Drag and drop the colored boxes to new positions</h2>
        </div>
        <div className="drop-count">
            <p>Drop Count: {dropCount}</p>
        </div>
        <DragDropContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
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
        </DragDropContext>
        <div className="credits">
            <small>Developed by <a href="https://jameslycett.com" target="_blank" rel="noreferrer">James Lycett</a> as a practice project to learn how to drag-and-drop elements with help from <a href="https://medium.com/codex/how-to-implement-a-simple-drag-and-drop-using-create-react-app-and-react-beautiful-dnd-4e6e57a2299f" target="_blank" rel="noreferrer">this article</a>. Uses <a href="https://react.dev/" target="_blank" rel="noreferrer">React</a> and <a href="https://github.com/atlassian/react-beautiful-dnd" target="_blank" rel="noreferrer">React Beautiful DND</a>.</small>
        </div>
        </>
    )
}

export default App;
