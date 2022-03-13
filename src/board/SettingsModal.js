import Modal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai"
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './board.css'
import './AddTaskModal.css'


const SettingsModal = ({tasksNo, setTasksNo, setSettingsOpen, settingsOpen}) => {
    const { id } = useParams();
    const [userInput, setUserInput] = useState(tasksNo)
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
    function changeTasksMax() {
        // do some check for the user input here
       setTasksNo(userInput)
       localStorage.setItem("tasksNo", userInput);
       toggleModal()
    }

    function toggleModal() {
        setSettingsOpen(!settingsOpen);
    }

    return (
        <Modal
            ariaHideApp={false}
            isOpen={settingsOpen}
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
            <div className="modalTitle"> Settings </div>
            <div> 
              <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}> 
                <input 
                    type="number"
                    text-align="center"
                    placeholder="Max tasks per column"
                    style={{padding: "12px 20px", borderRadius: "25px", border: "none"}}
                    onChange={e => setUserInput(parseInt(e.target.value))}
                />
               <button 
                    onClick={changeTasksMax}
                    className="modalBoardButton"
                > Update settings </button>
              </div>
            </div>
          </Modal>
    )
}

export default SettingsModal;
