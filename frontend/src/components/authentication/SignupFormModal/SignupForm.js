// SignUpForm.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { signUp } from '../../../store/session';
import LocationSelector from '../LocationSelector/LocationSelector.js';

const SignUpForm = () => {
  // step 1: basic credentials; step 2: location selection
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState([]);

  // Credentials state fields
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Location state fields (we also pass address details in case you want to geocode further)
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState(''); // named stateVal to avoid conflict with React "state"
  const [postalCode, setPostalCode] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // Step 1 handler: validate basic info then move to location selection
  const onCredentialsSubmit = (e) => {
    e.preventDefault();
    
    if (password !== repeatPassword || !email.includes('@')) {
      return setErrors([{ password: 'Ensure that your passwords match and your email is valid.' }]);
    }
    // Proceed to step two
    setStep(2);
  };

  // Step 2 handler: finalize sign-up submission with location data
  const onLocationSubmit = async (e) => {
    e.preventDefault();

    // You could optionally validate that latitude/longitude are not null here.
    const data = await dispatch(
      signUp(userName, email, password, address, city, stateVal, postalCode, latitude, longitude)
    );
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Navigate to='/mylistings' />;
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

          {/* If you want to capture address fields upfront, you can include them here as well */}
          <div className='signupFormDiv'>
            <label className='signupFormLabel'>Street Address (optional)</label>
            <input
              className='signupformInputBox'
              type='text'
              name='address'
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <div className='signupFormDiv'>
            <label className='signupFormLabel'>City (optional)</label>
            <input
              className='signupformInputBox'
              type='text'
              name='city'
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>
          <div className='signupFormDiv'>
            <label className='signupFormLabel'>State (optional)</label>
            <input
              className='signupformInputBox'
              type='text'
              name='state'
              onChange={(e) => setStateVal(e.target.value)}
              value={stateVal}
            />
          </div>
          <div className='signupFormDiv'>
            <label className='signupFormLabel'>Postal Code (optional)</label>
            <input
              className='signupformInputBox'
              type='text'
              name='postalCode'
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}
            />
          </div>

          <button className='submitSignupButton' type='submit'>Next</button>
        </form>
      )}

      {step === 2 && (
        <div className="locationStep">
          <h2>Select Your General Location</h2>
          <p>
            Drag the marker on the map to your general area. We’ll use a default 15 mile radius for nearby searches.
          </p>
          <LocationSelector 
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
