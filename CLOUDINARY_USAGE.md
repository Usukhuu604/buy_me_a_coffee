# Cloudinary Usage in Buy Me A Coffee App

This document explains how Cloudinary is integrated and used in this Buy Me A Coffee application for image upload functionality.

## Overview

The application uses Cloudinary for handling image uploads, specifically for user profile avatars. The integration is implemented using direct API calls to Cloudinary's upload endpoint without using the official Cloudinary SDK.

## Implementation Details

### 1. Main Hook: `useGetImage`

**Location**: `client/app/hooks/useGetImage.tsx`

This custom React hook handles all Cloudinary upload functionality and provides a complete image upload solution with:
- File selection (click to browse)
- Drag and drop support
- Upload progress indication
- Image preview
- Image deletion
- Error handling

### 2. Cloudinary Configuration

The Cloudinary setup uses the following hardcoded configuration:

```typescript
const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("upload_preset", "coffee-time");
  formData.append("file", file);
  formData.append("folder", "coffeeproject");

  const res = await fetch("https://api.cloudinary.com/v1_1/dd7qcdmww/image/upload", {
    method: "POST",
    body: formData,
  });
};
```

**Configuration Values**:
- **Cloud Name**: `dd7qcdmww`
- **Upload Preset**: `coffee-time`
- **Folder**: `coffeeproject`
- **API Endpoint**: `https://api.cloudinary.com/v1_1/dd7qcdmww/image/upload`

### 3. Upload Process

1. **User Action**: User either clicks to browse files or drags and drops an image
2. **File Validation**: File is captured from input or drop event
3. **FormData Creation**: File is packaged with upload preset and folder information
4. **API Call**: Direct POST request to Cloudinary's upload endpoint
5. **Response Handling**: Extract the image URL from the response
6. **State Update**: Update preview and notify parent component with the uploaded image URL

### 4. Usage in Components

**Primary Usage**: `client/app/fill-your-info/ProfileStep1.tsx`

The hook is used for profile avatar uploads during user onboarding:

```typescript
const { fileInputRef, previewLink, uploading, isDragging, openBrowse, handleFileSelect, handleDrop, deleteImage, setIsDragging } =
  useGetImage({
    onUpload: (url: string) => {
      setUploadedAvatarUrl(url);
    },
  });
```

The component provides:
- A circular upload area with drag/drop functionality
- Visual feedback during upload (loading state)
- Image preview with delete option
- Integration with form submission

## Features

### ✅ Current Features
- ✅ Direct file upload to Cloudinary
- ✅ Drag and drop support
- ✅ Click to browse file selection
- ✅ Upload progress indication
- ✅ Image preview functionality
- ✅ Image deletion capability
- ✅ Error handling with user feedback
- ✅ Automatic folder organization (`coffeeproject`)
- ✅ Upload preset usage for security

### 🔄 How It Works
1. **File Selection**: User selects image via click or drag/drop
2. **Upload**: File is uploaded directly to Cloudinary from the client
3. **URL Return**: Cloudinary returns a public URL for the uploaded image
4. **State Management**: The URL is stored in component state for form submission
5. **Preview**: Image is immediately displayed for user confirmation

## Security Considerations

### Current Setup
- Uses upload presets to control upload parameters
- No API keys exposed in client-side code
- Files are uploaded to a specific folder for organization

### Recommendations for Production

1. **Environment Variables**: Move configuration to environment variables:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dd7qcdmww
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=coffee-time
NEXT_PUBLIC_CLOUDINARY_FOLDER=coffeeproject
```

2. **Server-Side Upload**: Consider implementing server-side upload for better security:
   - Generate signed upload URLs on the server
   - Validate files server-side before upload
   - Implement rate limiting

3. **File Validation**: Add client-side file validation:
   - File size limits
   - File type restrictions
   - Image dimension validation

## Dependencies

**No External Dependencies**: The implementation uses only native browser APIs:
- `fetch()` for HTTP requests
- `FormData()` for file uploads
- React hooks for state management

This keeps the bundle size small and reduces dependency management complexity.

## Error Handling

The current implementation includes basic error handling:
- Console logging of upload failures
- User-friendly alert messages
- Proper loading state management
- Cleanup of upload state on errors

## File Structure

```
client/
├── app/
│   ├── hooks/
│   │   └── useGetImage.tsx          # Main Cloudinary upload hook
│   └── fill-your-info/
│       └── ProfileStep1.tsx         # Component using the upload hook
```

## Example Usage

To use the Cloudinary upload functionality in a new component:

```typescript
import { useGetImage } from "@/app/hooks/useGetImage";

const MyComponent = () => {
  const [imageUrl, setImageUrl] = useState("");
  
  const { 
    fileInputRef, 
    previewLink, 
    uploading, 
    openBrowse, 
    handleFileSelect, 
    handleDrop, 
    deleteImage 
  } = useGetImage({
    onUpload: (url: string) => {
      setImageUrl(url);
    },
  });

  return (
    <div>
      <input 
        ref={fileInputRef} 
        type="file" 
        hidden 
        onChange={handleFileSelect} 
      />
      <div onClick={openBrowse} onDrop={handleDrop}>
        {previewLink ? (
          <img src={previewLink} alt="Preview" />
        ) : (
          <div>Click to upload</div>
        )}
      </div>
    </div>
  );
};
```

## Cloudinary Dashboard Setup

To replicate this setup, ensure your Cloudinary account has:
1. **Upload Preset**: Named `coffee-time` with appropriate settings
2. **Folder Structure**: Allowing uploads to `coffeeproject` folder
3. **Permissions**: Unsigned uploads enabled for the preset

This implementation provides a clean, lightweight solution for image uploads while maintaining good user experience and basic security practices.