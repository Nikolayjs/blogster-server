import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { checkAuth } from '../middleware/index.js';
const router = express.Router({ mergeParams: true });
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.use('/uploads', express.static('uploads'));

router.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

export default router;
