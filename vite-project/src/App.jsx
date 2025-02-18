import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Demo from './pages/demo/demo.jsx';

export default function App() {
  return (
    <Router>
      <div>
      <Routes>
          <Route path="/demo" element={<Demo />} /> 
        </Routes>
      </div>
       
     
    </Router>
  );
}
