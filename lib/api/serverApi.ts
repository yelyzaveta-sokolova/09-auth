import { cookies } from 'next/headers';
import axios from 'axios';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

const baseURL = 'https://notehub-api.goit.study/api';

const serverApi = axios.create({
  baseURL,
});

const getCookieHeader = (): { Cookie: string } => {
  const cookieStore = cookies(); 

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  return {
    Cookie: cookieHeader,
  };
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const res = await serverApi.get<User | null>('/auth/session', {
      headers: getCookieHeader(),
    });

    return res.data ?? null;
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const res = await serverApi.get<User>('/users/me', {
    headers: getCookieHeader(),
  });

  return res.data;
};

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}): Promise<Note[]> => {
  const res = await serverApi.get<Note[]>('/notes', {
    headers: getCookieHeader(),
    params: {
      perPage: 12,
      ...params,
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await serverApi.get<Note>(`/notes/${id}`, {
    headers: getCookieHeader(),
  });

  return res.data;
};
