import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home      from './pages/Home'; 
import Dashboard from './pages/Dashboard'; 
import NotFound  from './pages/NotFound'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Landing Page */}
        <Route path="/app" element={<Dashboard />} /> {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
