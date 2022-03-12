import { useParams } from 'react-router-dom'; 
import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import './draggableTask.css';

const DraggableTask = ({tasks, setTasks, taskId, columnTitle, description, onDragStart, index}) => {

  const { id } = useParams();

  function removeTask() {
    const boards = JSON.parse(localStorage.getItem('boards'));
    const board = boards[parseInt(id)];
    const filteredTasks = tasks.filter(task => task.id !== taskId)
    const strTaskId = taskId.toString();
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
    <Draggable draggableId={taskId.toString()} index={index}>
      {(provided, snapshot) => (  
        <div 
            className="task-card" 
            id={taskId} 
            description={description} 
            ref={provided.innerRef}  
            {...provided.draggableProps}  
            {...provided.dragHandleProps} 
        >
          <div className="taskRemoveButtonDiv">
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
    }
    </Draggable>
  ) 
};

export default DraggableTask;