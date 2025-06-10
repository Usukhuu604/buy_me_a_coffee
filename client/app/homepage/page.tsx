import React from "react";
import { Button } from "@/components/ui";
import { SquareArrowUpRightIcon } from "lucide-react";
const HomePage = () => {
  return (
    <div className=" py-40 px-20">
      <div className="flex flex-col w-60 text-right">
        <Button>Home</Button>
        <Button>Explore</Button>
        <Button>
          View page <SquareArrowUpRightIcon />
        </Button>
        <Button>Account settings</Button>
      </div>
    </div>
  );
};

export default HomePage;
