# Next.js 16 Authentication with RTK Query

A production-ready authentication system built with Next.js 16, TypeScript, and RTK Query following best practices.

## 🚀 Features

- ✅ **RTK Query** for efficient API state management
- ✅ **TypeScript** for type safety
- ✅ **Next.js 16** with App Router
- ✅ **Persistent Authentication** using localStorage
- ✅ **Protected Routes** with automatic redirects
- ✅ **Clean Architecture** with proper separation of concerns
- ✅ **Modern UI** with shadcn/ui components

## 📁 Project Structure

\`\`\`
├── app/
│   ├── layout.tsx              # Root layout with Redux provider
│   ├── page.tsx                # Home page
│   ├── login/
│   │   └── page.tsx            # Login page
│   └── dashboard/
│       └── page.tsx            # Protected dashboard
├── components/
│   └── auth/
│       ├── login-form.tsx      # Login form component
│       ├── protected-route.tsx # HOC for route protection
│       └── user-menu.tsx       # User dropdown menu
├── lib/
│   ├── store.ts                # Redux store configuration
│   ├── hooks.ts                # Typed Redux hooks
│   ├── providers/
│   │   └── store-provider.tsx  # Redux Provider wrapper
│   └── features/
│       └── auth/
│           ├── auth-api.ts     # RTK Query API definitions
│           └── auth-slice.ts   # Auth state slice
└── middleware.ts               # Route protection middleware
\`\`\`

## 🔧 Key Components

### Redux Store Setup
- **Store Configuration**: Centralized store with RTK Query middleware
- **Typed Hooks**: Custom hooks for type-safe Redux usage
- **Provider**: Client-side provider with auth state restoration

### Authentication Flow
1. User submits credentials via login form
2. RTK Query mutation sends request to API
3. On success, token and user data stored in Redux + localStorage
4. Protected routes automatically redirect unauthenticated users
5. Token automatically included in all API requests

### API Integration
- Base URL configured for your ngrok endpoint
- Automatic token injection in request headers
- ngrok-skip-browser-warning header for development
- Error handling with user-friendly messages

## 🛠️ Usage

### Login
Navigate to `/login` and enter your credentials. Upon successful authentication, you'll be redirected to the dashboard.

### Protected Routes
Wrap any page component with `<ProtectedRoute>` to require authentication:

\`\`\`tsx
<ProtectedRoute>
  <YourProtectedContent />
</ProtectedRoute>
\`\`\`

### Making Authenticated API Calls
Add new endpoints to `auth-api.ts`:

\`\`\`typescript
endpoints: (builder) => ({
  getProfile: builder.query<Profile, void>({
    query: () => '/profile',
  }),
})
\`\`\`

## 🔐 Security Features

- Token stored securely in localStorage
- Automatic token refresh on page load
- Protected routes with client-side checks
- Middleware for server-side route protection
- Automatic logout on authentication errors

## 📝 Environment Variables

Update the API base URL in `lib/features/auth/auth-api.ts`:

\`\`\`typescript
const API_BASE_URL = 'https://aa7ea781de46.ngrok-free.app/api/v1'
\`\`\`

For production, use environment variables:

\`\`\`typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-api.com/api/v1'
\`\`\`

## 🎨 Customization

- Update the login form UI in `components/auth/login-form.tsx`
- Modify the user menu in `components/auth/user-menu.tsx`
- Add more API endpoints in `lib/features/auth/auth-api.ts`
- Customize the dashboard in `app/dashboard/page.tsx`
