const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/connect');

dotenv.config();

// DB connect
connectDB();

const app = express();

/* =========================
   CORS CONFIG (IMPORTANT)
========================= */
app.use(cors({
  origin: [
    "https://portfolio-56eaqzkyg-rohit-14361s-projects.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Preflight handling
app.options("*", cors());

/* =========================
   BODY PARSING
========================= */

// Webhook route ko raw body chahiye
app.use((req, res, next) => {
  if (req.originalUrl === "/api/payments/webhook") {
    express.raw({ type: "application/json" })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});

/* =========================
   DB DEBUG (optional but useful)
========================= */
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});

/* =========================
   ROUTES
========================= */
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const paymentRoutes = require('./routes/payments');
const portfolioRoutes = require('./routes/portfolio');
const serviceRoutes = require('./routes/services');
const contactRoutes = require('./routes/contact');
const feedbackRoutes = require('./routes/feedback');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
