import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8894/api/'
});

instance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    Promise.reject(error)
  });

// Response interceptor for API calls
instance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  return Promise.reject(error);
});

export default instance;