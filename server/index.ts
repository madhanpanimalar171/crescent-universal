import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || process.env.BACKEND_PORT || 3000);

// Environment variables
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

transporter.verify().then(
  () => {
    console.log('✅ Gmail SMTP transporter verified successfully.');
  },
  (error) => {
    console.error('❌ Gmail SMTP transporter verification failed:', error);
  }
);

// Middleware
app.use(express.json());
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173'];
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

// Type definitions
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken: string;
}

interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  error_codes?: string[];
}

// Helper: Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper: Validate required fields
function validateFormFields(data: Partial<ContactFormData>): string | null {
  if (!data.name?.trim()) return 'Name is required';
  if (!data.email?.trim()) return 'Email is required';
  if (!isValidEmail(data.email)) return 'Invalid email format';
  if (!data.phone?.trim()) return 'Phone is required';
  if (!data.message?.trim()) return 'Message is required';
  if (!data.recaptchaToken?.trim()) return 'Captcha verification failed.';
  return null;
}

// Helper: Verify reCAPTCHA token with Google
async function verifyRecaptchaToken(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET) {
    console.error('RECAPTCHA_SECRET is not configured');
    return false;
  }

  try {
    const response = await axios.post<RecaptchaResponse>(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET,
          response: token,
        },
      }
    );

    const { success, score } = response.data;

    // For v3 reCAPTCHA, check score (0.0 to 1.0)
    // For v2, just check success
    if (score !== undefined) {
      return success && score > 0.5;
    }

    return success;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendEmail(data: ContactFormData) {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error('EMAIL_USER or EMAIL_PASS is not configured');
    throw new Error('Email configuration missing');
  }

  const submissionDate = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <h2 style="margin-bottom: 0.5rem;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600; width: 160px;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Phone</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.phone)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Message</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.message).replace(/\n/g, '<br/>')}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: 600;">Submission Date &amp; Time</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${submissionDate} UTC</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  const text = `New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Message:
${data.message}

Submission Date & Time: ${submissionDate} UTC
`;

  const mailOptions = {
    from: `"Crescent Universal Contact" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    replyTo: data.email,
    subject: 'New Contact Form Submission',
    text,
    html,
  };

  console.log('📩 Sending contact email to', EMAIL_USER);
  await transporter.sendMail(mailOptions);
  console.log('✅ Contact email sent successfully');
}

// Routes

// Root status endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running.' });
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Contact form verification endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const data: Partial<ContactFormData> = req.body;

    // Step 1: Validate required fields
    const validationError = validateFormFields(data);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Type guard: ensure all fields are present after validation
    const validatedData = data as ContactFormData;

    // Step 2: Verify reCAPTCHA token
    const isValidCaptcha = await verifyRecaptchaToken(validatedData.recaptchaToken);
    if (!isValidCaptcha) {
      return res.status(400).json({ error: 'Captcha verification failed.' });
    }

    // Step 3: Send email
    try {
      await sendEmail(validatedData);
    } catch (error) {
      console.error('Email sending failed:', error);
      return res.status(500).json({ error: 'Failed to send email.' });
    }

    // Step 4: Success response
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact form verification error:', error);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`🔐 reCAPTCHA configured: ${RECAPTCHA_SECRET ? 'Yes' : 'No'}`);
});
