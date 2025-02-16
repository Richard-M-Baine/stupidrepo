import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import './loginform.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  

  
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    return setErrors(['your password is incorrect or your email is not registered.'])
  };
  

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/mylistings' />;
  }

  return (
    <form className='loginFormModal' onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='loginFormDiv'>
        <label htmlFor='email' id='emailloginformlabel' className='email-login-label'>Please enter your Email</label>
        <input
          className='email-box'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
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