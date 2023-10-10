import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import { initialState } from './state';
import { UserType } from '../../api/users/types';

type UserContextValue = {
  user: UserType | null;
  setUser: (payload: UserType | null) => void;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

type UserProviderProps = {
  children: React.ReactNode;
  overrides?: {
    user: UserType | null;
  };
};

export function UserProvider({ children, overrides }: UserProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState, () =>
    Object.assign(initialState, overrides),
  );

  function setUser(payload: UserType | null) {
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
