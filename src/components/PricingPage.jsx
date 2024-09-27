import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { FaCheck, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';

const PAYPAL_CLIENT_ID = 'ASmIkP6ZLOAJBsoC_Kql_C8d7IQM_AYD36bxLkZ8tLj2fMeWGeZfsRzUoIuDYkScoSwSR_0Sr6rgVBap'

const PricingPage = ({ darkMode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });

    return () => unsubscribe();
  }, []);

  const handleSubscribe = async (plan) => {
    if (!user) {
      toast.error('Please log in to subscribe');
      navigate('/login');
      return;
    }

    if (plan === 'free') {
      try {
        const response = await axios.post('http://localhost:5000/api/create-paypal-order', {
          userId: user.uid,
          plan: plan
        });

        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/');
        } else {
          throw new Error('Failed to activate free trial');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to activate free trial');
      }
    }
  };

  const createOrder = async (data, actions, plan) => {
    try {
      const response = await axios.post('http://localhost:5000/api/create-paypal-order', {
        userId: user.uid,
        plan: plan
      });

      return response.data.id;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create order');
    }
  };

  const onApprove = async (data, actions, plan) => {
    try {
      const response = await axios.post('http://localhost:5000/api/capture-paypal-order', {
        orderID: data.orderID,
        userId: user.uid,
        plan: plan
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
      } else {
        throw new Error('Failed to capture payment');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to process payment');
    }
  };

  const PricingCard = ({ title, price, features, plan, isPopular }) => (
    <motion.div
      className={`relative ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-8 rounded-lg shadow-lg transition-all duration-300`}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-yellow-500 text-white px-4 py-1 rounded-tr-lg rounded-bl-lg font-bold shadow-md">
          Popular
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-4xl font-bold mb-6">
        ${price}<span className="text-sm font-normal">{plan !== 'free' ? '/month' : ''}</span>
      </p>
      <ul className="mb-8">
        {features.map((feature, index) => (
          <motion.li 
            key={index} 
            className="flex items-center mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FaCheck className="text-green-500 mr-2" />
            {feature}
          </motion.li>
        ))}
      </ul>
      {plan === 'free' ? (
        <motion.button
          onClick={() => handleSubscribe(plan)}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold shadow-md hover:bg-yellow-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Free Trial
        </motion.button>
      ) : (
        <div className="paypal-button-container">
          <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions, plan)}
            onApprove={(data, actions) => onApprove(data, actions, plan)}
            style={{ layout: "horizontal", color: "gold", shape: "pill" }}
          />
        </div>
      )}
    </motion.div>
  );

  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <motion.div 
        className={`flex flex-col items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className={`text-5xl font-bold mt-16 mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Choose Your Plan
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-16">
          <PricingCard
            title="Free Trial"
            price="0"
            features={["1 day access", "Basic features", "Limited tasks"]}
            plan="free"
          />
          <PricingCard
            title="Monthly Plan"
            price="7"
            features={["Full access for 1 month", "All features", "Unlimited tasks", "Priority support"]}
            plan="monthly"
            isPopular={true}
          />
          <PricingCard
            title="Yearly Plan"
            price="70"
            features={["Full access for 1 year", "All features", "Unlimited tasks", "Priority support", "2 months free"]}
            plan="yearly"
          />
        </div>
      </motion.div>
    </PayPalScriptProvider>
  );
};

export default PricingPage;
