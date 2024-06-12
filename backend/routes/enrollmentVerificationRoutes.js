// const express = require('express');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const router = express.Router();

// router.get('/enrolled', async (req, res) => {
//   const enrolled = await prisma.enrolled.findMany();
//   res.json(enrolled);
// });

// router.post('/student', async (req, res) => {
//   const { registration_number, email, session, name } = req.body;
//   try {
//     const student = await prisma.student.create({
//       data: {
//         registration_number,
//         email,
//         session,
//         name,
//       },
//     });
//     res.json(student);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;
// const express = require('express');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const router = express.Router();

// router.get('/enrolled', async (req, res) => {
//   try {
//     const enrolled = await prisma.enrolled.findMany();
//     res.json(enrolled);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch enrolled students' });
//   }
// });

// router.post('/students', async (req, res) => {
//   const { registration_number, email, session, name } = req.body;
//   try {
//     const student = await prisma.student.create({
//       data: {
//         registration_number,
//         email,
//         session,
//         name,
//       },
//     });
//     res.json(student);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get enrolled students
router.get('/enrollments', async (req, res) => {
  try {
    const enrolledStudents = await prisma.enrolled.findMany();
    res.json(enrolledStudents);
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Save student
router.post('/students', async (req, res) => {
  try {
    const { registration_number, email, session, name } = req.body;
    
    // Validate incoming data
    if (!registration_number || !email || !session || !name) {
      console.error('Validation Error: Missing fields');
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Log the incoming data for debugging
    console.log('Received data:', req.body);

    const student = await prisma.student.create({
      data: {
        registration_number,
        email,
        session,
        name,
      },
    });
    
    res.json(student);
  } catch (error) {
    console.error('Error saving student:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
