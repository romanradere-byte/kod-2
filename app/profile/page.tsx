"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/services/auth.service";

export default function ProfilePage() {
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) return null;

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white rounded-xl border p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
            {initials}
          </div>

          <div>
            <div className="font-semibold text-lg">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>

        <button
          onClick={() => {
            logoutUser();
            router.push("/auth/login");
          }}
          className="border rounded-lg px-4 py-2 hover:bg-gray-50 transition"
        >
          Вийти
        </button>
      </div>
    </div>
  );
}
