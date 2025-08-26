/**
 * Enhanced Cloudinary Configuration
 * 
 * This file shows recommended improvements for the current Cloudinary setup
 * to make it more secure and configurable.
 */

// Environment Variables (recommended to add to .env.local)
/*
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dd7qcdmww
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=coffee-time
NEXT_PUBLIC_CLOUDINARY_FOLDER=coffeeproject
CLOUDINARY_API_SECRET=your_api_secret_here
*/

// Enhanced configuration with environment variables
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dd7qcdmww',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'coffee-time',
  folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'coffeeproject',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
};

// File validation utilities
export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file size
  if (file.size > cloudinaryConfig.maxFileSize) {
    return {
      isValid: false,
      error: `File size must be less than ${cloudinaryConfig.maxFileSize / (1024 * 1024)}MB`
    };
  }

  // Check file type
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (!fileExtension || !cloudinaryConfig.allowedFormats.includes(fileExtension)) {
    return {
      isValid: false,
      error: `File type must be one of: ${cloudinaryConfig.allowedFormats.join(', ')}`
    };
  }

  return { isValid: true };
};

// Enhanced upload function with better error handling
export const uploadToCloudinaryEnhanced = async (file: File): Promise<{ url?: string; error?: string }> => {
  // Validate file before upload
  const validation = validateFile(file);
  if (!validation.isValid) {
    return { error: validation.error };
  }

  const formData = new FormData();
  formData.append("upload_preset", cloudinaryConfig.uploadPreset);
  formData.append("file", file);
  formData.append("folder", cloudinaryConfig.folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return { url: data.secure_url }; // Use secure_url for HTTPS
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return { 
      error: error instanceof Error ? error.message : 'Upload failed' 
    };
  }
};

// Example of how to implement server-side upload (recommended for production)
// This would go in an API route like /api/upload
export const serverSideUploadExample = `
// pages/api/upload.ts or app/api/upload/route.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // Convert file to buffer or base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'coffeeproject',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
    
    return Response.json({ url: result.secure_url });
  } catch (error) {
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}
`;

// Example usage with the enhanced hook
export const useGetImageEnhancedExample = `
import { useState, useRef } from "react";
import { uploadToCloudinaryEnhanced, validateFile } from "./cloudinary-config";

export const useGetImageEnhanced = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewLink, setPreviewLink] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);
    
    const validation = validateFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      setUploading(false);
      return;
    }

    const result = await uploadToCloudinaryEnhanced(file);
    
    if (result.error) {
      setError(result.error);
    } else if (result.url) {
      onUpload(result.url);
      setPreviewLink(result.url);
    }
    
    setUploading(false);
  };

  return {
    fileInputRef,
    previewLink,
    uploading,
    error,
    uploadFile,
    // ... other methods
  };
};
`;