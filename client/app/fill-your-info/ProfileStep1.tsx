"use client";

import { useActionState, useState } from "react";
import { Camera, X } from "lucide-react";
import { useGetImage } from "@/app/hooks/useGetImage";
import { Label, Input, Button, Textarea } from "@/components/ui";
import { createProfile } from "../actions/createProfile";
import { ZodErrors } from "./ZodError";

type ProfileStepProps = {
  nextStep: () => void;
};

const INITIAL_STATE = {
  data: null,
  message: "",
  ZodError: { avatarImage: [], name: [], about: [], socialMediaURL: [] },
};

export const NewProfile = ({ nextStep }: ProfileStepProps) => {
  const [formState, formAction] = useActionState(createProfile, INITIAL_STATE);
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState("");

  const {
    fileInputRef,
    previewLink,
    uploading,
    isDragging,
    openBrowse,
    handleFileSelect,
    handleDrop,
    deleteImage,
    setIsDragging,
  } = useGetImage({
    onUpload: (url: string) => {
      setUploadedAvatarUrl(url);
    },
  });

  const handleNext = nextStep;

  return (
    <div className="w-127 w-max-168 flex flex-col gap-6">
      <h3 className="font-semibold text-2xl">Complete your profile page</h3>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="avatarImage" value={uploadedAvatarUrl} />

        <div className="flex flex-col gap-3">
          <Label htmlFor="avatarImage" className="text-sm font-medium">
            Add photo
          </Label>

          <Input
            hidden
            id="avatarImage"
            name="avatarImage"
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />

          <div
            className={`rounded-full flex justify-center items-center w-40 h-40 border-2 border-dashed cursor-pointer ${
              isDragging ? "border-blue-500" : "border-dashed"
            }`}
            onClick={openBrowse}
            onDrop={handleDrop}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            aria-label="Upload profile image"
          >
            {previewLink ? (
              <div className="relative w-full h-full">
                <img src={previewLink} alt="Uploaded profile preview" className="rounded-full object-cover w-40 h-40" />
                <Button
                  className="absolute top-0 right-0 bg-accent text-black w-5 h-5 rounded-full"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteImage();
                    setUploadedAvatarUrl("");
                  }}
                  type="button"
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-700">{uploading ? "Uploading..." : <Camera size={24} />}</p>
            )}
          </div>

          <ZodErrors error={formState.ZodError.avatarImage} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" placeholder="Enter your name here" />
          <ZodErrors error={formState.ZodError.name} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="about">About</Label>
          <Textarea
            id="about"
            name="about"
            placeholder="Write about yourself here"
            className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <ZodErrors error={formState.ZodError.about} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="socialMediaURL">Social media URL</Label>
          <Input type="text" id="socialMediaURL" name="socialMediaURL" placeholder="https://" />
          <ZodErrors error={formState.ZodError.socialMediaURL} />
        </div>

        <Button type="submit" disabled={uploading} className="cursor-pointer hover:bg-gray-200" onClick={handleNext}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default NewProfile;
