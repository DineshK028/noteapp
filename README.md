# Notes App

A full-stack notes application built with React, Node.js, and MongoDB. This application allows users to create, edit, delete, and manage their notes with features like marking important notes and searching functionality.

## Live Demo

Visit the application: [https://noteapp-henna-ten.vercel.app/](https://noteapp-henna-ten.vercel.app/)

## Features

- 🔐 User Authentication (Register/Login)
- 📝 Create, Read, Update, and Delete Notes
- ⭐ Mark Notes as Important
- 🔍 Search Notes
- 📱 Responsive Design for all devices
- 🔒 Secure Authentication with JWT
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Icons
- React Toastify for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Cookie Parser for handling cookies

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/DineshK028/noteapp.git
cd noteapp
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd ../server
npm install
```

4. Environment Variables

Create a `.env` file in the server directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start the Backend Server
```bash
cd server
npm run dev
```

2. Start the Frontend Development Server
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/logout` - Logout user

### Notes
- GET `/api/notes` - Get all notes
- POST `/api/notes` - Create a new note
- PUT `/api/notes/:id` - Update a note
- DELETE `/api/notes/:id` - Delete a note

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/DineshK028/noteapp](https://github.com/DineshK028/noteapp)
