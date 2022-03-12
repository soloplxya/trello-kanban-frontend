import { useLocation, useParams } from "react-router-dom";
import { Fragment, useState, useEffect, useRef } from "react";
import AddTaskModal from './AddTaskModal';
import Column from './column';
import { TiBackspaceOutline } from 'react-icons/ti'
import './board.css';

const Board = () => {
    const { id } = useParams();
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [board, setBoard] = useState({});
    const [title, setTitle] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); 
    const renameArea = useRef('');

    function retrieveBoard() {
        const boards = JSON.parse(localStorage.getItem("boards"));
        const board = boards[parseInt(id)];

        const todoes = board.columns.todo;
        const inProgress = board.columns.inProgress; 
        const done = board.columns.done;

        setTodos(todoes); 
        setInProgress(inProgress);
        setDone(done);

        setTitle(board.title); 
        setBoard(board);
    }

    // Start Drag
    const onDragStart = (e, fromList) => {
        console.log(`what a drag!`)
        const dragInfo = {
          taskId: e.currentTarget.id,
          description: e.target.getAttribute("description"),
          fromList: fromList
        }

        localStorage.setItem('dragInfo', JSON.stringify(dragInfo));
    }

    // Do nothing when the element is being dragged over
    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDrop = (e, listNum) => {
        //get the dropped task card, the localStorage, 
        const droppedTask = JSON.parse(localStorage.getItem('dragInfo'));      
        const boards = JSON.parse(localStorage.getItem('boards'));
        const board = boards[parseInt(id)];
        var card; 

        // Remove the task from the origin list
        if (droppedTask.fromList == 0) {
            var card = todos.find(card => parseInt(card.id) == parseInt(droppedTask.taskId))
            const filteredTodos = todos.filter(card => parseInt(card.id) !== parseInt(droppedTask.taskId))
            setTodos(filteredTodos);
            board.columns.todo = filteredTodos;
        } else if (droppedTask.fromList == 1) {
            var card = inProgress.find(card => parseInt(card.id) == parseInt(droppedTask.taskId))
            const filteredInProgress = inProgress.filter(card => parseInt(card.id) !== parseInt(droppedTask.taskId));
            setInProgress(filteredInProgress);
            board.columns.inProgress = filteredInProgress;
        } else if (droppedTask.fromList == 2) {
            var card = done.find(card => parseInt(card.id) == parseInt(droppedTask.taskId))
            const filteredDone = done.filter(card => parseInt(card.id) !== parseInt(droppedTask.taskId))
            setDone(filteredDone); 
            board.columns.done = filteredDone; 
        }
        
        // put a new card in the list where it was dropped
        if (listNum == 0) {
            todos.push(card);
            setTodos(todos);
            board.columns.todo = todos;
        } else if (listNum == 1) {
            inProgress.push(card);
            setInProgress(inProgress);
            board.columns.inProgress = inProgress;
        } else if (listNum == 2) {
            done.push(card);
            setDone(done);
            board.columns.done = done;
        }
        
        localStorage.setItem('boards', JSON.stringify(boards));
    }

     // function to toggle the modal
     function toggleModal() {
        setIsOpen(true)
    }

    function handleRename(e) {
        const boards = JSON.parse(localStorage.getItem("boards"));
        const board = boards[parseInt(id)];

        if (e.keyCode === 13) {
            const value = renameArea.current.innerHTML;
            e.preventDefault();
            setTitle(value); 
            board.title = value; 
            localStorage.setItem("boards", JSON.stringify(boards))
        }
        
    }

    useEffect(() => {
        retrieveBoard()
    },[]); 

    return (
        <Fragment>
            <div className='boardPage'>
                <div className='boardHeader'>
                        {
                            // TODO: back button functionality
                            /*
                            <div className='backButton'>
                                <TiBackspaceOutline color="#AC6D6D" size="40"/> 
                            </div> 
                            */
                        }
                    <div className='boardTitle' 
                            contentEditable="true"
                            onKeyDown= {e => handleRename(e)}
                            ref={renameArea}> 
                        { title } 
                    </div> 
                </div>
                <div style={{ alignItems: "center "}}>
                    <button 
                        onClick={toggleModal}
                        className="addNewTaskButton"
                    >
                        Add New Task
                    </button> 
                </div>
                <div className="columnsList"> 
                    <Column 
                        columnTitle="Todo" 
                        tasks={todos}
                        setTasks={setTodos}
                        onDragOver={onDragOver}
                        onDragStart={(e) => onDragStart(e, 0)}
                        onDrop={(e) => onDrop(e, 0)}
                    /> 
                    <Column 
                        columnTitle="In Progress" 
                        tasks={inProgress}
                        setTasks={setInProgress}
                        onDragOver={onDragOver}
                        onDragStart={(e) => onDragStart(e, 1)}
                        onDrop={(e) => onDrop(e, 1)}
                    />
                    <Column 
                        columnTitle="Done" 
                        tasks={done}
                        setTasks={setDone}
                        onDragOver={onDragOver}
                        onDragStart={(e) => onDragStart(e, 2)}
                        onDrop={(e) => onDrop(e, 2)}
                    /> 
                </div>
                <AddTaskModal 
                    isOpen={isOpen}
                    setIsOpen={setIsOpen} 
                    todos={todos}
                    setTodos={setTodos}
                    inProgress={inProgress}
                    setInProgress={setInProgress}
                    done={done}
                    setDone={setDone}
                /> 
            </div>
        </Fragment>
    );
}

export default Board;