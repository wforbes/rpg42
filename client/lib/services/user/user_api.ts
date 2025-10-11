import api from '../api';
import { Routes } from '@/constants/routes';

// The 'any' type is a placeholder and will be replaced by a Zod schema type later.
export const signUp = async (userData: any) => {
  const { data } = await api.post(Routes.API.AUTH.SIGN_UP, userData);
  return data;
};
