export interface User {
  id: string;

  email: string;

  role: 'admin' | 'doctor' | 'patient';
}

export interface LoginResponse {
  accessToken: string;

  refreshToken: string;
}

