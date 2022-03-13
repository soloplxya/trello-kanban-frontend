import Modal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai"
import { useState } from 'react';
import './boardPage.css'
import './AddBoardModal.css'


const AddBoardModal = (props) => {
    const [title, setTitle] = useState("");
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
    function addBoard() {
        const newBoard = new Object(); 
        newBoard.title = title; 
        newBoard.description = description
        newBoard.columns = { 
            todo: [{
                id: 0, 
                description: "1"
            }], 
            inProgress: [{
                id: 1, 
                description: "2"
            }], 
            done: [{
                id: 2, 
                description: "3"
            }]
        };
        newBoard.id = newBoard.id + 1

        props.boards.push(newBoard);
        localStorage.setItem('boards', JSON.stringify(props.boards))
        toggleModal();
    }

    function toggleModal() {
        props.setIsOpen(!props.isOpen);
    }

    return (
        <Modal
            ariaHideApp={false}
            isOpen={props.isOpen}
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
            <div className="modalTitle"> New Board </div>
            <div> 
              <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}> 
                <input 
                    type="text"
                    text-align="center"
                    placeholder="Board Title"
                    style={{padding: "12px 20px", borderRadius: "25px", border: "none"}}
                    onChange={e => setTitle(e.target.value)}
                /> 
                <input 
                    type="text"
                    text-align="center"
                    placeholder="Board Description"
                    style={{padding: "12px 20px", marginTop: "10px", borderRadius: "25px", border: "none"}}
                    onChange={e => setDescription(e.target.value)}
                /> 
                <button 
                    onClick={addBoard}
                    className="modalBoardButton"
                > Add Board </button>
              </div>
            </div>
          </Modal>
    )
}

export default AddBoardModal;
