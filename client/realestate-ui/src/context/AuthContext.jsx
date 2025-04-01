import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

// AuthContext.js
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
      // Initialize from localStorage if available
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    });
  
    const updateUser = (data) => {
      setCurrentUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    };
  
    return (
      <AuthContext.Provider value={{ currentUser, updateUser }}>
        {children}
      </AuthContext.Provider>
    );
  };