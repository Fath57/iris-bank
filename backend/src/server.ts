import express from 'express';
import { connectDb, disconnectDb } from './config/db.js';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors';

// Import routes
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import bankAccountRoutes from './routes/bankAccount.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import beneficiaryRoutes from './routes/beneficiary.routes.js';
import adminRoutes from './routes/admin.routes.js';

config();
connectDb();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

//Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// API Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/accounts', bankAccountRoutes);
app.use('/transactions', transactionRoutes);
app.use('/beneficiaries', beneficiaryRoutes);
app.use('/admin', adminRoutes);


const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(async () => {
    await disconnectDb();
    process.exit(1);
  });
});


// handle uncaught exceptions
process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  await disconnectDb();
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await disconnectDb();
  process.exit(0);
});
