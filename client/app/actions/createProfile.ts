"use server";

import { z } from "zod";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const schemaUserProfile = z.object({
  name: z.string().min(3, { message: "Please enter a valid name" }).max(100),
  about: z.string().min(10, { message: "Please tell us more about yourself" }).max(500),
  socialMediaURL: z.string().url({ message: "Please enter a valid URL" }).max(1000),
  avatarImage: z.string().url({ message: "Please enter a valid image URL" }).max(1000),
  backgroundImage: z
    .string()
    .url({ message: "Please enter a valid image URL" })
    .optional()
    .or(z.literal("").optional()),
});

type ActionResponse = {
  message: string;
  ZodError: Record<string, string[]>;
};

export const createProfile = async (_previous: unknown, formData: FormData): Promise<ActionResponse> => {
  const user = await currentUser();

  if (!user || !user.id) {
    return {
      message: "User not authenticated",
      ZodError: {},
    };
  }

  const parsedData = schemaUserProfile.safeParse({
    name: formData.get("name"),
    about: formData.get("about"),
    socialMediaURL: formData.get("socialMediaURL"),
    avatarImage: formData.get("avatarImage"),
    backgroundImage: formData.get("backgroundImage"),
  });

  if (!parsedData.success) {
    return {
      message: "Validation failed",
      ZodError: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    const { name, about, socialMediaURL, avatarImage, backgroundImage } = parsedData.data;

    await prisma.profile.create({
      data: {
        userId: user.id,
        name,
        about,
        socialMediaURL,
        avatarImage,
        backgroundImage: backgroundImage || "",
      },
    });

    // await clerkClient.users.updateUser(user.id, {
    //   publicMetadata: {
    //     isProfileCompleted: true,
    //   },
    // });

    redirect("/fill-your-info");
  } catch (error) {
    console.error("❌ Error creating profile:", error);
    return {
      message: "Failed to create profile",
      ZodError: {},
    };
  }
};
