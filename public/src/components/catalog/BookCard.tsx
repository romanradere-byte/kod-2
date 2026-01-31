import Link from "next/link";

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  cover: string;
  category: string;
  tags: string[];
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition block"
    >
      <img
        src={book.cover}
        alt={book.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-4 space-y-1">
        <div className="font-semibold">{book.title}</div>
        <div className="text-sm text-gray-600">{book.author}</div>
        <div className="text-xs text-gray-400">{book.year}</div>

        <div className="flex flex-wrap gap-1 mt-2">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 border rounded-full bg-gray-50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
