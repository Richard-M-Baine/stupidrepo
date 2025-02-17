import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// homepage stuff
import LandingPage from './components/landingPage';
import About from './components/about';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/about' element={<About />} />
      <Route path='/' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
