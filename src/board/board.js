import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Fragment, useState, useEffect, useRef } from "react";
import AddTaskModal from './AddTaskModal';
import SettingsModal from './SettingsModal';
import Column from './column';
import { MdArrowBack } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import './board.css';
import { DragDropContext } from "react-beautiful-dnd";


const Board = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [board, setBoard] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [tasksNo, setTasksNo] = useState(10);
    const [settingsOpen, setSettingsOpen] = useState(false); 
    const location = useLocation(); 
    const renameTitle = useRef('');
    const renameDescription = useRef('');

    // function that sets up the board
    function retrieveBoard() {
        if (localStorage.getItem('tasksNo')) {
            setTasksNo(localStorage.getItem('tasksNo'));
        } else {
            setTasksNo(10);
            localStorage.setItem('tasksNo', 10);
        }

        const boards = JSON.parse(localStorage.getItem("boards"));
        const board = boards[parseInt(id)];

        const todoes = board.columns.todo;
        const inProgress = board.columns.inProgress; 
        const done = board.columns.done;

        setTodos(todoes); 
        setInProgress(inProgress);
        setDone(done);

        setTitle(board.title); 
        setDescription(board.description);
        setBoard(board);
    }

    // function that is initialized when a drag event is completed
    const onDragEnd = (result) => {
        const tasksNo = localStorage.getItem('tasksNo');
        const boards = JSON.parse(localStorage.getItem('boards'));
        const board = boards[parseInt(id)];
        if (!result.destination) {
            return; 
        }


        var card; 
        const sourceList = result.source.droppableId;
        const destinationList = result.destination.droppableId;

        const destination = getList(destinationList);

        const draggedTaskId = result.source.draggableId; 
        const sourceItemIndex = result.source.index;

        // if the list that the task is dragged from is the same as the list the task is dropped in
        if (sourceList == destinationList) {
            return;
        }

        if (sourceList === "Todo") {
            if (destination.length == tasksNo) {
                alert("Number of tasks has exceeded task limit! You can change this value in settings.");
                return;
            }
            var card = todos.find(card => parseInt(card.id) == parseInt(sourceItemIndex));
            const filteredTodos = todos.filter(card => parseInt(card.id) !== parseInt(sourceItemIndex));
            setTodos(filteredTodos);
            board.columns.todo = filteredTodos;
        } else if (sourceList === "In Progress" ) {
            if (destination.length == tasksNo) {
                alert("Number of tasks has exceeded task limit! You can change this value in settings.");
                return;
            }
            var card = inProgress.find(card => parseInt(card.id) == parseInt(sourceItemIndex));
            const filteredInProgress = inProgress.filter(card => parseInt(card.id) !== parseInt(sourceItemIndex));
            setInProgress(filteredInProgress);
            board.columns.inProgress = filteredInProgress;
        } else if (sourceList === "Done") {
            if (destination.length == tasksNo) {
                alert("Number of tasks has exceeded task limit! You can change this value in settings.");
                return;
            }
            var card = done.find(card => parseInt(card.id) == parseInt(sourceItemIndex));
            const filteredDone = done.filter(card => parseInt(card.id) !== parseInt(sourceItemIndex));
            setDone(filteredDone); 
            board.columns.done = filteredDone; 
        }

        if (destinationList === "Todo") {
            todos.push(card);
            setTodos(todos);
            board.columns.todo = todos;
        } else if (destinationList === "In Progress") {
            inProgress.push(card);
            setInProgress(inProgress);
            board.columns.inProgress = inProgress;
        } else if (destinationList === "Done") {
            done.push(card);
            setDone(done);
            board.columns.done = done;
        }

        localStorage.setItem('boards', JSON.stringify(boards));
    }


    function getList(list) {
        switch (list) {
        case "Todo": 
            return todos;
        case "In Progress": 
            return inProgress; 
        case "Done": 
            return done; 
        default: 
            break;
        }
    }
     // function to toggle the add task modal
     function toggleModal() {
        setIsOpen(true);
    }

    // function to toggle the settings modal
    function toggleSettingsModal() {
        setSettingsOpen(true);
    }

    // function that handles the edit of the title/description
    function handleRename(e) {
        const boards = JSON.parse(localStorage.getItem("boards"));
        const board = boards[parseInt(id)];

        if (e.keyCode === 13) {
            const newTitle = renameTitle.current.innerHTML;
            const newDescription = renameDescription.current.innerHTML;
            e.preventDefault();
            setTitle(newTitle); 
            setDescription(newDescription);
        

            board.title = newTitle; 
            board.description = newDescription;
            localStorage.setItem("boards", JSON.stringify(boards))
        }
        
    }

    useEffect(() => {
        retrieveBoard()
    },[]); 

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={console.log("Test")}>
            <div className='boardPage'>
                <div className='boardHeader'>
                    <div className='backButton'>
                        <MdArrowBack
                            color="#AC6D6D" 
                            size="30"
                            onClick={() => {navigate("/")}}
                        /> 
                    </div> 
                    <div className='boardTitle' 
                            contentEditable="true"
                            onKeyDown= {e => handleRename(e)}
                            ref={renameTitle}> 
                        { title } 
                    </div> 
                    <div className='settingsButton'>
                        <FiSettings 
                            color="#AC6D6D" 
                            size="30"
                            onClick={toggleSettingsModal}
                        /> 
                    </div> 
                </div>
                <div className='boardDescription'
                     contentEditable="true"
                     onKeyDown= {e => handleRename(e)}
                     ref={renameDescription}
                     > 
                    { description }
                </div>
                <div style={{ alignItems: "center"}}>
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
                    /> 
                    <Column 
                        columnTitle="In Progress" 
                        tasks={inProgress}
                        setTasks={setInProgress}
                    />
                    <Column 
                        columnTitle="Done" 
                        tasks={done}
                        setTasks={setDone}
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
                <SettingsModal
                    settingsOpen={settingsOpen}
                    setSettingsOpen={setSettingsOpen}
                    tasksNo={tasksNo}
                    setTasksNo={setTasksNo}
                />
            </div>
        </DragDropContext>
    );
}

export default Board;