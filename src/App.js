import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; 
import NotFound from './pages/NotFound'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Landing Page */}
        <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
