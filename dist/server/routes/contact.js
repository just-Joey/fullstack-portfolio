"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resend_1 = require("../lib/resend");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            error: 'All fields are required: name, email, subject, message'
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    const { error } = await resend_1.resend.emails.send({
        from: 'Joey Maes <hello@joeymaes.dev>',
        to: process.env.CONTACT_EMAIL,
        subject: `Portfolio contact: ${subject}`,
        html: `
      <h2>New portfolio message</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
        replyTo: email,
    });
    if (error) {
        console.error('Resend error:', error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
    return res.status(201).json({
        success: true,
        message: 'Message sent — thanks for reaching out!',
    });
});
exports.default = router;
