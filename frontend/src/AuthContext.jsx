import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from './api';
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    

    const user_signup = async (email, password, first_name, last_name, phone_number, country, confirmPassword, ref_code) => {
      try {
          const response = await axiosInstance.post('api/user/register/', { email, password, first_name, last_name, phone_number, country, confirmPassword, ref_code });
          const { access, refresh } = response.data.tokens;
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', refresh);
          axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
          setIsAuthenticated(true);
          return true;
      } catch (error) {
          console.error('Signup failed', error);
          setIsAuthenticated(false);
          return false;
      }
    };

    const user_login = async (email, password) => {
        try {
            const response = await axiosInstance.post('api/user/login/', { email, password });
            const { access, refresh } = response.data.tokens;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`; 
            //setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error('Login failed', error);
        }
    };


    const user_logout = async () => {
        try{
            const refresh_token = localStorage.getItem('refresh_token');

            if (!refresh_token) {
                console.error("No refresh token found");
                return;
            }

            const response = await axiosInstance.post('api/logout/', {
                refresh: refresh_token
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (response.status === 205) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                delete axios.defaults.headers.common['Authorization'];
                setIsAuthenticated(false);
            }
    
        } catch (error){
            console.error('Logout failed', error);
        }
    };

    return (
      <AuthContext.Provider value={{ isAuthenticated, user_signup, user_login, user_logout }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => {
  return useContext(AuthContext);
};