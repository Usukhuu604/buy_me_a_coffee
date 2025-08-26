# Buy Me A Coffee App

A Next.js application that allows users to create profiles and receive support, similar to the popular "Buy Me A Coffee" platform.

## Features

- 🔐 User authentication with Clerk
- 📸 Image upload functionality with Cloudinary
- 👤 User profile creation and management
- 🎨 Modern UI with Tailwind CSS
- 🗄️ Database integration with Prisma and PostgreSQL

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Image Upload**: Cloudinary (direct client-side uploads)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide React

## Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Usukhuu604/buy_me_a_coffee.git
cd buy_me_a_coffee/client
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the client directory:
```env
DATABASE_URL=your_postgresql_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Image Upload with Cloudinary

This application uses Cloudinary for handling user profile image uploads. The implementation features:

- **Direct client-side uploads** to Cloudinary
- **Drag and drop** file upload interface
- **Real-time preview** of uploaded images
- **Error handling** and loading states

### Configuration
- **Cloud Name**: `dd7qcdmww`
- **Upload Preset**: `coffee-time`
- **Folder**: `coffeeproject`

### Key Files
- `client/app/hooks/useGetImage.tsx` - Main upload hook
- `client/app/fill-your-info/ProfileStep1.tsx` - Profile image upload component

For detailed information about the Cloudinary implementation, see [CLOUDINARY_USAGE.md](./CLOUDINARY_USAGE.md).

## Project Structure

```
client/
├── app/                          # Next.js app directory
│   ├── hooks/                   # Custom React hooks
│   │   ├── useGetImage.tsx     # Cloudinary upload hook
│   │   └── useUsername.tsx     # Clerk username hook
│   ├── fill-your-info/         # Profile creation flow
│   │   └── ProfileStep1.tsx    # Profile setup component
│   ├── _components/            # Shared components
│   └── actions/                # Server actions
├── components/                  # UI components
├── lib/                        # Utility functions
├── prisma/                     # Database schema and migrations
└── public/                     # Static assets
```

## Database Schema

The application uses Prisma with PostgreSQL. Key models include:
- User profiles with avatar images
- Social media links
- Profile metadata

Run `npx prisma studio` to explore the database in a web interface.

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Authentication

User authentication is handled by Clerk, providing:
- Social login options
- User session management
- Protected routes
- User metadata handling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and not licensed for public use.

## Support

For questions or support, please contact the repository owner.