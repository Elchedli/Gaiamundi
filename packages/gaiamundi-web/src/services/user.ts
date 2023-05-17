import { User, UserSignUpFields } from 'interfaces/user';
import { strapi } from './strapi';

export const updateCurrentUser = async (
  userId: number,
  data: Pick<User, 'username' | 'email' | 'password' | 'profileImage'>
) => {
  return await strapi.updateCurrentUser(userId, data);
};

export const uploadUserProfileImage = async (
  userId: number,
  file: File,
  ref: string,
  filename?: string,
  refId?: number,
  field?: string
) => {
  const uploadedFile = await strapi.uploadFile(
    file,
    ref,
    filename,
    refId,
    field
  );

  return uploadedFile.url;
};

export const sendForgotPasswordEmail = async (email: string) => {
  return await strapi.forgotPassword(email);
};

export const login = async (email: string, password: string) => {
  return await strapi.login(email, password);
};

export const resetPassword = async (
  code: string,
  password: string,
  password2: string
) => {
  return await strapi.resetPassword(code, password, password2);
};

export const signUp = async (newUser: UserSignUpFields) => {
  return await strapi.register(newUser);
};
