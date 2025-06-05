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

"use client";

import React from "react";
import { WelcomingImage } from "../common/WelcomingImage";
import { SignUp } from "@clerk/nextjs";

export const Register = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <WelcomingImage />
      <div className="flex items-center justify-center">
        <SignUp
          appearance={{
            elements: {
              "cl-internal-1dauvpw": { display: "none" },
            },
          }}
        />
      </div>
    </div>
  );
};
