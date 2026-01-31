import { Book } from "@/types/book";

const KEY = "favorite_books";

export function getFavorites(): Book[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function isFavorite(id: number): boolean {
  return getFavorites().some((b) => b.id === id);
}

export function toggleFavorite(book: Book) {
  const favorites = getFavorites();

  const exists = favorites.some((b) => b.id === book.id);

  let updated;
  if (exists) {
    updated = favorites.filter((b) => b.id !== book.id);
  } else {
    updated = [...favorites, book];
  }

  localStorage.setItem(KEY, JSON.stringify(updated));
}
