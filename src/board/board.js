import { useLocation, useParams } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import Column from './column';
import './board.css';

const Board = () => {
    const { id } = useParams();
    const [board, setBoard] = useState({});
    const [title, setTitle] = useState("");
    const location = useLocation(); 

    function retrieveBoard() {
        const boards = JSON.parse(localStorage.getItem("boards"));
        const board = boards[parseInt(id)];
        setTitle(board.title); 
        setBoard(board);
    }

    useEffect(() => {
        retrieveBoard()
    },[]); 

    return (
        <Fragment>
            <div className='boardPage'>
                <div className='boardTitle'> 
                    { title } 
                </div> 
                <div className="columnsList"> 
                    <Column columnTitle="Todo" /> 
                    <Column columnTitle="In Progress"/> 
                    <Column columnTitle="Done" /> 
                </div>
            </div>
        </Fragment>
    );
}

export default Board;