"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  //  Захист
  if (!user) {
    router.push("/auth/login");
    return null;
  }

  if (user.role !== "ADMIN") {
    return (
      <div className="p-6 text-red-600 font-semibold">
         У вас немає доступу до адмін-панелі
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Адмін-панель</h1>

      <div className="p-4 border rounded-xl bg-white">
        <p className="text-gray-600">
          Тут буде:
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          <li>Додавання книг</li>
          <li>Редагування книг</li>
          <li>Видалення книг</li>
          <li>Керування тегами</li>
        </ul>
      </div>

      <div className="p-4 border-dashed border-2 rounded-xl text-gray-400">
         Сторінка в розробці
      </div>
    </div>
  );
}
