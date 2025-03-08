import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://49.12.193.156:5300/api' // Direct API URL for production
    : '/api'; // For local development, proxy will handle it.

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
