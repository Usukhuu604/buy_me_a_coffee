# Cloudinary Setup Steps - Buy Me a Coffee Project

This document provides the exact steps that were likely followed to set up Cloudinary in this project.

## 1. Cloudinary Account Configuration

### Create Upload Preset
1. Log in to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Navigate to **Settings** → **Upload**
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Configure the preset:
   - **Preset name**: `coffee-time`
   - **Signing mode**: `Unsigned` (allows direct uploads from frontend)
   - **Folder**: `coffeeproject`
   - **Use filename as public_id**: Optional
   - **Unique filename**: Recommended (checked)

### Upload Restrictions (Recommended)
- **Allowed formats**: jpg, jpeg, png, webp
- **Max file size**: 10 MB
- **Max image width**: 2000px
- **Max image height**: 2000px

### Transformations (Optional)
Add automatic transformations:
- **Width**: 800px (max)
- **Height**: 800px (max) 
- **Crop**: `limit` (scales down only if larger)
- **Quality**: `auto`
- **Format**: `auto` (automatically chooses best format)

## 2. Implementation Details

### Custom Hook Implementation (`useGetImage.tsx`)

```typescript
"use client";

import { useState, useRef } from "react";

export const useGetImage = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewLink, setPreviewLink] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const openBrowse = () => fileInputRef.current?.click();

  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    
    // These values match the Cloudinary preset configuration
    formData.append("upload_preset", "coffee-time");
    formData.append("file", file);
    formData.append("folder", "coffeeproject");

    try {
      // Direct API call to Cloudinary
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
```

### Usage in Profile Component

```typescript
// In ProfileStep1.tsx
import { useGetImage } from "@/app/hooks/useGetImage";

const { fileInputRef, previewLink, uploading, isDragging, openBrowse, handleFileSelect, handleDrop, deleteImage, setIsDragging } =
  useGetImage({
    onUpload: (url: string) => {
      setUploadedAvatarUrl(url); // Store the Cloudinary URL
    },
  });
```

## 3. Key Configuration Values

| Parameter | Value | Purpose |
|-----------|-------|---------|
| Cloud Name | `dd7qcdmww` | Identifies your Cloudinary account |
| Upload Preset | `coffee-time` | Configuration for unsigned uploads |
| Folder | `coffeeproject` | Organizes uploaded images |
| API Endpoint | `https://api.cloudinary.com/v1_1/dd7qcdmww/image/upload` | Direct upload URL |

## 4. Cloudinary Response Format

When an image is successfully uploaded, Cloudinary returns a JSON response:

```json
{
  "public_id": "coffeeproject/sample_image_abc123",
  "version": 1642684800,
  "signature": "...",
  "width": 800,
  "height": 600,
  "format": "jpg",
  "resource_type": "image",
  "created_at": "2022-01-20T10:00:00Z",
  "bytes": 85432,
  "url": "https://res.cloudinary.com/dd7qcdmww/image/upload/v1642684800/coffeeproject/sample_image_abc123.jpg",
  "secure_url": "https://res.cloudinary.com/dd7qcdmww/image/upload/v1642684800/coffeeproject/sample_image_abc123.jpg"
}
```

The `url` field is extracted and used in the application.

## 5. Frontend Integration Steps

### HTML Structure
```tsx
<div
  className="rounded-full flex justify-center items-center w-40 h-40 border-2 border-dashed cursor-pointer"
  onClick={openBrowse}
  onDrop={handleDrop}
  onDragOver={(event) => {
    event.preventDefault();
    setIsDragging(true);
  }}
  onDragLeave={() => setIsDragging(false)}
>
  {previewLink ? (
    <img src={previewLink} alt="Uploaded profile preview" className="rounded-full object-cover w-40 h-40" />
  ) : (
    <p>{uploading ? "Uploading..." : "Click or drag to upload"}</p>
  )}
</div>

<input 
  hidden 
  type="file" 
  ref={fileInputRef} 
  onChange={handleFileSelect}
  accept="image/*"
/>
```

## 6. Security and Best Practices

### Current Security Settings
- **Unsigned uploads**: Enabled for frontend convenience
- **Folder restriction**: Images are uploaded to `coffeeproject` folder
- **Public access**: All uploaded images are publicly accessible

### Recommended Security Improvements

1. **Environment Variables**:
```bash
# .env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dd7qcdmww
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=coffee-time
NEXT_PUBLIC_CLOUDINARY_FOLDER=coffeeproject
```

2. **Upload Preset Security**:
   - Enable **Resource limits** to prevent abuse
   - Set **Allowed formats** to image types only
   - Configure **Max file size** (e.g., 5MB)
   - Enable **Moderation** for content filtering

3. **Backend Integration** (Future Enhancement):
```typescript
// API route example: /api/upload
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  // Validate file on server
  if (!file.type.startsWith('image/')) {
    return Response.json({ error: 'Invalid file type' }, { status: 400 });
  }
  
  // Upload to Cloudinary with server-side validation
  // Return secure URL
}
```

## 7. Troubleshooting

### Common Issues
1. **Upload fails**: Check upload preset name and cloud name
2. **CORS errors**: Ensure unsigned uploads are enabled
3. **Large files**: Check file size limits in upload preset
4. **Wrong file types**: Verify allowed formats in preset configuration

### Debug Steps
1. Check browser network tab for API responses
2. Verify Cloudinary dashboard for uploaded files
3. Test with different file types and sizes
4. Check console for JavaScript errors

## 8. File Organization in Cloudinary

All uploaded images are stored in:
```
cloudinary.com/dd7qcdmww/
└── coffeeproject/
    ├── user_avatar_123.jpg
    ├── user_avatar_456.png
    └── ...
```

This organization helps with:
- Asset management
- Backup and migration
- Analytics and usage tracking
- Bulk operations

## 9. Performance Considerations

### Automatic Optimizations
Cloudinary automatically provides:
- **WebP/AVIF** format conversion for supported browsers
- **Quality optimization** based on content
- **Progressive JPEG** for faster loading
- **CDN delivery** for global performance

### Manual Optimizations
You can enhance URLs for better performance:
```typescript
// Transform URL for thumbnail
const thumbnailUrl = imageUrl.replace('/upload/', '/upload/w_150,h_150,c_fill/');

// Transform URL for responsive images
const responsiveUrl = imageUrl.replace('/upload/', '/upload/w_auto,c_scale/');
```

This implementation provides a robust foundation for image uploads while maintaining simplicity and ease of use.