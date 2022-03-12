import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Boards from './boards/boardPage'
import Board from './board/board'

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/trello-kanban-frontend">
        <Routes>
          <Route
            exact
            path={"/"}
            element={<Boards />}
          />
          <Route 
            path=":id" 
            element={<Board />} 
          />
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;

