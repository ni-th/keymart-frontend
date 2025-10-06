import axios from 'axios';
import type { Login, Register, User } from '../types/types';

export const login = async (login: Login) => {
  const response = await axios.post<Login>('/api/auth/login', login);
  return response;
}

export const register = async (register: Register) => {
  const response = await axios.post<User>('/api/auth/register', register);
  return response;
}

export const getCurrentUser = async () => {
  const response = await axios.get<User>('/api/auth/me');
  return response;
}
