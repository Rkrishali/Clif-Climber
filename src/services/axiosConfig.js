import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://65.1.76.162:8081/api/', // Replace with your actual API base URL
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async config => {

    // Assuming you have a function to get the token
    const token = await getToken(); // Replace with your actual token retrieval logic

    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Function to retrieve the token (replace this with your actual implementation)
const getToken = async () => {
  // Example: Retrieve the token from localStorage
  return AsyncStorage.getItem('token'); // Replace with your token retrieval logic
};

export default axiosInstance;
