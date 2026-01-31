"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Введіть email і пароль");
      return;
    }

    try {
      setLoading(true);
      await loginUser({ email, password });
      router.push("/profile");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Помилка входу"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow space-y-5"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            Бібліотека Коледжу
          </div>
          <div className="text-gray-500 mt-1">Вхід до системи</div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          className="w-full border rounded-lg px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Вхід..." : "Увійти"}
        </button>

        <div className="text-center text-sm text-gray-500">
          Немає акаунту?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Зареєструватися
          </Link>
        </div>
      </form>
    </div>
  );
}