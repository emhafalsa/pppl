# Language Learning Platform

A modern, bilingual (Arabic/English) language learning platform built with React, TypeScript, and Node.js.

## Features

- **Bilingual Support**: Full Arabic and English language support with RTL layout
- **User Authentication**: Admin and student login system
- **Course Management**: Browse and register for language courses
- **Dashboard**: Separate dashboards for admins and students
- **Contact System**: Contact form with backend integration
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Context API for state management

### Backend
- Node.js with Express
- SQLite database
- CORS enabled for cross-origin requests
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Start both frontend and backend servers:
```bash
npm run dev:full
```

This will start:
- Frontend development server on `http://localhost:5173`
- Backend API server on `http://localhost:3001`

### Alternative: Run servers separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Messages
- `GET /api/messages` - Get all contact messages
- `POST /api/messages` - Create new message

### Course Registrations
- `GET /api/registrations` - Get all course registrations
- `POST /api/registrations` - Create new registration

### Health Check
- `GET /api/health` - Server health status

## Default Login Credentials

**Admin:**
- Email: `admin@language.com`
- Password: `admin123`

**Student:**
- Email: `student@language.com`
- Password: `student123`

## Database

The application uses SQLite with the following tables:
- `users` - User accounts and authentication
- `messages` - Contact form submissions
- `course_registrations` - Course enrollment data

Database file is automatically created at `server/database.sqlite`

## Project Structure

```
├── src/
│   ├── components/          # React components
│   ├── contexts/           # React contexts
│   ├── data/              # Mock data
│   ├── services/          # API service functions
│   └── types/             # TypeScript type definitions
├── server/
│   └── index.js           # Express server
└── package.json
```

## Development

The project includes:
- Hot reload for both frontend and backend
- TypeScript support
- ESLint configuration
- Tailwind CSS with custom Arabic font support
- Responsive design with RTL support

## Building for Production

```bash
npm run build
```

This creates a `dist` folder with the production build.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.