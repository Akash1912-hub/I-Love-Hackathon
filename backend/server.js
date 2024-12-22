import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Mock user database
const usersDatabase = [
  {
    email: 'user@example.com',
    password: '', // Hashed password will be stored here
  },
];

// Pre-hash a mock password for testing
const mockPassword = 'my_secure_password';
bcrypt.hash(mockPassword, 10, (err, hash) => {
  if (!err) {
    usersDatabase[0].password = hash;
    console.log('Mock user created:', usersDatabase);
  }
});

// JWT Secret Key
const jwtSecret = 'my_secret_key';

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = usersDatabase.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Generate JWT token
      const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
      return res.status(200).json({ success: true, message: 'Login successful.', token });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error('Error during password comparison:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Protected Route Example
app.get('/api/dashboard', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token required.' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return res.status(200).json({ success: true, message: `Welcome, ${decoded.email}!` });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
