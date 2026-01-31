"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const { isAuth, user } = useAuth();

  if (!isAuth) return null;

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col gap-4">
      <div className="font-bold text-lg">📚 Library</div>

      <Link href="/books">Books</Link>
      <Link href="/favorites">Favorites</Link>
      <Link href="/profile">Profile</Link>

      {user?.role === "ADMIN" && (
        <Link href="/admin">Admin Panel</Link>
      )}
    </aside>
  );
}
