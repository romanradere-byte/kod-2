"use client";

import { createBook } from "@/services/books.service";

export default function CreateBookPage() {
  async function submit() {
    await createBook({
      title: "Тестова книга",
      description: "Працює 🔥",
      year: 2024,
      authorId: 1,
      tagIds: [],
      coverUrl: "https://placehold.co/300x450",
      type: "FILE", // ⬅ ВАЖЛИВО
      url: "https://example.com/book.pdf",
    });

    alert("Книга створена");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Book</h1>
      <button onClick={submit}>CREATE</button>
    </div>
  );
}
