import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers if needed
  },
});

// Optional: Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify the request before it is sent (e.g., add an Authorization header)
    const token = localStorage.getItem('token'); // Example: getting a token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Modify the response data if needed
    return response;
  },
  (error) => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      // For example: handle unauthorized access
      console.error('Unauthorized access - maybe redirect to login page');
    }
    return Promise.reject(error);
  }
);

export default api;
