import { createStore } from 'redux';
import userReducer from './userReducer';

const store = createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(function () {
  const state = store.getState();
  localStorage.setItem('state', JSON.stringify(state));
});

export default store;
