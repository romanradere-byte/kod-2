"use client";

import { useEffect, useState } from "react";
import { getBookById } from "@/services/books.service";
import { Book } from "@/types/book";

type Props = {
  params: {
    id: string;
  };
};

export default function BookPage({ params }: Props) {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    getBookById(Number(params.id)).then(setBook);
  }, [params.id]);

  if (!book) return <div>Завантаження...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-600 mt-2">{book.description}</p>
      <p className="mt-4 text-sm text-gray-500">Рік: {book.year}</p>
    </div>
  );
}
