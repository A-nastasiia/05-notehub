import axios, { type AxiosResponse } from 'axios';
import type { Note } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api/notes';
const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const fetchNotes = async (search: string, page: number ): Promise<{ data: Note[]; totalPages: number }> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    perPage: '12',
  });

  if (search.trim()) {
    queryParams.append('search', search.trim());
  }

  const response: AxiosResponse<{ data: Note[]; totalPages: number }> = await api.get(`?${queryParams}`);
  return response.data;
};

export const createNote = async ({ title, content, tag, }: {
  title: string;
  content?: string;
  tag: string;
}): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post('', { title, content, tag, });
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/${id}`);
  return response.data;
};