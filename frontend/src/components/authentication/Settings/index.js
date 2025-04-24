// SettingsForm.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../store/session';
import { Navigate } from 'react-router-dom';
import LocationSelector from '../LocationSelector/LocationSelector';

export default function SettingsForm() {
  const dispatch = useDispatch();
  const user = useSelector(s => s.session.user);

  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  // form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [searchRadiusMiles, setSearchRadiusMiles] = useState(15);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setLatitude(user.latitude);
      setLongitude(user.longitude);
      setSearchRadiusMiles(user.searchRadiusMiles);
    }
    setLoaded(true);
  }, [user]);

  if (!loaded) return <p>Loading settings…</p>;
  if (!user)   return <Navigate to="/login" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];
    if (password && password !== repeatPassword) {
      validationErrors.push('Passwords do not match.');
    }
    if (!email.includes('@')) {
      validationErrors.push('Please provide a valid email.');
    }
    if (validationErrors.length) {
      return setErrors(validationErrors);
    }

    const formData = {
      email,
      ...(password ? { password } : {}),
      latitude,
      longitude,
      searchRadiusMiles
    };

    const data = await dispatch(updateUser(formData));
    if (data) {
      setErrors(data);
    } else {
      setErrors([]);
      alert('Settings updated successfully!');
    }
  };

  return (
    <div className="settingsContainer">
      <h2>Account Settings</h2>
      <ul className="errorsList">
        {errors.map((err, i) => <li key={i}>{err}</li>)}
      </ul>
      <form onSubmit={handleSubmit} className="settingsForm">
        {/* email */}
        <div className="formRow">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        {/* password */}
        <div className="formRow">
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="formRow">
          <label>Confirm Password</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />
        </div>

        {/* location */}
        <div className="formRow fullWidth">
          <label>General Location</label>
          <LocationSelector
            apiKey={useSelector(s => s.maps.key)}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            initialLat={latitude}
            initialLng={longitude}
          />
        </div>

        {/* radius */}
        <div className="formRow">
          <label>Search Radius (miles)</label>
          <input
            type="number"
            min="1"
            value={searchRadiusMiles}
            onChange={e => setSearchRadiusMiles(+e.target.value)}
          />
        </div>

        <button type="submit" className="saveSettingsButton">
          Save Changes
        </button>
      </form>
    </div>
  );
}
