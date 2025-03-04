import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/home.jsx';

export default function App() {
  return (
    <Router>
      <div>
      <Routes>
          <Route path="/home" element={<Home />} /> 
        </Routes>
      </div>
       
     
    </Router>
  );
}
