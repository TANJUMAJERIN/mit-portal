const express = require('express');
const multer = require('multer');
const prisma = require('../prisma/prismaClient');
const path = require('path');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the extension
  },
});
const upload = multer({ storage });

router.post('/uploadNotice', upload.single('notice'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const title = path.basename(req.file.filename, '.pdf');
    const description = `/uploads/${req.file.filename}`;

    const notice = await prisma.notices.create({
      data: {
        title,
        description,
      },
    });
console.log(title,description);
    res.status(200).json({ message: 'Notice uploaded successfully', notice });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
