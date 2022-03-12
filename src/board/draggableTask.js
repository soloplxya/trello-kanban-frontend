import { useParams } from 'react-router-dom'; 
import React from 'react';
import './draggableTask.css';

const DraggableTask = ({tasks, setTasks, taskId, columnTitle, description, onDragStart}) => {

  const { id } = useParams();

  function removeTask() {
    const boards = JSON.parse(localStorage.getItem('boards'));
    const board = boards[parseInt(id)];
    const filteredTasks = tasks.filter(task => task.id !== taskId)
    setTasks(filteredTasks)
    
    if (columnTitle === "Todo") {
      board.columns.todo = filteredTasks;
    } else if (columnTitle === "In Progress") {
      board.columns.inProgress = filteredTasks; 
    } else if (columnTitle === "Done") {
      board.columns.done = filteredTasks;
    }

    localStorage.setItem('boards', JSON.stringify(boards))
  }

  return (
    <div className="task-card" draggable="true" id={taskId} description={description} onDragStart={onDragStart}>
       <div style={{ position: 'relative', left: "115px", bottom: "5px"}}>
            <button 
                onClick={removeTask}
                className="taskRemoveButton"
            />
        </div>
        <div style={{ position: 'relative', bottom: "12px" }}>
          {description}
        </div>
    </div>
  ) 
};

export default DraggableTask;