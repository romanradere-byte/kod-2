export type BookType = "FILE" | "LINK";

export type Book = {
  id: number;
  title: string;
  description: string;
  year: number;
  authorId: number;
  coverUrl: string;
  type: BookType;
  url: string;
  createdAt?: string;
  updatedAt?: string;
};
