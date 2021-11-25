import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://http://pmtrackerv2.com/api/'
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