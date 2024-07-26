import { useEffect, useState } from 'react'
import './App.css'
import { TodoContextProvider } from './contexts/TodoContext'
import TodoForm from './components/TodoForm';
import TodoItems from './components/TodoItems';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo));
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo));
  }

  useEffect(() => {
    try {
      const todos = JSON.parse(localStorage.getItem("todos"));

      if (todos && todos.length > 0) {
        setTodos(todos);
      }
    } catch (error) {
      console.error("Error parsing localStorage todos:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#1a3b6c] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Task Tide</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {
              todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItems todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
