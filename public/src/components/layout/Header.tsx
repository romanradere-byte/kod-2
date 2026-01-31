"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LayoutGrid, User, Book } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();

  const navLinkStyle = "flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition";

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-bold text-lg flex items-center gap-2">
           <span className="hidden sm:inline">College library</span>
        </Link>

        {/* Навігаційні кнопки (показуємо тільки авторизованим) */}
        {user && (
          <nav className="flex items-center gap-6">
            <Link href="/" className={navLinkStyle}>
              <LayoutGrid size={18} />
              <span className="hidden md:inline">Каталог</span>
            </Link>

            <Link href="/profile" className={navLinkStyle}>
              <User size={18} />
              <span className="hidden md:inline">Профіль</span>
            </Link>

            {user.role === "ADMIN" && (
              <Link href="/admin" className={navLinkStyle + " text-amber-600 hover:text-amber-700"}>
                <Book size={18} />
                <span className="hidden md:inline">Адмінка</span>
              </Link>
            )}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:underline">
              Увійти
            </Link>
            <Link 
              href="/auth/register" 
              className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
            >
              Реєстрація
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4 border-l pl-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-gray-900">{user.name}</span>
              <span className="text-[10px] uppercase text-gray-500">{user.role}</span>
            </div>
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:bg-red-50 px-2 py-1 rounded transition"
            >
              Вийти
            </button>
          </div>
        )}
      </div>
    </header>
  );
}