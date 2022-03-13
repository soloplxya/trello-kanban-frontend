import './column.css';
import DraggableTask from './draggableTask';
import { Droppable } from "react-beautiful-dnd";

const Column = (props) => {
    const displayedItems = () => {
        console.log(props.tasks)
        return (
            props.tasks.map((x,i) => {
                return <DraggableTask 
                            key={x.id} 
                            index={x.id}
                            taskId={x.id}
                            tasks={props.tasks}
                            setTasks={props.setTasks}
                            description={x.description} 
                            columnTitle={props.columnTitle} 
                        >
                        </DraggableTask>
            })
        )
    }

    return (
        <Droppable droppableId={props.columnTitle}>
            {(provided, snapshot) => (
                <div 
                    className="column" 
                    onDrop={props.onDrop}
                >
                 <div className="columnTitle">
                     { props.columnTitle }
                 </div> 
                 <div
                     {...provided.droppableProps}  
                     ref={provided.innerRef} 
                 >
                 { 
                     displayedItems()
                 }
                 </div>
                 {provided.placeholder}
             </div>
            )
           }      
        </Droppable> 
    );
}

export default Column; 
