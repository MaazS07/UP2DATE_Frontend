import React from 'react';
import { FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

function TaskSummary({ upcoming, overdue, completed, darkMode }) {
  const cardClass = `p-4 rounded-lg shadow-lg ${
    darkMode
      ? 'bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg'
      : 'bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg'
  } transition-all duration-300 transform hover:scale-105`;

  return (
    <div className="space-y-4">
      <div className={cardClass}>
        <h2 className="text-xl font-bold mb-2 flex items-center">
          <FaClock className="mr-2 text-blue-500" /> Upcoming Tasks
        </h2>
        <p className="text-3xl font-bold text-blue-500">{upcoming}</p>
      </div>
      <div className={cardClass}>
        <h2 className="text-xl font-bold mb-2 flex items-center">
          <FaExclamationTriangle className="mr-2 text-yellow-500" /> Overdue Tasks
        </h2>
        <p className="text-3xl font-bold text-yellow-500">{overdue}</p>
      </div>
      <div className={cardClass}>
        <h2 className="text-xl font-bold mb-2 flex items-center">
          <FaCheckCircle className="mr-2 text-green-500" /> Completed Tasks
        </h2>
        <p className="text-3xl font-bold text-green-500">{completed}</p>
      </div>
    </div>
  );
}

export default TaskSummary;
