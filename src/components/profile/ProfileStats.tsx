"use client";

import { useEffect, useState } from "react";
import { getFavorites } from "@/lib/favorites";

export default function ProfileStats() {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const fav = getFavorites();
    setFavoritesCount(fav.length);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <StatCard title="Книг в обраному" value={favoritesCount} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 text-center">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}
