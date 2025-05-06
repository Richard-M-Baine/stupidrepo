import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { login } from '../../../store/session';
import './loginmodal.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  

  
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(userName, password));
  
    if (Array.isArray(data)) {
      setErrors(data); // If data is an array, store it
    } else {
      setErrors([]); // If login is successful or `data` is not an array, clear errors
    }
  };
  
  
  

  const updateUserName = (e) => {
    setUserName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Navigate to='/mylistings' />;
  }
  

  return (
    <form className='loginFormModal' onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='loginFormDiv'>
        <label htmlFor='email' id='emailloginformlabel' className='email-login-label'>Please enter your Username</label>
        <input
          className='email-box'
          name='userName'
          type='text'
          placeholder='Email'
          value={userName}
          onChange={updateUserName}
        />
      </div>
      <div className='loginFormDiv'>
        <label htmlFor='password' id='passwordloginformlabel' className='email-login-label'>Please enter your Password</label>
        <input
          className='email-box'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <div className='login-button-div'>
          <button className='login-button' type="submit">Login</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;