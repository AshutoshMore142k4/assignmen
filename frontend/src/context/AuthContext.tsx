import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api/auth';
import { AuthUser, AuthContextType, LoginPayload, RegisterPayload } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Optionally, load token/user from localStorage or sessionStorage
  }, []);

  const login = async (payload: LoginPayload) => {
    const res = await loginUser(payload);
    setUser(res.user);
    setToken(res.token);
  };

  const register = async (payload: RegisterPayload) => {
    const res = await registerUser(payload);
    setUser(res.user);
    setToken(res.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}; 