import axios from 'axios';


const baseURL = 'http://localhost:8000/api/';
const timeout = 10000;

const registerInstance = axios.create({
  baseURL: `${baseURL}register/`,
  timeout: timeout,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

const loginInstance = axios.create({
  baseURL: `${baseURL}token/`,
  timeout: timeout,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

const profileInstance = axios.create({
  baseURL: `${baseURL}profile/`,
  timeout: timeout,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

const setTokenInHeader = (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

registerInstance.interceptors.request.use(setTokenInHeader, (error) => Promise.reject(error));
loginInstance.interceptors.request.use(setTokenInHeader, (error) => Promise.reject(error));
profileInstance.interceptors.request.use(setTokenInHeader, (error) => Promise.reject(error));

export default { loginInstance, profileInstance, registerInstance };

