import { configureStore } from '@reduxjs/toolkit';
import userReducer, { initialValues as userInitialState } from './userReducer';

const reducer = {
  user: userReducer,
};

const initialState = {
  user: userInitialState,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  initialState,
});

store.subscribe(function () {
  const state = store.getState();
  localStorage.setItem('state', JSON.stringify(state));
});

export default store;
