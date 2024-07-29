import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosAuth.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
});

axiosAuth.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
});

export default axiosAuth;
