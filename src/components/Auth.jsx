import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaGoogle, FaEnvelope, FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { auth } from '../firebaseConfig';

const LoginSignup = ({ setUser, darkMode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL, isSubscribed: false });
      toast.success(`Welcome, ${user.displayName}`);
      navigate('/pricing');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (isLogin) {
        result = await signInWithEmailAndPassword(auth, email, password);
      } else {
        result = await createUserWithEmailAndPassword(auth, email, password);
      }
      setUser({ uid: result.user.uid, displayName: result.user.email, isSubscribed: false });
      toast.success(isLogin ? 'Logged in successfully' : 'Account created successfully');
      navigate('/pricing');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className={`flex justify-center m-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <motion.div
        className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <FaSignInAlt className="inline-block mr-2 mb-1" />
              Login
            </motion.span>
          ) : (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <FaUserPlus className="inline-block mr-2 mb-1" />
              Sign Up
            </motion.span>
          )}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-sm font-bold mb-2">Email</label>
            <motion.div whileFocus="focus" variants={inputVariants}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} p-2 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                required
              />
              <FaEnvelope className="absolute left-3 top-10 text-gray-400" />
            </motion.div>
          </div>
          <div className="mb-6 relative">
            <label className="block text-sm font-bold mb-2">Password</label>
            <motion.div whileFocus="focus" variants={inputVariants}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} p-2 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                required
              />
              <FaLock className="absolute left-3 top-10 text-gray-400" />
            </motion.div>
          </div>
          <motion.button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded w-full transition-colors duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? <FaSignInAlt className="mr-2" /> : <FaUserPlus className="mr-2" />}
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.button>
        </form>
        <div className="flex items-center justify-between my-6">
          <hr className="flex-grow border-gray-400" />
          <span className="mx-4 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-400" />
        </div>
        <motion.button 
          onClick={handleGoogleSignIn} 
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded w-full flex items-center justify-center transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </motion.button>
        <p className="mt-6 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <motion.button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-yellow-500 hover:text-yellow-600 ml-2 transition-colors duration-300 font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </motion.button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginSignup;