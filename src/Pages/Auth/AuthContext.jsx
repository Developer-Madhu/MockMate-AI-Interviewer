// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);