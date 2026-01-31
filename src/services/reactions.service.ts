const KEY = "book_reactions";

type Reactions = Record<number, { like: number; dislike: number }>;

function load(): Reactions {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : {};
}

export function getReactions(bookId: number) {
  const data = load();
  return data[bookId] || { like: 0, dislike: 0 };
}

export function like(bookId: number) {
  const data = load();
  if (!data[bookId]) data[bookId] = { like: 0, dislike: 0 };
  data[bookId].like++;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function dislike(bookId: number) {
  const data = load();
  if (!data[bookId]) data[bookId] = { like: 0, dislike: 0 };
  data[bookId].dislike++;
  localStorage.setItem(KEY, JSON.stringify(data));
}
