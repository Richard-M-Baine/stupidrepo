import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import ProtectedRoute from './components/authentication/ProtectedRoute';

// homepage stuff
import LandingPage from './components/landingPage';
import About from './components/about';




function App() {

  const [loaded, setLoaded] = useState(false);
  
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }




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
