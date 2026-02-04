import { api } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

export const register = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post<User>(
    '/auth/register',
    data,
    { withCredentials: true }
  );

  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post<User>(
    '/auth/login',
    data,
    { withCredentials: true }
  );

  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout', null, { withCredentials: true });
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const res = await api.get<User | null>(
      '/auth/session',
      { withCredentials: true }
    );

    return res.data ?? null;
  } catch {
    return null;
  }
};

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}): Promise<Note[]> => {
  const res = await api.get<Note[]>('/notes', {
    withCredentials: true,
    params: {
      perPage: 12,
      ...params,
    },
  });

  return res.data;
};
