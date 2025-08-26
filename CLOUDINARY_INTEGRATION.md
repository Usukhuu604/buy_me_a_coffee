# Cloudinary Integration Guide

This document explains how Cloudinary is integrated and used in the Buy Me a Coffee project for image upload functionality.

## Overview

The project uses Cloudinary's Upload API directly (without SDK) to handle image uploads for user profile pictures. The implementation is contained in a custom React hook that provides drag-and-drop functionality and image preview.

## Current Implementation

### 1. Core Hook: `useGetImage`

**Location**: `client/app/hooks/useGetImage.tsx`

This custom React hook handles all Cloudinary upload functionality:

```typescript
export const useGetImage = ({ onUpload }: { onUpload: (url: string) => void }) => {
  // File upload logic with drag-and-drop support
  // Direct API call to Cloudinary
  // Image preview and deletion functionality
}
```

### 2. Cloudinary Configuration

The current setup uses hardcoded values:

- **Cloud Name**: `dd7qcdmww`
- **Upload Preset**: `coffee-time`
- **Folder**: `coffeeproject` 
- **API Endpoint**: `https://api.cloudinary.com/v1_1/dd7qcdmww/image/upload`

### 3. Upload Process

```typescript
const uploadToCloudinary = async (file: File) => {
  setUploading(true);
  const formData = new FormData();
  formData.append("upload_preset", "coffee-time");
  formData.append("file", file);
  formData.append("folder", "coffeeproject");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dd7qcdmww/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    const imageUrl = data.url;
    
    onUpload(imageUrl);
    setPreviewLink(imageUrl);
  } catch (err) {
    console.error("Upload failed", err);
    alert("Failed to upload image");
  } finally {
    setUploading(false);
  }
};
```

## Current Usage

### Profile Image Upload

**Location**: `client/app/fill-your-info/ProfileStep1.tsx`

The hook is used for profile image uploads during user onboarding:

```typescript
const { fileInputRef, previewLink, uploading, isDragging, openBrowse, handleFileSelect, handleDrop, deleteImage, setIsDragging } =
  useGetImage({
    onUpload: (url: string) => {
      setUploadedAvatarUrl(url);
    },
  });
```

### Features Provided

1. **File Selection**: Click to browse files
2. **Drag & Drop**: Drag files onto the upload area
3. **Upload Progress**: Loading state during upload
4. **Image Preview**: Shows uploaded image immediately
5. **Delete Functionality**: Remove uploaded image
6. **Error Handling**: User feedback on upload failures

## Cloudinary Setup Requirements

To replicate this setup, you would need:

### 1. Cloudinary Account Setup
1. Create a free Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Note your Cloud Name from the dashboard
3. Create an upload preset for unsigned uploads

### 2. Upload Preset Configuration
In your Cloudinary dashboard:
1. Go to Settings → Upload
2. Create a new Upload Preset
3. Set it to "Unsigned" (allows direct uploads from frontend)
4. Configure folder destination
5. Set upload restrictions (file types, size limits)
6. Note the preset name

### 3. Environment Configuration (Recommended)
Instead of hardcoding values, use environment variables:

```typescript
// Recommended approach
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("file", file);
  formData.append("folder", CLOUDINARY_FOLDER);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });
  
  // ... rest of logic
};
```

## Security Considerations

### Current Limitations
1. **Hardcoded Credentials**: Cloud name and preset are exposed in client code
2. **No Upload Restrictions**: Anyone can upload to your Cloudinary account
3. **No File Validation**: Limited client-side file type checking

### Recommended Improvements
1. **Environment Variables**: Move configuration to environment variables
2. **Upload Preset Restrictions**: Configure allowed file types, sizes, and transformations
3. **Backend Proxy**: Consider proxying uploads through your backend for better control
4. **Signed Uploads**: Use signed uploads for sensitive applications

## File Structure

```
client/
├── app/
│   ├── hooks/
│   │   └── useGetImage.tsx          # Main Cloudinary integration
│   └── fill-your-info/
│       └── ProfileStep1.tsx         # Usage example
└── ...
```

## Dependencies

The implementation uses only built-in browser APIs:
- `fetch()` for HTTP requests
- `FormData()` for file uploads
- React hooks for state management

No additional Cloudinary SDK is required for this basic implementation.

## Testing the Integration

1. Navigate to the profile setup page
2. Click the image upload area or drag an image file
3. Verify the image uploads to Cloudinary
4. Check the returned URL format: `https://res.cloudinary.com/dd7qcdmww/image/upload/...`

## Potential Enhancements

1. **Image Transformations**: Add automatic resizing and optimization
2. **Progress Tracking**: Implement upload progress bars
3. **Multiple Files**: Support multiple image uploads
4. **Validation**: Add client and server-side file validation
5. **Error Recovery**: Implement retry mechanisms for failed uploads
6. **Image Editing**: Add basic crop/rotate functionality before upload

This implementation provides a solid foundation for image uploads while keeping the code simple and maintainable.