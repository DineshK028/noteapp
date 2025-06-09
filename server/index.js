import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';

dotenv.config();

const app = express();

// ✅ CORS: Allow multiple frontend URLs
const allowedOrigins = [
  "https://noteapp-blush.vercel.app",
  "https://noteapp-git-main-dineshs-projects-596f99c3.vercel.app",
  "https://noteapp-f08k5il1g-dineshs-projects-596f99c3.vercel.app",
  "http://localhost:3000" // For local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
connectDB();

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ✅ Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Notes App API' });
});

// ✅ Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ✅ Export for Vercel
export default app;
