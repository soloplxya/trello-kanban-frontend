import './column.css';

const Column = (props) => {
    return (
        <div className="column">
            <div className="columnTitle">
                { props.columnTitle }
            </div> 
        </div>
    );
}

export default Column; 
