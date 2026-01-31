"use client";
import { useAuth } from "@/context/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // Якщо юзера немає — показуємо тільки сторінку входу (без хедеру і сайдбару)
  if (!user) {
    return <div className="min-h-screen">{children}</div>;
  }

  // Якщо юзер є — показуємо повний інтерфейс
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}