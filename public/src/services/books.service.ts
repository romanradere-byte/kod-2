import axios from "axios";
import { Book } from "@/types/book";

const api = axios.create({
  baseURL: "http://localhost:3000", // ⚠️ зміни якщо бекенд на іншому порту
  withCredentials: true,
});

/* Отримати каталог */
export async function getBooks(params?: {
  search?: string;
  category?: string;
}) {
  const { data } = await api.post("/books/catalog", params ?? {});
  
  // Handle different response shapes: array directly, or object with books/data/items/results
  if (Array.isArray(data)) {
    return data as Book[];
  }
  
  // Try common response property names
  if (data?.books && Array.isArray(data.books)) {
    return data.books as Book[];
  }
  if (data?.data && Array.isArray(data.data)) {
    return data.data as Book[];
  }
  if (data?.items && Array.isArray(data.items)) {
    return data.items as Book[];
  }
  if (data?.results && Array.isArray(data.results)) {
    return data.results as Book[];
  }
  
  // Fallback: return empty array if structure is unexpected
  console.warn("Unexpected books API response shape:", data);
  return [] as Book[];
}

/* Отримати книгу за ID */
export async function getBookById(id: number) {
  const { data } = await api.get<Book>(`/books/${id}`);
  return data;
}

/* Створити книгу */
export async function createBook(payload: Partial<Book>) {
  const { data } = await api.post("/admin/books", payload);
  return data;
}

/* Видалити книгу */
export async function deleteBook(id: number) {
  const { data } = await api.delete(`/admin/books/${id}`);
  return data;
}

/* Додати до обраного */
export async function addToFavorites(bookId: number) {
  const { data } = await api.post(`/favorites/${bookId}`);
  return data;
}

/* Видалити з обраного */
export async function removeFromFavorites(bookId: number) {
  const { data } = await api.delete(`/favorites/${bookId}`);
  return data;
}

/* Отримати список обраних книг */
export async function getFavoriteBooks() {
  const { data } = await api.get("/favorites");
  
  // Handle different response shapes: array directly, or object with books/data/items/results
  if (Array.isArray(data)) {
    return data as Book[];
  }
  
  // Try common response property names
  if (data?.books && Array.isArray(data.books)) {
    return data.books as Book[];
  }
  if (data?.data && Array.isArray(data.data)) {
    return data.data as Book[];
  }
  if (data?.items && Array.isArray(data.items)) {
    return data.items as Book[];
  }
  if (data?.results && Array.isArray(data.results)) {
    return data.results as Book[];
  }
  
  // Fallback: return empty array if structure is unexpected
  console.warn("Unexpected favorites API response shape:", data);
  return [] as Book[];
}