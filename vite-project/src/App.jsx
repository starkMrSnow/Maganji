import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/home.jsx';
import Transaction from './pages/Transaction/transaction.jsx'
import Layout from './pages/Layout/layout.jsx'
import SpendingHabits from './pages/SpendingHabits/spendinghabits.jsx'
import Goals from './pages/Goals/goals.jsx'
import Profile from './pages/Profile/profile.jsx'
import Settings from './pages/Settings/settings.jsx'
// import Settings from './pages/Settings/settings.jsx'
import Login from './pages/Login/login.jsx'
import Signup from './pages/Signup/signup.jsx'

export default function App() {
  return (
    <Router>
      <div>
      <Routes>
      <Route path="/layout" element={<Layout />} /> 
          <Route path="/home" element={<Home />} /> 
          <Route path="/spendinghabits" element={<SpendingHabits />} /> 
          <Route path="/goals" element={<Goals />} /> 
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} /> 
          <Route path="/transaction" element={<Transaction />} /> 
        </Routes>
      </div>
       
     
    </Router>
  );
}
