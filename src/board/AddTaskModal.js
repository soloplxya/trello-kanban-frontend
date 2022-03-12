import Modal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai"
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './board.css'
import './AddTaskModal.css'


const AddTaskModal = ({setIsOpen, isOpen, setTodos, todos, setInProgress, inProgress, setDone, done}) => {
    const { id } = useParams();
    const [list, setList] = useState("Todo");
    const [description, setDescription] = useState("");
    const customStyles = {
        content: {
          maxHeight: "400vh", 
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          background: "#FFD3B6", 
          borderRadius: "9px",
          transform: 'translate(-50%, -50%)',
          color: "#FFF",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
        },
    };

    // function that adds a board to the boards list
    function addTask() {
        const boards = JSON.parse(localStorage.getItem('boards'));
        const board = boards[parseInt(id)];

        const newTask = {
            id: new Date().valueOf(),
            description
        }

        if (list == "Todo") {
            todos.push(newTask);
            console.log(todos)
            setTodos(todos);
            board.columns.todos = todos;
        } else if (list == "InProgress") {
            inProgress.push(newTask);
            setInProgress(inProgress);
            console.log(inProgress)
            board.columns.inProgress = inProgress;
        } else if (list == "Done") {
            done.push(newTask);
            setDone(done);
            console.log(done)
            board.columns.done = done; 
        }

        localStorage.setItem('boards', JSON.stringify(boards));
        toggleModal();
    }

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    function handleOptionChange(value) {
        setList(value)
    }

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="editDialog"
            style={customStyles}> 
            <AiOutlineClose
                type="button"
                className="close-icon"
                onClick={toggleModal}
                style={{ float: "right" }}
                color="white"
            />
            <div className="modalTitle"> New Task </div>
            <div> 
              <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}> 
                <input 
                    type="text"
                    text-align="center"
                    placeholder="Task Description"
                    style={{padding: "12px 20px", borderRadius: "25px", border: "none"}}
                    onChange={e => setDescription(e.target.value)}
                />
               <select
                style={{padding: "12px 20px", borderRadius: "25px", border: "none", marginTop: "5px" }}
                onChange={e => handleOptionChange(e.target.value)}>
                    <option key="Todo" value="Todo"> Todo </option>
                    <option key="InProgress" value="InProgress"> In Progress </option>
                    <option key="Done" value="Done"> Done </option>
               </select>
               <button 
                    onClick={addTask}
                    className="modalBoardButton"
                > Add Task </button>
              </div>
            </div>
          </Modal>
    )
}

export default AddTaskModal;
