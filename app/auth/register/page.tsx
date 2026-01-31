"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password) {
      setError("Заповніть всі поля");
      return;
    }

    try {
      await register({ firstName, lastName, email, password });
    } catch (err: any) {
      setError(err?.response?.data?.message?.[0] || "Помилка реєстрації");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow space-y-5">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">Бібліотека Коледжу</div>
          <div className="text-gray-500 mt-1">Реєстрація</div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <input placeholder="Ім'я" className="w-full border rounded-lg px-4 py-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input placeholder="Прізвище" className="w-full border rounded-lg px-4 py-2" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input placeholder="Email" type="email" className="w-full border rounded-lg px-4 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Пароль" type="password" className="w-full border rounded-lg px-4 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition">
          Зареєструватися
        </button>

        <div className="text-center text-sm text-gray-500">
          Вже маєш акаунт?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Увійти
          </Link>
        </div>
      </form>
    </div>
  );
}
