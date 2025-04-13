import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  // const VITE_API_BASE_URL_LOCAL = 'https://todolist-django-54z1.onrender.com/api/';

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (title) => {
    try {
      await createTodo(title);
      await loadTodos();
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      await updateTodo(id, updates);
      await loadTodos();
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed });
      await loadTodos();
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };  

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <div className="todo-container">
        <div className="header">
          <h1>Todo App</h1>
          <button 
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        
        <TodoForm onCreate={handleCreate} />
        
        <FilterButtons filter={filter} setFilter={setFilter} />
        
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <TodoList 
            todos={filteredTodos} 
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onToggleComplete={toggleComplete}
          />
        )}
      </div>
    </div>
  );
}

function TodoForm({ onCreate }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      await onCreate(title);
      setTitle('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
}

function TodoList({ todos, onUpdate, onDelete, onToggleComplete }) {
  if (todos.length === 0) {
    return <div className="empty-state">No tasks found</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}

function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleUpdate = async () => {
    await onUpdate(todo.id, { title: editText });
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id, todo.completed)}
      />

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            className="todo-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button 
            className="btn btn-sm btn-primary"
            onClick={handleUpdate}
          >
            Save
          </button>
          <button 
            className="btn btn-sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
          <div className="todo-actions">
            <button
              className="btn btn-sm btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-delete"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

function FilterButtons({ filter, setFilter }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-buttons">
      {filters.map(f => (
        <button
          key={f.value}
          className={`filter-btn ${filter === f.value ? 'active' : ''}`}
          onClick={() => setFilter(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default App;