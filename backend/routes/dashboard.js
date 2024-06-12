
const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/prismaClient');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.get('/', async (req, res) => {
  const { email, role } = req.query
  console.log(email, role)

  try {
    let userData;

    if (role === 'staff') {
      userData = await prisma.staff.findUnique({ where: { email } });
    } else if (role === 'student') {
      userData = await prisma.student.findUnique({ where: { email } });
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
