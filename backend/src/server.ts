// backend/src/server.ts
import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
