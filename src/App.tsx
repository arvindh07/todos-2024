import { useNavigate } from 'react-router-dom'
import './App.css'
import TodoList from './components/TodoList'

function App() {
  const navigate = useNavigate();

  return (
    <div style={{ marginInline: "1rem" }}>
      {/* heading */}
      {/* action btn to add todo */}
      {/* display todos */}
      <h1 className="heading">Todo App</h1>
      <button className='add__btn' onClick={() => navigate("/add")}>Add todo</button>
      <TodoList />
    </div>
  )
}

export default App
