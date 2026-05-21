const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/connect');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin:["https://portfolio-zeta-rust-46y2evpq6v.vercel.app/","http://localhost:3000"]
}));

// Razorpay webhook route needs raw body BEFORE express.json()
// We handle this by using express.raw() only on the webhook route (done inside the route file)
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payments/webhook') {
    // Use raw body for webhook signature verification
    express.raw({ type: 'application/json' })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const paymentRoutes = require('./routes/payments');
const portfolioRoutes = require('./routes/portfolio');
const serviceRoutes = require('./routes/services');
const contactRoutes = require('./routes/contact');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
