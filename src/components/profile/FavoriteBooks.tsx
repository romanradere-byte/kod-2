"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { getFavorites } from "@/lib/favorites";
import BookCard from "@/components/catalog/BookCard";

export default function FavoriteBooks() {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    const fav = getFavorites();
    setFavorites(fav);
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-6 text-center text-gray-500">
        У вас поки немає обраних книг
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Обрані книги</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
