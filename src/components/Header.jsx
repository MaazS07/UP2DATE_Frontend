import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = ({ darkMode, toggleDarkMode, user }) => (
  <header className="flex justify-between items-center mb-8 p-4 bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg">
    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
      UP-2-DATE
    </h1>
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="flex items-center">
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-2 text-white">{user.displayName}</span>
        </div>
      ) : null}
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-full ${darkMode ? 'bg-orange-400 text-black' : 'bg-white text-orange-400'} transition-colors duration-300`}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  </header>
);

export default Header;
