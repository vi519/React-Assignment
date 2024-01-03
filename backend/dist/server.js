"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/server.ts
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const port = 5000;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const logContent = req.file.buffer.toString('utf-8');
    // Parse log content and process it as needed
    // For demonstration purposes, just sending back the parsed log
    res.json({ parsedLog: 'Log successfully parsed and processed.' });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
