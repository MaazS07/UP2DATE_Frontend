import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions/todoActions';
import { FaPlus, FaRegCalendarAlt, FaRegClipboard } from 'react-icons/fa';

function TodoForm({ darkMode }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo({ title, description, dueDate }));
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  const formClass = `mb-8 p-6 rounded-xl shadow-2xl ${
    darkMode
      ? 'bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-xl'
      : 'bg-white bg-opacity-70 backdrop-filter backdrop-blur-xl'
  } border-t border-l border-gray-200 border-opacity-30`;

  const inputClass = `w-full p-3 rounded-lg ${
    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300`;

  const labelClass = `block text-sm font-medium mb-1 ${
    darkMode ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      <div className="mb-4">
        <label htmlFor="title" className={labelClass}>Task Title</label>
        <div className="relative">
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className={`${inputClass} pl-10`}
          />
          <FaRegClipboard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className={labelClass}>Task Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className={`${inputClass} h-24 resize-none`}
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="dueDate" className={labelClass}>Due Date</label>
        <div className="relative">
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`${inputClass} pl-10`}
          />
          <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center shadow-lg transform hover:scale-105"
      >
        <FaPlus className="mr-2" /> Add Task
      </button>
    </form>
  );
}

export default TodoForm;