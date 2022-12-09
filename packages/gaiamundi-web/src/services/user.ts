import { User, UserSignUpFields } from 'interfaces/user';
import { strapi } from './init';

export const register = async (newUser: UserSignUpFields) => {
  return await strapi.register(newUser);
};

export const updateAccount = async (id: number, userData: UserSignUpFields) => {
  return (await strapi.update('users', id, userData)) as User;
};

export const login = async (username: string, password: string) => {
  return await strapi.login(username, password);
};

export const getCurrentUser = async (token: string) => {
  return await strapi.currentUser(token);
};

export const forgotPassword = async (email: string) => {
  return await strapi.forgotPassword(email);
};

export const resetPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  return await strapi.resetPassword(code, password, passwordConfirmation);
};
