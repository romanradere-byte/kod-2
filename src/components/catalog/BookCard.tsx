import { Book } from "@/types/book";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="border rounded p-3 hover:shadow">
      {book.coverUrl && (
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-40 w-full object-cover mb-2"
        />
      )}

      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-500">{book.year}</p>
    </div>
  );
}
