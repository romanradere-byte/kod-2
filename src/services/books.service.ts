import { api } from "./auth.service";

export type Book = {
  id: number;
  title: string;
  description: string;
  year: number;
  coverUrl: string;
  authorId: number;
  type: "FILE" | "LINK";
  url: string;
};

export type CreateBookDto = {
  title: string;
  description: string;
  year: number;
  authorId: number;
  tagIds: number[];
  coverUrl: string;
  type: "FILE" | "LINK";
  url: string;
};

export async function getBooks(): Promise<Book[]> {
  const res = await api.get("/resources");
  return res.data;
}

export async function getBookById(id: number): Promise<Book> {
  const res = await api.get(`/resources/${id}`);
  return res.data;
}

export async function createBook(payload: CreateBookDto): Promise<Book> {
  const res = await api.post("/resources", payload);
  return res.data;
}
