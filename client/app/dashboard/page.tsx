import React from "react";
import { SignedIn, UserButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div>
      <SignedIn>
        <div className="absolute right-0 w-50 flex justify-around border cursor-pointer hover:bg-red-500">
          <UserButton></UserButton>
          <SignOutButton>
            <Button>Sign Out</Button>
          </SignOutButton>
        </div>
      </SignedIn>
    </div>
  );
};

export default Dashboard;
