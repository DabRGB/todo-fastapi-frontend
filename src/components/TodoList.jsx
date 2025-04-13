import TodoItem from './TodoItem';

export default function TodoList({ todos, onUpdate, onDelete, onToggleComplete, darkMode }) {
  if (todos.length === 0) {
    return (
      <div className={`text-center py-4 ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        No tasks found
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className={`text-xl font-semibold mb-3 ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Tasks ({todos.length})
      </h2>
      <ul className="space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            darkMode={darkMode}
          />
        ))}
      </ul>
    </div>
  );
}