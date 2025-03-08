// utils/axiosConfig.js
import axios from 'axios';

const API_URL = '/api'; // Proxy route to forward requests

const instance = axios.create({
  baseURL: API_URL, // Set the base URL to the proxy route
});

export default instance;