import React from "react";
import { Coffee } from "lucide-react";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// <ClerkProvider>
//           <header className="flex justify-end items-center p-4 gap-4 h-16">
//             <SignedOut>
//               <SignInButton />
//               <SignUpButton />
//             </SignedOut>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </header>
//     </ClerkProvider>

export const WelcomingImage = () => {
  return (
    <div className="bg-[#fbbf24] h-screen w-full flex flex-col px-20 py-8 ">
      <div className="flex font-bold">
        <Coffee /> Buy me coffee
      </div>

      <div className="flex flex-col w-[60%] self-center items-center relative top-[50%] transform -translate-y-1/2">
        <img src="illustration.png" alt="" />

        <p className="font-bold text-3xl mt-10">Fund your creative work</p>
        <p className="text-2xl mt-3 text-center ">Accept support. Start a membership. Setup a shop. It's easier than you think.</p>
      </div>
      {/*<ClerkProvider>
        <div className="text-blue-400">
          <SignedOut>
            <button className="text-blue bg-red-500 border p-3 rounded-r-2xl">
              <SignInButton />
            </button>

            <SignUpButton />
          </SignedOut>
        </div>
         <SignedIn>
          <UserButton />
        </SignedIn>
      </ClerkProvider> */}
    </div>
  );
};
