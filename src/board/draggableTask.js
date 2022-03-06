import React from 'react';
import './draggableTask.css';

const DraggableTask = (props) => {
  return (
    <div className="task-card" draggable="true" id={[props.taskId]} onDragStart={props.onDragStart}>
      {props.description}
    </div>
  ) 
};

export default DraggableTask;