import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../actions/todoActions'; // Make sure this path is correct
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const TodoItem = ({ todo, darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(updateTodo(todo._id, { ...todo, completed: !todo.completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  const handleEdit = () => {
    dispatch(updateTodo(todo._id, editedTodo));
    setIsEditing(false);
  };

  const itemClass = `mb-2 p-4 rounded-lg shadow-lg ${
    darkMode ? 'bg-white bg-opacity-10' : 'bg-black bg-opacity-10'
  } backdrop-filter backdrop-blur-lg transition-all duration-300 transform hover:scale-105`;

  const inputClass = `w-full p-2 rounded ${
    darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300`;

  if (isEditing) {
    return (
      <li className={itemClass}>
        <input
          type="text"
          value={editedTodo.title}
          onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
          className={`${inputClass} mb-2`}
        />
        <textarea
          value={editedTodo.description}
          onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
          className={`${inputClass} mb-2`}
        />
        <input
          type="date"
          value={editedTodo.dueDate?.split('T')[0]}
          onChange={(e) => setEditedTodo({ ...editedTodo, dueDate: e.target.value })}
          className={`${inputClass} mb-2`}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleEdit} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300">
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={itemClass}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="mr-2 h-5 w-5 text-orange-500 focus:ring-orange-500"
          />
          <div>
            <h3 className={`font-bold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </h3>
            <p className="text-sm text-gray-500">{todo.description}</p>
            <p className="text-xs text-gray-400">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setIsEditing(true)} className="text-yellow-500 hover:text-yellow-600 transition-colors duration-300">
            <FaEdit />
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-600 transition-colors duration-300">
            <FaTrash />
          </button>
          <button onClick={handleToggle} className={`${todo.completed ? 'text-green-500' : 'text-gray-400'} hover:text-green-600 transition-colors duration-300`}>
            <FaCheck />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
