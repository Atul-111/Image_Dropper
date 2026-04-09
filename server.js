const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueId}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Only allow image files
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max size
});

// In-memory storage for image metadata (In production, use database)
const imageMetadata = new Map();

// Routes

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const uniqueId = path.parse(req.file.filename).name;
  const shareUrl = `${req.protocol}://${req.get('host')}/share/${uniqueId}`;
  const downloadUrl = `${req.protocol}://${req.get('host')}/download/${uniqueId}`;

  // Store metadata
  imageMetadata.set(uniqueId, {
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    uploadedAt: new Date(),
    mimeType: req.file.mimetype
  });

  res.json({
    success: true,
    shareUrl: shareUrl,
    downloadUrl: downloadUrl,
    uniqueId: uniqueId,
    imageUrl: `/download/${uniqueId}`
  });
});

// Get image for preview/display
app.get('/download/:id', (req, res) => {
  const metadata = imageMetadata.get(req.params.id);
  
  if (!metadata) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const filePath = path.join(uploadsDir, metadata.filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Image file not found' });
  }

  res.download(filePath, metadata.originalName);
});

// Share page - view and interact with shared image
app.get('/share/:id', (req, res) => {
  const metadata = imageMetadata.get(req.params.id);
  
  if (!metadata) {
    return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }

  res.sendFile(path.join(__dirname, 'public', 'share.html'));
});

// API: Get image data for share page
app.get('/api/image/:id', (req, res) => {
  const metadata = imageMetadata.get(req.params.id);
  
  if (!metadata) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const filePath = path.join(uploadsDir, metadata.filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Image file not found' });
  }

  res.json({
    success: true,
    id: req.params.id,
    originalName: metadata.originalName,
    size: metadata.size,
    uploadedAt: metadata.uploadedAt,
    downloadUrl: `/download/${req.params.id}`,
    imageUrl: `data:${metadata.mimeType};base64,${fs.readFileSync(filePath).toString('base64')}`
  });
});

// API: Get image info without image data
app.get('/api/image-info/:id', (req, res) => {
  const metadata = imageMetadata.get(req.params.id);
  
  if (!metadata) {
    return res.status(404).json({ error: 'Image not found' });
  }

  res.json({
    success: true,
    id: req.params.id,
    originalName: metadata.originalName,
    size: metadata.size,
    uploadedAt: metadata.uploadedAt
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Image Dropper server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(400).json({ error: 'File is too large. Maximum size is 50MB' });
    }
  }
  
  if (err.message === 'Only image files are allowed') {
    return res.status(400).json({ error: 'Only image files are allowed' });
  }

  res.status(500).json({ error: 'An error occurred during upload' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     Image Dropper Server Started       ║
║            Port: ${PORT}                    ║
║  http://localhost:${PORT}              ║
╚════════════════════════════════════════╝
  `);
});

// Export for Vercel serverless functions
module.exports = app;
