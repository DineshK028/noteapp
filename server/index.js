import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';

dotenv.config();

const app = express();

import cors from 'cors';

app.use(cors({
  origin: "https://noteapp-frontend-nu.vercel.app", // ✅ Specific origin only
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // ✅ Needed if using cookies or auth headers
}));




// MongoDB Connection
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
    // Don't exit process in serverless environment
    // process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// ✅ Good order:
app.use(cors({ /* config */ }));
app.use(express.json());

// Then register routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);


// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Notes App API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
export default app; 
