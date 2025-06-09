import axios from 'axios';
import { API_BASE_URL } from './config';
import jwt_decode from "jwt-decode";

export const isTeacher = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded.role === 'TEACHER';
  } catch (e) {
    return false;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/validate`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.valid;
  } catch (error) {
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