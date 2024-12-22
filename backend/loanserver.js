import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import multer from 'multer';
import path from 'path';
import CryptoJS from 'crypto-js';
import fs from 'fs';
import mongoose from 'mongoose';

const app = express();
const port = 5001;

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/bank'; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Loan Application Schema
const loanApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  loanAmount: Number,
  purpose: String,
  documentPath: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use('/api/', apiLimiter);

// Create 'uploads/' directory if it doesn't exist
const uploadPath = 'uploads/';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
    }
    cb(null, true);
  },
});

const secretKey = 'mySecretKey123'; // Ensure this matches the frontend key

// POST: Apply Loan
app.post('/api/apply-loan', upload.single('document'), async (req, res) => {
  const { encryptedData } = req.body;

  if (!encryptedData || !req.file) {
    return res.status(400).json({
      success: false,
      message: 'Encrypted data and document upload are required.',
    });
  }

  try {
    console.log('Received encrypted data:', encryptedData);

    // Decrypt data
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    console.log('Decrypted data:', decryptedData);

    const { name, email, loanAmount, purpose } = decryptedData;

    if (!name || !email || !loanAmount || !purpose) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, loan amount, and purpose are required.',
      });
    }

    // Save loan application to MongoDB
    const newApplication = new LoanApplication({
      name,
      email,
      loanAmount,
      purpose,
      documentPath: path.join(uploadPath, req.file.filename),
    });

    await newApplication.save();

    return res.status(201).json({
      success: true,
      message: 'Loan application submitted successfully.',
      applicationId: newApplication._id,
    });
  } catch (err) {
    console.error('Error decrypting or saving data:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});

// GET: Loan Status
app.get('/api/loan-status/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: 'Application ID is required.' });
  }

  try {
    const application = await LoanApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Loan application not found.',
      });
    }

    return res.status(200).json({
      success: true,
      applicationStatus: application.status,
    });
  } catch (err) {
    console.error('Error retrieving loan status:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});

// Error Handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err.message);
    return res.status(400).json({ success: false, message: 'File upload error.', error: err.message });
  }
  if (err) {
    console.error('General error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error.', error: err.message });
  }
  next();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
