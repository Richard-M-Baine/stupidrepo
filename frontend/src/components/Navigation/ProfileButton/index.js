import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as sessionActions from '../../../store/session';
import './profile.css';

import profileImage from './profileImage.png';

const ProfileButton = () => {
  const user = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const openMenu = () => {
    setShowMenu(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    navigate('/');
  };

  const goToSettings = (e) => {
    e.preventDefault();
    navigate('/'); // Replace this with your settings route if needed
  };

  if (!user || !user.user) {
    return <div className="profile-logged-out">Not logged in</div>;
  }

  return (
    <div>
      <button className='buttonprofilegood' onClick={openMenu}>
        <img src={profileImage} alt='the letter a but with holding hands' />
      </button>

      {showMenu && (
        <ul className="profile-dropdown" ref={dropdownRef}>
          <li className='profileNavName'>Welcome {user.user.userName}</li>
          <li className='profileNavName'>Logged in with {user.user.email}</li>
          <li className='profileNavName'>Default latitude: {user.user.latitude}</li>
          <li className='profileNavName'>Default longitude: {user.user.longitude}</li>
          <li className='profileNavName'>
            <button className='profileButtonp' onClick={goToSettings}>
              Change Settings
            </button>
          </li>
          <li className='profileNavName'>
            <button className="profileButtonp" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;
