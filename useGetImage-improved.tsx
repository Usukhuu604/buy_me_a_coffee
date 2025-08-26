/**
 * Improved version of useGetImage hook using environment variables
 * This is a suggested improvement for better security and configuration management
 * 
 * To use this version:
 * 1. Copy this file to replace the current useGetImage.tsx
 * 2. Create .env.local with the required environment variables
 * 3. Update any imports if needed
 */

"use client";

import { useState, useRef } from "react";

// Environment variables for Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dd7qcdmww";
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "coffee-time";
const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "coffeeproject";

export const useGetImage = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewLink, setPreviewLink] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const openBrowse = () => fileInputRef.current?.click();

  const validateFile = (file: File): string | null => {
    // File type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return 'Please select a valid image file (JPEG, PNG, or WebP)';
    }

    // File size validation (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    return null;
  };

  const uploadToCloudinary = async (file: File) => {
    // Validate file before upload
    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("file", file);
    formData.append("folder", CLOUDINARY_FOLDER);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed with status: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Upload failed');
      }

      const imageUrl = data.secure_url || data.url; // Prefer secure URL

      onUpload(imageUrl);
      setPreviewLink(imageUrl);
    } catch (err) {
      console.error("Upload failed", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to upload image";
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) uploadToCloudinary(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) uploadToCloudinary(file);
  };

  const deleteImage = () => {
    setPreviewLink("");
    onUpload("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return {
    fileInputRef,
    previewLink,
    uploading,
    isDragging,
    openBrowse,
    handleFileSelect,
    handleDrop,
    deleteImage,
    setIsDragging,
  };
};

/**
 * Usage example:
 * 
 * const { fileInputRef, previewLink, uploading, isDragging, openBrowse, handleFileSelect, handleDrop, deleteImage, setIsDragging } =
 *   useGetImage({
 *     onUpload: (url: string) => {
 *       setUploadedAvatarUrl(url);
 *     },
 *   });
 */