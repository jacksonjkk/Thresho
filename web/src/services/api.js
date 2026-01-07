import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4001', withCredentials: false });

API.interceptors.request.use(cfg => {
  const t = localStorage.getItem('jwt');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default API;
