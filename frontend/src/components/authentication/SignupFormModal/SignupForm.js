// SignUpForm.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { signUp } from '../../../store/session';
import LocationSelector from '../LocationSelector/LocationSelector.js';
import { fetchAPIKeyThunk } from '../../../store/maps.js'

const SignUpForm = () => {
  // step 1: basic credentials; step 2: location selection
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState([]);

  // Credentials state fields
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loaded, setLoaded] = useState(false)

  const user = useSelector(state => state.session.user);
  const apiKey = useSelector(state => state?.maps?.key); // Fetch API Key here
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchAPIKeyThunk())// Fetch API key in parent
      .then(() => setLoaded(true));
  }, [dispatch]);
  // Step 1 handler
  const onCredentialsSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword || !email.includes('@')) {
      return setErrors([{ password: 'Ensure that your passwords match and your email is valid.  For the love of crumbcake!' }]);
    }

    setStep(2);
  };

  // Step 2 handler
  const onLocationSubmit = async (e) => {
    e.preventDefault();

    
    const data = await dispatch(
      signUp(userName, email, password, latitude, longitude)
    );
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Navigate to='/mylistings' />;
  }

  if (!loaded) {
    return <p>wait a bloody minute...</p>;
}

  return (
    <div className="signupContainer">
      {step === 1 && (
        <form className='signupFormOut' onSubmit={onCredentialsSubmit}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{Object.values(error)[0]}</li>
            ))}
          </ul>

          <div className='signupFormDiv'>
            <label className='signupFormLabel'>User Name</label>
            <input
              className='signupformInputBox'
              type='text'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
              value={userName}
            />
          </div>
          <div className='signupFormDiv'>
            <label className='signupFormLabel'>Email</label>
            <input
              className='signupformInputBox'
              type='text'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className='signupFormDiv'>
            <label className='signupFormLabel'>Password</label>
            <input
              className='signupformInputBox'
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className='signupFormDiv'>
            <label className='signupFormLabel'>Verify Password</label>
            <input
              className='signupformInputBox'
              type='password'
              name='repeat_password'
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
              required={true}
            />
          </div>


          <button className='submitSignupButton' type='submit'>Next</button>
        </form>
      )}

      {step === 2 && (
        <div className="locationStep">
          <h2 className='signupH2Div'>Select Your General Location</h2>
          <p>
            Drag the marker on the map to your general area. We’ll use a default 15 mile radius for nearby searches.
          </p>
          <p>
            For privacy reasons the your location feature on google maps is disabled and we do not store your personal info on our servers besides email address.
          </p>

          <p>Just drag it near where you live or wish to lend or receive aid.. you can always alter the region or distance later</p>
          <LocationSelector apiKey={apiKey}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
          <button className='submitSignupButton' onClick={onLocationSubmit}>Complete Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
