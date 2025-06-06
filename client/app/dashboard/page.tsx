// import React from "react";
// import { SignedIn, UserButton, SignOutButton } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

// const Dashboard = () => {
//   return <div></div>;
// };

// export default Dashboard;

"use client";

import { useState } from "react";
import ProfileStepOne from "./ProfileStep1";
import ProfileStepTwo from "./ProfileStep2";
import { motion, AnimatePresence } from "framer-motion";

const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
    return;
  };

  const previousStep = () => {
    if (currentStep > -1) {
      setCurrentStep((prev) => prev - 1);
    }
    return;
  };

  const StepsComponents = [ProfileStepOne, ProfileStepTwo][currentStep];

  return (
    <div className="flex justify-center items-center mt-30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <StepsComponents currentStep={currentStep} nextStep={nextStep} previousStep={previousStep} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
