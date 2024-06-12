const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
      
    }

    const role = user.role;
    
    let userData;

    if (role === 'staff') {
      userData = await prisma.staff.findUnique({ where: { email: user.email } });
    } else if (role === 'student') {
      userData = await prisma.student.findUnique({ where: { email: user.email } });
    } else if (role === 'teacher') {
      userData = await prisma.teacher.findUnique({ where: { email: user.email } });
    }
    
    userData.password = ''
    
    const token = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ user: userData, token: token, role: role });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
