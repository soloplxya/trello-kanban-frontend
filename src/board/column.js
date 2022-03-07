import './column.css';
import DraggableTask from './draggableTask';
import { Fragment, useState, useEffect } from 'react';

const Column = (props) => {
    let items = [];
    
    const displayedItems = () => {
        console.log(props.tasks)
        return (
            props.tasks.map((x,i) => {
                return <DraggableTask key={i} taskId={x.id} description={x.description} onDragStart={props.onDragStart}></DraggableTask>
            })
        )
    }

    return (
        <Fragment>
            <div 
                className="column" 
                onDragOver={props.onDragOver}
                onDrop={props.onDrop}
            >
                <div className="columnTitle">
                    { props.columnTitle }
                </div> 
                { 
                    displayedItems()
                }
            </div>
        </Fragment> 
    );
}

export default Column; 
