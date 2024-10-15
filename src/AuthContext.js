
import axios from 'axios';
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/token/', { username, password });
      const { access, refresh } = response.data;

   
      localStorage.setItem('accessToken', access); //we will save the tokens in the local storaege
      localStorage.setItem('refreshToken', refresh);

      
      const profileRes = await axios.get('/api/profile/', {  //get userr profile
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setUser(profileRes.data);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
