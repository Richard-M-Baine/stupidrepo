import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import ProtectedRoute from './components/authentication/ProtectedRoute';

// homepage stuff
import LandingPage from './components/landingPage';
import About from './components/about';
import MyCharities from './components/Home/myPage';

// navbar and user stuff
import NavBar from './components/Navigation/NavBar.js';
import SettingsForm from './components/authentication/Settings/index.js';

// group stuff
import CreateGroup from './components/Groups/CreateGroup/index.js';
import EditCharityForm from './components/Groups/EditGroup/index.js';
import UpdateAddressForm from './components/Groups/EditGroup/updateaddresspractice';
import AllCharities from './components/Groups/AllGroups/index.js';
import CharityDetails from './components/Groups/GroupDetails/index.js';

// request stuff
import CreateRequestForm from './components/Requests/CreateRequest/index.js';
import EditRequestForm from './components/Requests/EditRequest/index.js';
import AllRequests from './components/Requests/AllRequests/index.js';
import RequestDetails from './components/Requests/RequestDetails/index.js';

// messaging and map stuff
import MyMessages from './components/Messages/messageHome/index.js';

function App() {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return null;
  }


  return (
    <>
      <NavBar loaded={loaded} />

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<About />} />

        <Route
          path='/mylistings'
          element={
            <ProtectedRoute>
              <MyCharities />
            </ProtectedRoute>
          }
        />

        <Route
          path='/groups'
          element={
            <ProtectedRoute>
              <AllCharities />
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
        <Route
          path='/groups/:id'
          element={
            <ProtectedRoute>
              <CharityDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path='/groups/edit/:id'
          element={
            <ProtectedRoute>
              <EditCharityForm />
            </ProtectedRoute>
          }
        />
        <Route
          path='/groups/editAddress/:id'
          element={
            <ProtectedRoute>
              <UpdateAddressForm />
            </ProtectedRoute>
          }
        />

        <Route
          path='/requests'
          element={
            <ProtectedRoute>
              <AllRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path='/requests/:id'
          element={
            <ProtectedRoute>
              <RequestDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path='/requests/create'
          element={
            <ProtectedRoute>
              <CreateRequestForm />
            </ProtectedRoute>
          }
        />
        <Route
          path='/requests/edit/:id'
          element={
            <ProtectedRoute>
              <EditRequestForm />
            </ProtectedRoute>
          }
        />

        <Route
          path='/messages'
          element={
            <ProtectedRoute>
              <MyMessages />
            </ProtectedRoute>
          }
        />

        <Route
          path='/settings'
          element={
            <ProtectedRoute>
              <SettingsForm />
            </ProtectedRoute>
          }
        />
      </Routes>


    </>
  );
}

export default App;
