import { ApiResponse } from './api';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserSignUpFields extends UserCredentials {
  username: string;
}

export interface User extends UserSignUpFields {
  id: number;
  provider: 'local';
  confirmed: boolean;
  blocked: boolean;
  created_at: string;
  updated_at: string;
  profileImage?: {
    url: string;
  };
}

export type UserAuthResponse = {
  jwt: string;
  user: User;
};

export type ApiUserAuthResponse = ApiResponse<UserAuthResponse>;
