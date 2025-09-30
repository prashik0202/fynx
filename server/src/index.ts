import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.route';

import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
}))

// api routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// api health check
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hello World!"
  });
});

// Error handling middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
