import { chainPropTypes } from '@mui/utils';
import React, { Fragment } from 'react'; 
import './boardCard.css';

/**
 * Card for each board available. 
 * @param {*} props 
 * @returns card representing an existing board. 
 */

const BoardCard = ({id, title, boards, setBoards}) => {

    function removeBoard() {
        console.log("here")
        boards.pop(id)
        setBoards(boards.filter(board => board.id !== id))
        //props.setBoards(props.boards.pop(props.id))
        localStorage.setItem('boards', JSON.stringify(boards))
    }

    return ( 
        <Fragment>
            <div className="boardCard"> 
                <div style={{ position: 'relative', left: "120px", top: "15px" }}>
                    <button 
                        onClick={removeBoard}
                        className="boardCardRemoveButton"
                    />
                </div>
                <div className="boardCardTitle"> 
                    { title }
                </div>
            </div>
        </Fragment> 
    )
}


export default BoardCard; 
