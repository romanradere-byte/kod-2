"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BOOKS } from "@/data/books";
import { isFavorite, toggleFavorite } from "@/lib/favorites";
import { getReaction, toggleReaction, getStats } from "@/lib/reactions";
import { ArrowLeft, Bookmark, ThumbsUp, ThumbsDown } from "lucide-react";

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const bookId = Number(id);

  const book = BOOKS.find((b) => b.id === bookId);

  const [fav, setFav] = useState(false);
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);
  const [stats, setStats] = useState({ like: 0, dislike: 0, rating: 0 });

  useEffect(() => {
    if (!book) return;
    setFav(isFavorite(book.id));
    setReaction(getReaction(book.id));
    setStats(getStats(book.id));
  }, [book]);

  if (!book) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Книгу не знайдено</h2>
        <button onClick={() => router.back()} className="text-blue-600 underline mt-2">
          Назад
        </button>
      </div>
    );
  }

  function onReact(type: "like" | "dislike") {
    toggleReaction(bookId, type);
    setReaction(getReaction(bookId));
    setStats(getStats(bookId));
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* КНОПКА НАЗАД */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition"
      >
        <ArrowLeft size={20} /> Назад до каталогу
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ЛІВА КОЛОНКА: ОБКЛАДИНКА ТА ЛАЙКИ */}
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden rounded-xl border shadow-sm">
            <img
              src={book.cover}
              className="w-full h-full object-cover"
              alt={book.title}
            />
          </div>

          {/* ЛАЙКИ / ДИЗЛАЙКИ */}
          <div className="flex justify-center gap-2 p-1 bg-gray-50 rounded-xl border">
            <button
              onClick={() => onReact("like")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition ${
                reaction === "like" ? "bg-white shadow-sm text-green-600" : "text-gray-500 hover:bg-white/50"
              }`}
            >
              <ThumbsUp size={18} fill={reaction === "like" ? "currentColor" : "none"} />
              <span className="font-medium">{stats.like}</span>
            </button>

            <div className="w-px h-8 bg-gray-200 self-center" />

            <button
              onClick={() => onReact("dislike")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition ${
                reaction === "dislike" ? "bg-white shadow-sm text-red-600" : "text-gray-500 hover:bg-white/50"
              }`}
            >
              <ThumbsDown size={18} fill={reaction === "dislike" ? "currentColor" : "none"} />
              <span className="font-medium">{stats.dislike}</span>
            </button>
          </div>
        </div>

        {/* ПРАВА КОЛОНКА: ІНФОРМАЦІЯ */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{book.title}</h1>
              <p className="text-xl text-gray-500 mt-2">{book.author}, {book.year}</p>
            </div>

            {/* ЗАКЛАДКА ЗАМІСТЬ СЕРЦЯ */}
            <button
              onClick={() => {
                toggleFavorite(book);
                setFav(!fav);
              }}
              className={`p-3 rounded-xl border transition-all ${
                fav ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-white text-gray-400 hover:border-gray-400"
              }`}
              title="Додати в закладки"
            >
              <Bookmark size={24} fill={fav ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="space-y-2">
             <div className="text-sm font-bold uppercase tracking-wider text-gray-400">Опис книги</div>
             <p className="text-gray-700 leading-relaxed text-lg">{book.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {book.tags.map((t) => (
              <span
                key={t}
                className="px-4 py-1.5 text-sm font-medium border rounded-full bg-white text-gray-600 shadow-sm"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}