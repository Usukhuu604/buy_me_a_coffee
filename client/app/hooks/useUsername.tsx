"use client";

import { useUser } from "@clerk/nextjs";

export function ClerkUsername() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  if (!user) return null;

  return <span className="mx-2  text-base font-medium">{user?.username}</span>;
}
