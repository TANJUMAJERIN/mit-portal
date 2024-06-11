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
