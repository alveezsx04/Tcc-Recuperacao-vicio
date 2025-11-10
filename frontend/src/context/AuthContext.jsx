import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('user-token');
        if (token) {
            try {
                const decodeUser = jwtDecode(token);
                setUser(decodeUser);
            } catch (error) {
                console.error("Token inválido:", error);
                localStorage.removeItem('user-token')
                
            }
        }
    }, []);

    const login = (token) => {
        const decodedUser = jwtDecode(token);
        localStorage.setItem('user-token', token);
        api.defaults.headers.common['x-access-token'] = token;
        setUser(decodedUser)
    }

    const logout = () => {
        localStorage.removeItem('user-token')
        delete api.defaults.headers.common['x-acess-token'];
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}


export function useAuth() {
    return useContext(AuthContext);
}


