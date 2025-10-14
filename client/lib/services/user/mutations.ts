import { useMutation } from '@tanstack/react-query';
import { signUp, logout, login } from './user_api';

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
