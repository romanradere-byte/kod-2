"use client";

import { useAuth } from "@/context/AuthContext";
import Header from "./Header";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !pathname.startsWith("/auth")) {
      router.replace("/auth/login");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return null; // або spinner
  }

  if (!user && !pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
