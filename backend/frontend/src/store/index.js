import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // Keep this for dev logging
import session from './session';
import group from './groups';
import requests from './requests';
import locations from './locations';
import messages from './messages';
import recmessages from './recmessages';
import maps from './maps';

const rootReducer = combineReducers({
  session,
  group,
  requests,
  locations,
  messages,
  recmessages,
  maps
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === 'production'
      ? getDefaultMiddleware()
      : getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
