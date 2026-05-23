const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Load and populate HTML template
const loadTemplate = (templateName, replacements) => {
  const templatePath = path.join(__dirname, '../template', `${templateName}.html`);
  let template = fs.readFileSync(templatePath, 'utf8');
  
  Object.keys(replacements).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(regex, replacements[key]);
  });

  return template;
};

// Send Contact Us email to ADMIN
const sendContactEmailToAdmin = async ({ name, email, message }) => {
  const transporter = createTransporter();
  const html = loadTemplate('contactUsAdmin', { name, email, message, date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `📬 New Contact Request from ${name}`,
    html,
  });
};

// Send Contact Us confirmation email to USER
const sendContactEmailToUser = async ({ name, email, message }) => {
  const transporter = createTransporter();
  const html = loadTemplate('contactUsUser', { name, email, message, date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) });

  await transporter.sendMail({
    from: `"Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `✅ We received your message, ${name}!`,
    html,
  });
};

// Send Payment Success email to ADMIN
const sendPaymentEmailToAdmin = async ({ userName, userEmail, projectName, amount, paymentId, orderId }) => {
  const transporter = createTransporter();
  const html = loadTemplate('paymentSuccessAdmin', {
    userName,
    userEmail,
    projectName,
    amount: `₹${Number(amount).toLocaleString('en-IN')}`,
    paymentId,
    orderId,
    date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  });

  await transporter.sendMail({
    from: `"Payments" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `💰 Payment Received – ${projectName}`,
    html,
  });
};

// Send Payment Success email to USER
const sendPaymentEmailToUser = async ({ userName, userEmail, projectName, amount, paymentId, orderId }) => {
  const transporter = createTransporter();
  const html = loadTemplate('paymentSuccessUser', {
    userName,
    userEmail,
    projectName,
    amount: `₹${Number(amount).toLocaleString('en-IN')}`,
    paymentId,
    orderId,
    date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  });

  await transporter.sendMail({
    from: `"Payment" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `🎉 Payment Confirmed – ${projectName}`,
    html,
  });
};

module.exports = {
  sendContactEmailToAdmin,
  sendContactEmailToUser,
  sendPaymentEmailToAdmin,
  sendPaymentEmailToUser,
};
