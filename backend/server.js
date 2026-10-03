import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import { notFound, errorHandler } from './utils/errorHandlers.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/tasks', taskRoutes);


app.get('/api/health', (req, res) => res.json({ status: 'ok' }));


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/task-manager';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
  });
