import { api } from '@/lib/axios';

import {
  LoginResponse,
  User,
} from '@/types/auth.types';

export async function loginRequest(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await api.post(
    '/auth/login',
    {
      email,
      password,
    },
  );

  return response.data;
}

export async function profileRequest(
  accessToken: string,
): Promise<User> {
  const response = await api.get(
    '/auth/profile',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
}