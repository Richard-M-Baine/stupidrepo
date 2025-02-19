import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import ProtectedRoute from './components/authentication/ProtectedRoute';

// homepage stuff
import LandingPage from './components/landingPage';
import About from './components/about';
import MyCharities from './components/Home/myPage';

// navbar stuff
import NavBar from './components/Navigation/NavBar.js';

// group stuff

import CreateGroup from './components/Groups/CreateGroup/index.js'

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
    <NavBar loaded={loaded} />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/' element={<LandingPage />} />
        <Route
          path='/mylistings'
          element={
            <ProtectedRoute>
              <MyCharities />
            </ProtectedRoute>
          }
        />
        <Route
          path='/groups/create'
          element={
            <ProtectedRoute>
              <CreateGroup />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
