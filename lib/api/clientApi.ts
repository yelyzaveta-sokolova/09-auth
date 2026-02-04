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
export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Create note failed');
  }

  return res.json();
};
 export const deleteNote = async (id: string): Promise<Note> => {
  const res = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Delete note failed');
  }

  return res.json();
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await fetch(`/api/notes/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch note');
  }

  return res.json();
};

export const getMe = async (): Promise<User> => {
  const res = await fetch('/api/users/me');

  if (!res.ok) {
    throw new Error('Unauthorized');
  }

  return res.json();
};

export const updateMe = async (data: {
  username: string;
}): Promise<User> => {
  const res = await fetch('/api/users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Update failed');
  }

  return res.json();
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
