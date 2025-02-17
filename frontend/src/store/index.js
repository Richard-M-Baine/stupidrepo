import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // Import logger properly
import session from './session';
import group from './session'
import requests from './session'

const rootReducer = combineReducers({
  session,
  group,
  requests
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === 'production'
      ? getDefaultMiddleware().concat(thunk)
      : getDefaultMiddleware().concat(thunk, logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
