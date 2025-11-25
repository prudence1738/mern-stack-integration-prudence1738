import React, { createContext, useContext, useState } from 'react';

const AppCtx = createContext();
export const useApp = () => useContext(AppCtx);

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = (token, userObj) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userObj));
    setUser(userObj);
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AppCtx.Provider value={{ posts, setPosts, categories, setCategories, user, login, logout }}>
      {children}
    </AppCtx.Provider>
  );
};
