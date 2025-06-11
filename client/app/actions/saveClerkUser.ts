"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const saveClerkUser = async () => {
  const user = await currentUser();
  if (!user) return;

  const email = user.emailAddresses[0].emailAddress;
  const username = user.username ?? email.split("@")[0];

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;

  // Create user first
  const created = await prisma.user.create({
    data: {
      email,
      username,
      password: "",
      bankCard: "",
    },
  });

  const profile = await prisma.profile.create({
    data: {
      name: user.firstName ?? username,
      about: "",
      avatarImage: user.imageUrl ?? "",
      socialMediaURL: "",
      backgroundImage: "",
      successMessage: "",
      userId: created.id,
    },
  });

  return created;
};
