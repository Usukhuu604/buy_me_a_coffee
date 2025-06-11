"use client";

import { useEffect } from "react";
import { saveClerkUser } from "./saveClerkUser";

export default function UserDataSync() {
  useEffect(() => {
    const syncUserData = async () => {
      try {
        await saveClerkUser();
      } catch (error) {
        console.error("Error syncing user data:", error);
      }
    };
    syncUserData();
  }, []);

  return null; // This component doesn't render anything
}
