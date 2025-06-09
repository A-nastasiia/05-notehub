
import axios from "axios";
import type { Note } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim() !== "") {
    params.search = search;
  }

  const response = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params,
  });
  return response.data;
};

export const createNote = async (data: {
  title: string;
  content?: string;
  tag: string;
}): Promise<Note> => {
  const response = await axiosInstance.post<Note>("/notes", data);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
};