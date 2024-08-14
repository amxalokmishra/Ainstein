import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import lessonRoutes from './routes/lessonRoutes';
import searchRoutes from './routes/searchRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { cacheMiddleware } from './middlewares/cacheMiddleware';

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', cacheMiddleware, courseRoutes);
app.use('/api/lessons', cacheMiddleware, lessonRoutes);
app.use('/api/search', cacheMiddleware, searchRoutes);

// Error handling middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
