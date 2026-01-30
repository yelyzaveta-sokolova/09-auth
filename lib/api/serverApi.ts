import { cookies } from 'next/headers';
import axios from 'axios';
import { User } from '@/types/user';
import { Note } from '@/types/note';


const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

const serverApi = axios.create({
  baseURL,
});

const getCookieHeader = () => ({
  Cookie: cookies().toString(),
});

export const checkSession = async () => {
  const res = await serverApi.get<User | null>('/auth/session', {
    headers: getCookieHeader(),
  });
  return res.data;
};

export const getMe = async () => {
  const res = await serverApi.get<User>('/users/me', {
    headers: getCookieHeader(),
  });
  return res.data;
};

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}) => {
  const res = await serverApi.get<Note[]>('/notes', {
    headers: getCookieHeader(),
    params: {
      ...params,
      perPage: 12,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await serverApi.get<Note>(`/notes/${id}`, {
    headers: getCookieHeader(),
  });
  return res.data;
};
