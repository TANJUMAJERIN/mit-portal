<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const { roll, session } = req.body;
    const data = await prisma.marksheetData.findMany({
      where: {
        student_roll: roll,
        session,
      },
    });
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
=======
// const express = require('express');
// const prisma = require('../prisma/prismaClient');

// const router = express.Router();

// router.get('/studentHistory/:registrationNumber/:session', async (req, res) => {
//   const { registrationNumber, session } = req.params;

//   try {
//     // Fetch student details
//     const student = await prisma.student.findUnique({
//       where: {
//         registration_number: registrationNumber,
//       },
//     });

//     if (!student) {
//       return res.status(404).send('Student not found');
//     }

//     // Fetch enrolled courses
//     const enrollments = await prisma.courseEnrollment.findMany({
//       where: {
//         roll: registrationNumber,
//         session: session,
//       },
//       include: {
//         course: true,
//       },
//     });

//     // Fetch results
//     const results = await prisma.MarksheetData.findMany({
//       where: {
//         student_roll: registrationNumber,
//         session: session,
//       },
//     });

//     res.json({ student, enrollments, results });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
/////////////////2nd ///////////////////////////
const express = require('express');
const prisma = require('../prisma/prismaClient'); // Adjust the path as necessary

const router = express.Router();

router.get('/studentHistory/:registrationNumber/:session', async (req, res) => {
  const { registrationNumber, session } = req.params;

  try {
    // Fetch student details
    const student = await prisma.student.findUnique({
      where: {
        registration_number: registrationNumber,
      },
    });

    if (!student) {
      return res.status(404).send('Student not found');
    }

    // Fetch enrolled courses
    const enrollments = await prisma.courseEnrollment.findMany({
      where: {
        roll: registrationNumber,
        session: session,
      },
      include: {
        course: true,
      },
    });

    // Fetch results
    const results = await prisma.marksheetData.findMany({
      where: {
        student_roll: registrationNumber,
        session: session,
      },
    });

    res.json({ student, enrollments, results });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
>>>>>>> a28d37c9a0c53908cf27eaf31b6fa1974632eea5
