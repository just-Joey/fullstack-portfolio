"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const contact_1 = __importDefault(require("./routes/contact"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://fullstack-portfolio-nu-bay.vercel.app',
        'https://fullstack-portfolio-penny-and-wish.vercel.app',
        'https://fullstack-portfolio-git-main-penny-and-wish.vercel.app',
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.get('/health', (_, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.use('/contact', contact_1.default);
app.listen(PORT, () => {
    console.log(`Portfolio backend running on http://localhost:${PORT}`);
});
