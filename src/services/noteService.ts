import axios, { type AxiosResponse } from 'axios';
import type { Note, NotesResponse, CreateNoteRequest } from '../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api/notes';
const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<NotesResponse> => {
  const { page = 1, perPage = 12, search } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (search && search.trim()) {
    queryParams.append('search', search.trim());
  }

  const response: AxiosResponse<NotesResponse> = await api.get(`?${queryParams}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteRequest): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post('', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/${id}`);
  return response.data;
};