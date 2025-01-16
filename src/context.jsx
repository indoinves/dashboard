import React, { createContext, useContext, useState, useMemo } from 'react';

// Create the Context
export const Context = createContext();

// Provider Component
export const ContextProvider = ({ children }) => {
  const [belt, setBelt] = useState('');
  const [section, setSection] = useState('');

  // Memoize getters and setters for performance
  const getters = useMemo(() => ({ belt, section }), [belt, section]);
  const setters = useMemo(() => ({ setBelt, setSection }), []);

  return (
    <Context.Provider value={{ getters, setters }}>
      {children}
    </Context.Provider>
  );
};

// Custom Hook
export const useCustomContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useCustomContext must be used within a ContextProvider');
  }
  return context;
};
