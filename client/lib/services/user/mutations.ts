import { useMutation } from '@tanstack/react-query';
import { signUp } from './user_api';

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
