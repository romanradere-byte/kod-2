import { Book } from "@/types/book";
import BookCard from "./BookCard";

type Props = {
  books: Book[];
};

export default function BookGrid({ books }: Props) {
  if (books.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">Нічого не знайдено</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
