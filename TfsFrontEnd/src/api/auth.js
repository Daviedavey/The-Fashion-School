import axios from 'axios';
import { API_BASE_URL } from './config';
import { jwtDecode } from 'jwt-decode';

export const isTeacher = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.role === 'TEACHER';
  } catch (e) {
    console.error('JWT decode error:', e)
    return false;
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Local expiration check first
  } catch {
    return false;
  }
};


export const register = async (username, name, surname, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
      username,
      name,
      surname,
      email,
      password
    });
    return response.data;
  } catch (error) {
    // Handle different error response formats
    if (error.response) {
      // Backend returned error response (4xx, 5xx)
      throw {
        message: error.response.data.message || 'Registration failed',
        errors: error.response.data.errors || null,
        status: error.response.status
      };
    } else if (error.request) {
      // No response received
      throw { message: 'No response from server' };
    } else {
      // Other errors
      throw { message: error.message };
    }
  }
};

// api/auth.js
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      username,
      password
    });
    
    if (response.data && response.data.token) {
      const decoded = jwtDecode(response.data.token);
      console.log('Decoded token:', decoded);
      return response;
    }

    throw new Error('Invalid response format');
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw error;
  }
};

export const getUserRol = (token) => {
  const decoded = jwtDecode(token);
  return decoded.role; // Returns Teacher or Student
};

export const constisTeacher = (token) => {
  return getUserRol(token) === 'TEACHER';
};