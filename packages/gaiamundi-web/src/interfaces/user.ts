import { ApiResponse } from './api';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserSignUpFields extends UserCredentials {
  username: string;
}
export interface UserSignUpFormFields extends UserSignUpFields {
  password2: string;
}

export interface User extends UserSignUpFields {
  id: number;
  provider: 'local';
  confirmed: boolean;
  blocked: boolean;
  created_at: string;
  updated_at: string;
}

export type UserAuthResponse = {
  jwt: string;
  user: User;
};

export type ApiUserAuthResponse = ApiResponse<UserAuthResponse>;
