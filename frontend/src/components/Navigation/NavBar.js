import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton/index.js';
import { useSelector } from 'react-redux';

import './navigation.css';

const NavBar = ({ loaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  if (!loaded) return null;

  if (!sessionUser) {
    return (
      <nav className='navigationSignoutOuterDiv'>
        {/* You could add login/signup links here later */}
      </nav>
    );
  }

  return (
    <nav className='navigationOuterDiv'>
      <div className='navigationLogInDiv'>
        <NavLink to='/mylistings' exact='true' activeclassname='active'>
          My Home Page
        </NavLink>
      </div>

      <div className='navigationLogInDiv'>
        <NavLink to='/groups/create' exact='true' activeclassname='active'>
          Add Organization
        </NavLink>
      </div>

      <div className='navigationLogInDiv'>
        <NavLink to='/groups' exact='true' activeclassname='active'>
          Nearby Organizations
        </NavLink>
      </div>

      <div className='navigationLogInDiv'>
        <NavLink to='/requests' exact='true' activeclassname='active'>
          Nearby Requests
        </NavLink>
      </div>

      <div className='navigationLogInDiv'>
        <NavLink to='/requests/create' exact='true' activeclassname='active'>
          Make a Request
        </NavLink>
      </div>

      <div className='navigationLogInDiv'>
        <NavLink to='/messages' exact='true' activeclassname='active'>
          My Messages
        </NavLink>
      </div>

      <div>
        <ProfileButton />
      </div>
    </nav>
  );
};

export default NavBar;
