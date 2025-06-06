import React from "react";
import { Button } from "@/components/ui/button";
import { WelcomingImage } from "../common/WelcomingImage";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, SignUp, SignUpButton, UserButton } from "@clerk/nextjs";

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
          <Button className="absolute top-10 right-20 text-[16px] font-normal px-6 cursor-pointer hover:bg-amber-300 bg-[#F4F4F5] shadow">
            Login
          </Button>
        </SignInButton>
        <div className="flex items-center justify-center">
          <SignUp
            appearance={{
              elements: {
                footer: { display: "none" },
                cardBox: { boxShadow: "none", width: "500px" },
              },
            }}
            routing="hash"
          />
        </div>
      </SignedOut>
    </div>
  );
};
