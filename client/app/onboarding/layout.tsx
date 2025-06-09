import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type SessionMetadata = {
  onboardingComplete?: boolean;
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { sessionClaims } = await auth();
  if ((sessionClaims?.metadata as SessionMetadata)?.onboardingComplete === true) {
    redirect("/");
  }

  return <>{children}</>;
}
