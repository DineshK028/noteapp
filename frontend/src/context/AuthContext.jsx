import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios
axios.defaults.baseURL = 'https://notes-app-backend-eozg.vercel.app';
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Verifying user with token:', token);
        if (token) {
          const response = await axios.get('/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Verify response:', response.data);
          if (response.data.success) {
            setUser(response.data.user);
          }
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    };

    verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    console.log('User set after login:', userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};