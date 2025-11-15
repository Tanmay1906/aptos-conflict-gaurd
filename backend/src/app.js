import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import blockchainRoutes from './routes/blockchainRoutes.js';
import caseRoutes from './routes/caseRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

dotenv.config({ path: process.env.DOTENV_PATH || './.env' });

const app = express();

app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin && process.env.NODE_ENV === 'development') return callback(null, true);
    
    // Allow all origins in development
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // In production, only allow specific origins
    const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', JSON.stringify(req.query, null, 2));
  
  // Log the request body for non-GET requests
  if (req.method !== 'GET') {
    let bodyData = '';
    req.on('data', chunk => {
      bodyData += chunk.toString();
    });
    
    req.on('end', () => {
      console.log('Request body:', bodyData);
      // Parse the body if it's JSON
      if (bodyData && req.get('content-type')?.includes('application/json')) {
        try {
          req.body = JSON.parse(bodyData);
        } catch (e) {
          console.error('Error parsing JSON body:', e);
        }
      }
      next();
    });
  } else {
    next();
  }
});

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(cookieParser());
// Log all incoming requests
app.use((req, res, next) => {
  console.log(`\n=== New ${req.method} Request ===`);
  console.log('URL:', req.url);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  // Log request body for POST requests
  if (req.method === 'POST') {
    const chunks = [];
    const oldWrite = res.write;
    const oldEnd = res.end;
    
    req.on('data', chunk => chunks.push(chunk));
    
    req.on('end', () => {
      if (chunks.length > 0) {
        const body = Buffer.concat(chunks).toString();
        console.log('Raw request body:', body);
        try {
          req.body = JSON.parse(body);
          console.log('Parsed request body:', req.body);
        } catch (e) {
          console.error('Error parsing request body:', e);
        }
      }
      next();
    });
  } else {
    next();
  }
});

// Standard body parsers - disabled for now to test our custom parser
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/blockchain', blockchainRoutes);
app.use('/api/v1/cases', caseRoutes);

app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
