import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, darkMode }) => {
  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div>
      <div className="mb-4 flex justify-center space-x-2">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg ${
              filter === f
                ? 'bg-orange-500 text-white'
                : darkMode
                ? 'bg-white bg-opacity-10 text-white'
                : 'bg-black bg-opacity-10 text-black'
            } transition-colors duration-300`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <ul className="space-y-4">
        {filteredTodos.map(todo => (
          <TodoItem key={todo._id} todo={todo} darkMode={darkMode} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;