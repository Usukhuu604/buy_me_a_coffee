// "use server";

// import { auth, clerkClient } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export const completeOnboarding = async (formData: FormData) => {
//   const { userId } = await auth();

//   if (!userId) return { message: "No Logged In User" };

//   const client = await clerkClient();

//   try {
//     const res = await client.users.updateUser(userId, {
//       publicMetadata: {
//         onboardingComplete: true,
//         applicationName: formData.get("applicationName"),
//         applicationType: formData.get("applicationType"),
//       },
//     });
//     return { message: res.publicMetadata };
//   } catch (err) {
//     return { error: "There was an error updating the user metadata." };
//   }
// };

//   const applicationName = formData.get('applicationName') as string;
//   const applicationType = formData.get('applicationType') as string;

//   try {
//     // Update Clerk metadata
//     await clerkClient.users.updateUser(userId, {
//       publicMetadata: {
//         onboardingComplete: true,
//         applicationName,
//         applicationType,
//       },
//     });

//     // Save in Neon (PostgreSQL)
//     await prisma.onboardingData.create({
//       data: {
//         userId,
//         applicationName,
//         applicationType,
//       },
//     });

//     return { message: 'Onboarding complete' };
//   } catch (error) {
//     return { error: 'Failed to complete onboarding' };
//   }
