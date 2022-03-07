import React, { Fragment, useEffect, useState } from "react";
import AddBoardModal from "./AddBoardModal";
import BoardCard from './boardCard'
import './boardPage.css'

/**
 * Index page that contains all the boards available for viewing at the moment
 * @returns boards
 */

const Boards = () => {

    const [boards, setBoards] = useState([]); 
    const [isOpen, setIsOpen] = useState(false);

    function fillBoard() {
        if (localStorage.getItem('boards')) {
            setBoards(JSON.parse(localStorage.getItem('boards')));
        } else {
            const boardsList = [{
                id: 0,
                title: "CS3243",  
                columns: {
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
                }
            }];

            setBoards(boardsList);
        }
    }

    // function to toggle the 
    function toggleModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        fillBoard();
    }, []); 

    return ( 
        <Fragment>
            <div className="boardPage">
                <div style={{alignItems: "center"}}>  
                    <div className="boardTitle"> 
                        Boards
                    </div>
                    <button 
                        onClick={toggleModal}
                        className="addNewBoardButton"
                    >
                        Add New Board
                    </button> 
                </div>
                <div className="boardsList">
                    {boards.map((x,i) => {
                        return <BoardCard key={i} id={i} title={x.title} boards={boards} setBoards={setBoards}></BoardCard>
                    })}
                </div>
            </div> 
            <AddBoardModal 
                setIsOpen={setIsOpen} 
                isOpen={isOpen} 
                setBoards={setBoards}
                boards={boards}
            /> 
        </Fragment>
    )
}

export default Boards;
