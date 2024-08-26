import axios from 'axios';

// API URL base
const API_BASE_URL = 'https://artvista-dl5j.onrender.com/'; // Replace with your backend URL
//const API_BASE_URL = 'http://127.0.0.1:5555'; // Replace with your backend URL


// Configure axios to include the token in all requests
const token = localStorage.getItem('jwtToken');
// if (token) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }


export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`,);
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}projects`, projectData,
        {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        }
      );
      return response;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };

// export default {
//    getProjects,
//    getUserProfile,
//    registerUser,
//    loginUser,
//    createProject,
// };
