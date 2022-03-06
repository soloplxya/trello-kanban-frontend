import './column.css';
import DraggableTask from './draggableTask';
import { Fragment } from 'react';

const Column = (props) => {
    return (
        <Fragment>
            <div className="column">
                <div className="columnTitle">
                    { props.columnTitle }
                </div> 
                <DraggableTask description="test" />
            </div>
        </Fragment> 
    );
}

export default Column; 
