import { Link } from 'react-router-dom';
import React, { Fragment } from 'react'; 
import './boardCard.css';

/**
 * Card for each board available. 
 * @param {*} props 
 * @returns card representing an existing board. 
 */

const BoardCard = ({id, description, title, boards, setBoards}) => {
    const url = "/" + id;

    function removeBoard() {
        boards.pop(id)
        setBoards(boards.filter(board => board.id !== id))
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
                <Link
                    to={{ pathname: url }}
                    state={{ title: title }}
                    style={{ textDecoration: 'none' }}
                > 
                <div className="boardCardTitle"> 
                    { title }
                    <div className="boardCardDescription"> 
                        { description }
                    </div>
                </div>
                </Link>
                
            </div>
        </Fragment> 
    )
}


export default BoardCard; 
