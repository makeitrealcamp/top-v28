import { createContext, useEffect, useState } from 'react';

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState();

  // Mounted
  useEffect(() => {
    const json = localStorage.getItem('user');
    if (json) {
      try {
        const data = JSON.parse(json);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  // Updated
  useEffect(() => {
    if (user === null) {
      localStorage.removeItem('user');
    }
    if (user !== undefined) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
