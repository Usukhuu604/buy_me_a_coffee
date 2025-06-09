"use server";

import { z } from "zod";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const schemaUserProfile = z.object({
  name: z.string().min(3, { message: "Please enter a valid name" }),
  about: z.string().min(10, { message: "Please tell us more about yourself" }),
  socialMediaURL: z.string().url({ message: "Please enter a valid URL" }),
  avatarImage: z.string().url({ message: "Please enter a valid image URL" }),
  backgroundImage: z.string().url({ message: "Please enter a valid image URL" }).optional(),
});

export const createProfile = async (_previous: unknown, formData: FormData) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return {
      message: "User not authenticated",
      ZodError: {},
    };
  }

  const validateFormData = schemaUserProfile.safeParse({
    name: formData.get("name"),
    about: formData.get("about"),
    socialMediaURL: formData.get("socialMediaURL"),
    avatarImage: formData.get("avatarImage"),
    backgroundImage: formData.get("backgroundImage"),
  });

  if (!validateFormData.success) {
    return {
      message: "Validation failed",
      ZodError: validateFormData.error.flatten().fieldErrors,
    };
  }

  try {
    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        name: validateFormData.data.name,
        about: validateFormData.data.about,
        socialMediaURL: validateFormData.data.socialMediaURL,
        avatarImage: validateFormData.data.avatarImage,
        backgroundImage: validateFormData.data.backgroundImage || "",
        successMessage: "Profile created successfully",
      },
    });

    const clerk = await clerkClient();
    await clerk.users.updateUser(user.id, {
      publicMetadata: {
        isProfileCompleted: true,
      },
    });

    redirect("/dashboard");
  } catch (error) {
    console.error("Error creating profile:", error);
    return {
      message: "Failed to create profile",
      ZodError: {},
    };
  }
};
