"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBooks } from "@/services/books.service";
import { Book } from "@/types/book";
import BookCard from "@/components/catalog/BookCard";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Бібліотека</h1>

      <div className="grid grid-cols-4 gap-4">
        {books.map(book => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <BookCard book={book} />
          </Link>
        ))}
      </div>
    </div>
  );
}
