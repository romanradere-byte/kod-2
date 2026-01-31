"use client";

import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children: ReactNode;
};

export default function AdminGuard({ children }: Props) {
  const { user } = useAuth();

  if (!user) return null;
  if (user.role !== "ADMIN") return null;

  return <>{children}</>;
}
