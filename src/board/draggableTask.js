import React from 'react';
import './draggableTask.css';

const DraggableTask = (props) => {
  return (
    <div className="task-card" draggable="true" id={props.taskId} description={props.description} onDragStart={props.onDragStart}>
      {props.description}
    </div>
  ) 
};

export default DraggableTask;