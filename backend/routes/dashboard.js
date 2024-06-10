// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const jwt = require('jsonwebtoken');

// const prisma = new PrismaClient();
// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;

// router.get('/', async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const { email, role } = decoded;
//     let userData;

//     if (role === 'staff') {
//       userData = await prisma.staff.findUnique({ where: { email } });
//     } else if (role === 'student') {
//       userData = await prisma.students.findUnique({ where: { email } });
//     } else if (role === 'teacher') {
//       userData = await prisma.teacher.findUnique({ where: { email } });
//     } else {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     return res.json({ userData });
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { email, role } = decoded;
    let userData;

    if (role === 'staff') {
      userData = await prisma.staff.findUnique({ where: { email } });
    } else if (role === 'student') {
      userData = await prisma.students.findUnique({ where: { email } });
    } else if (role === 'teacher') {
      userData = await prisma.teacher.findUnique({ where: { email } });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.json({ userData });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
