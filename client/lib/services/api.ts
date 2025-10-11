import axios from 'axios';
import { Routes } from '@/constants/routes';

const api = axios.create({
  baseURL: Routes.API.BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
