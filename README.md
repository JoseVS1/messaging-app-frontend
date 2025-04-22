# Wisp Frontend
A modern React-based messaging application with real-time chat capabilities, user authentication, and profile management.

## Overview
Wisp Frontend is a single-page application built with React and Vite that provides an intuitive interface for messaging between users. It features user authentication, profile management, and chat capabilities with a responsive design.

## Features
- User Authentication: Secure signup and login functionality
- Profile Management: View and edit user profiles with custom display names, bios, and avatars
- User Directory: Browse all registered users to start conversations
- Protected Routes: Authentication-based access control
- Responsive Design: Works seamlessly on desktop and mobile devices

## Technology Stack
- Framework: React with hooks and context API
- Routing: React Router
- State Management: React Context API
- HTTP Client: Native fetch API
- Styling: Custom CSS with responsive design
- Build Tool: Vite for fast development and optimized builds

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/JoseVS1/messaging-app-frontend.git
   cd messaging-app-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a .env file in the root directory:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. For production build:
   ```
   npm run build
   ```

## Project Structure
```
└── src
    ├── components
    │   ├── pages
    │   │   ├── ChatPage.jsx
    │   │   ├── EditProfilePage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── NotFoundPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   └── SignupPage.jsx
    │   ├── Errors.jsx
    │   ├── Navbar.jsx
    │   └── ProtectedRoute.jsx
    ├── context
    │   └── UserContext.js
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## Pages and Components
- **HomePage**: User directory to find and start conversations
- **ChatPage**: Real-time messaging interface with a specific user
- **ProfilePage**: View user profile details
- **EditProfilePage**: Update profile information
- **LoginPage/SignupPage**: User authentication forms
- **Navbar**: Navigation bar with conditional rendering based on auth state
- **ProtectedRoute**: Route wrapper that redirects unauthenticated users

## Authentication Flow
1. User registers with username, email, and password
2. User logs in to receive an authentication token
3. Token is stored in localStorage for persistent sessions
4. Protected routes check for valid token
5. User context provides authentication state throughout the app

## State Management
The application uses React Context API to manage:
- Current user state
- Authentication status
- Error handling

## Styling
The application uses a custom CSS file with:
- Responsive design for various screen sizes
- Consistent color scheme and typography
- Clean and intuitive user interface

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Dependencies
- react & react-dom - UI library
- react-router - Routing
- date-fns - Date formatting

## License
[MIT License](LICENSE)
