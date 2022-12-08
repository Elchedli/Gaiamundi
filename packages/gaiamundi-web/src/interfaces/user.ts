import { ApiResponse } from './api';

export interface UserCredentials {
  username: string;
  email: string;
}

export interface UserSignUpFields extends UserCredentials {
  password: string;
}

export interface User extends UserCredentials {
  id: number;
  provider: 'local';
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserAuthResponse = {
  jwt: string;
  user: User;
};

export type ApiUserAuthResponse = ApiResponse<UserAuthResponse>;
