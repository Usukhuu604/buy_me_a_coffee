"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CompleteProfile = () => {
  const { session } = useSession();
  const router = useRouter();

  const handleCompleteProfile = async () => {
    await fetch("/api/complete-profile", { method: "POST" });
    await session?.reload();
    router.push("/dashboard");
  };

  return <Button onClick={handleCompleteProfile}>Done</Button>;
};

export default CompleteProfile;
