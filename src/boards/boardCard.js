import React, { Fragment } from 'react'; 
import './boardCard.css';

/**
 * Card for each board available. 
 * @param {*} props 
 * @returns card representing an existing board. 
 */

const BoardCard = (props) => {
    return ( 
        <Fragment>
            <div className="boardCard"> 
                <div style={{ position: 'relative', left: "120px", top: "15px" }}>
                    <button className="boardCardRemoveButton"/>
                </div>
                <div className="boardCardTitle"> 
                    { props.title }
                </div>
            </div>
        </Fragment> 
    )
}


export default BoardCard; 
