import { createContext, useContext, useState } from "react";
import axios from "axios";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Login function
    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
    };

    // Logout function
    const logout = async () => {
        await axios.post("http://localhost:1001/logout", {}, { withCredentials: true });
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
