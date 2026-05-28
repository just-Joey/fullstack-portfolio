"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resend = void 0;
const resend_1 = require("resend");
require("dotenv/config");
if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY');
}
exports.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
