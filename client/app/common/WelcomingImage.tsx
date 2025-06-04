import React from "react";
import { Coffee } from "lucide-react";

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
    </div>
  );
};
