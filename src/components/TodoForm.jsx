import { useState } from 'react';
import './TodoForm.css';

export default function TodoForm({ onCreate, darkMode }) {
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
    <form onSubmit={handleSubmit} className={`todo-form ${darkMode ? 'dark' : ''}`}>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </div>
    </form>
  );
} 