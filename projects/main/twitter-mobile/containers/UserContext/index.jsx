import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import { initialState } from './state';

const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children, overrides }) {
  const [state, dispatch] = useReducer(reducer, initialState, () =>
    Object.assign(initialState, overrides),
  );

  function setUser(payload) {
    dispatch({
      type: 'SET_USER',
      payload,
    });
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
