// "use client";

// import React from "react";
// import { WelcomingImage } from "../common/WelcomingImage";
// import { ClerkProvider, SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { SignIn } from "@clerk/nextjs";

// export const Register = () => {
//   return (
//     <div className="grid grid-cols-2 h-screen">
//       <WelcomingImage />

//       <div className="border">
//         <SignedOut>
//           <SignInButton />
//           <SignUpButton />
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>
//         <SignedIn>
//           <SignOutButton />
//         </SignedIn>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { WelcomingImage } from "../common/WelcomingImage";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  SignUp,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const Register = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <WelcomingImage />
      <SignedOut>
        <SignInButton
          mode="modal"
          appearance={{
            elements: {
              footer: { display: "none" },
            },
          }}
        >
          <Button className="absolute top-8 right-10 border border-gray-600 cursor-pointer hover:bg-amber-300">
            Login
          </Button>
        </SignInButton>
        <div className="flex items-center justify-center">
          <SignUp
            appearance={{
              elements: {
                footer: { display: "none" },
              },
            }}
            routing="hash"
          />
        </div>
      </SignedOut>
    </div>
  );
};
