import React, { Fragment } from "react";
import BoardCard from './boardCard'
import './boardPage.css'

/**
 * Index page that contains all the boards available for viewing at the moment
 * @returns boards
 */

const Board = () => {
    return ( 
        <Fragment>
            <div className="boardPage">
                <div style={{alignItems: "center"}}>  
                    <div className="boardTitle"> 
                        Boards
                    </div>
                    <button className="addNewBoardButton">
                        Add New Board
                    </button> 
                </div>
                
                <div className="boardsList">
                    <BoardCard title="String"/> 
                    <BoardCard title="String"/> 
                    <BoardCard title="String"/> 
                    <BoardCard title="String"/> 
                </div>
            </div> 
        </Fragment>
    )
}

export default Board;
