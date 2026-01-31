"use client";

import Link from "next/link";
import { LayoutGrid, User, Book } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const baseLink =
  "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition";

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
  <aside className="w-64 border-r bg-white p-4 flex flex-col gap-4">

      <div className="text-sm font-semibold text-gray-500">Навігація</div>

      <Link href="/" className={baseLink}>
        <LayoutGrid size={18} />
        Каталог
      </Link>

      <Link href="/profile" className={baseLink}>
        <User size={18} />
        Профіль
      </Link>

      {user.role === "ADMIN" && (
        <Link href="/admin" className={baseLink}>
          <Book size={18} />
          Адмінка
        </Link>
      )}
    </aside>
  );
}
