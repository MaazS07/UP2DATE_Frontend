import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { fetchTodos } from './actions/todoActions';

import TodoList from './components/TodoList';
import Header from './components/Header';
import TaskSummary from './components/TaskSummary';
import LoginSignup from './components/Auth';
import PricingPage from './components/PricingPage';
import 'react-toastify/dist/ReactToastify.css';
import TodoFormComponent from './components/TodoFormComponent';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { todos } = useSelector(state => state.todos);

  useEffect(() => {
    if (user) {
      dispatch(fetchTodos());
    }
  }, [dispatch, user]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filterTodos = (filter) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'upcoming':
        return todos.filter(todo => new Date(todo.dueDate) > today);
      case 'overdue':
        return todos.filter(todo => new Date(todo.dueDate) < today && !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  return (
  
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} transition-colors duration-300`}>
        <div className="container mx-auto p-4">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} setUser={setUser} />
          <Routes>
            <Route path="/login" element={<LoginSignup setUser={setUser} darkMode={darkMode} />} />
            <Route path="/pricing" element={<PricingPage darkMode={darkMode} />} />
            <Route path="/" element={
              user ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="col-span-2">
                    <TodoFormComponent darkMode={darkMode} />
                    <TodoList todos={todos} darkMode={darkMode} />
                  </div>
                  <div>
                    <TaskSummary
                      upcoming={filterTodos('upcoming').length}
                      overdue={filterTodos('overdue').length}
                      completed={filterTodos('completed').length}
                      darkMode={darkMode}
                    />
                  </div>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
          </Routes>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
        />
      </div>
    </Router>
  );
};

export default App;
