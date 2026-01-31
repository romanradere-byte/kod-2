"use client";

import Link from "next/link";
import { BookOpen, LogOut, PlusCircle, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminGuard from "@/components/auth/AdminGuard";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <BookOpen className="text-blue-600" />
          Library
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            Головна
          </Link>

          <AdminGuard>
            <Link
              href="/books/create"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <PlusCircle size={16} />
              Додати книгу
            </Link>
          </AdminGuard>

          <Link href="/profile" className="flex items-center gap-1 text-sm">
            <User size={16} />
            {user?.email}
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-1 text-sm text-red-500"
          >
            <LogOut size={16} />
            Вийти
          </button>
        </nav>
      </div>
    </header>
  );
}
