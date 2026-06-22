const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Configuration (MongoDB) ---
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pawzio')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

// --- Mongoose Model ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['OWNER', 'VET', 'WALKER'] },
  qualification: String,
  licenseNumber: String,
  clinicName: String,
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// --- Email Service Configuration ---
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || '587'),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendVerificationEmail = async (doctorData) => {
  const adminEmail = 'karasisonica@gmail.com';
  const mailOptions = {
    from: '"PawzIO Support" <noreply@pawzio.com>',
    to: adminEmail,
    subject: '🚨 New Doctor Verification Required',
    html: `
      <h2>New Doctor Registration</h2>
      <p>A doctor has just registered and requires verification.</p>
      <hr>
      <ul>
        <li><strong>Name:</strong> ${doctorData.name}</li>
        <li><strong>Email:</strong> ${doctorData.email}</li>
        <li><strong>Qualification:</strong> ${doctorData.qualification}</li>
        <li><strong>License Number:</strong> ${doctorData.licenseNumber}</li>
        <li><strong>Clinic Name:</strong> ${doctorData.clinicName}</li>
      </ul>
      <p>Please log in to the admin panel to verify this profile.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent for ${doctorData.name}`);
  } catch (error) {
    console.error('Email Error:', error);
  }
};

// --- API Routes ---

// Create User / Doctor Registration
app.post('/users', async (req, res) => {
  try {
    const { name, email, password, role, qualification, licenseNumber, clinicName } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      role,
      qualification,
      licenseNumber,
      clinicName,
      isVerified: role === 'VET' ? false : true
    });

    const savedUser = await newUser.save();

    // Trigger email if it's a doctor
    if (role === 'VET') {
      await sendVerificationEmail(savedUser);
    }

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Basic Health Check
app.get('/', (req, res) => res.send('PawzIO Backend is Running!'));

app.listen(PORT, () => console.log(`Backend live at http://localhost:${PORT}`));
