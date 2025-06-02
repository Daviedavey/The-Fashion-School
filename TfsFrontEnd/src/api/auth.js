import axios from 'axios';
import { API_BASE_URL } from './config';

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

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
 } catch (error) {
    // Handle different error response formats
    if (error.response) {
      // Backend returned error response (4xx, 5xx)
        console.log('Server Error:', error.response.data)
         console.log('Status Code:', error.response.status)
       // message: error.response.data.message || 'Login failed',
       // errors: error.response.data.errors || null,
       // status: error.response.status
    
    } else if (error.request) {
      // No response received
      console.log('No response received:', error.request);
      console.log('Error message:', error.message)
     // throw { message: 'No response from server' };
    } else {
      // Other errors
      //throw { message: error.message };
      console.log('Error message:', error.message)
    }
    console.log('Full error object:', error);
  }
};