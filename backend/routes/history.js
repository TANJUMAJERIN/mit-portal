//  const express = require('express');
// const router = express.Router();
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// router.post('/', async (req, res) => {
//   try {
//     const { roll, session } = req.body;
//     const data = await prisma.marksheetdata.findMany({
//       where: {
//         student_roll: roll,
//         session,
//       },
//     });
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
/////////////pondit////////////////

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const { roll, session } = req.body;

    const student = await prisma.student.findUnique({
      where: {
        registration_number: roll,
      },
      select: {
        registration_number: true,
        name: true,
        email: true,
        session: true,
      },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const enrollments = await prisma.courseenrollment.findMany({
      where: {
        roll: roll,
        session: session,
      },
      include: {
        course: {
          select: {
            coursecode: true,
            coursename: true,
          },
        },
      },
    });

    const marksheet = await prisma.marksheetdata.findMany({
      where: {
        student_roll: roll,
        session: session,
      },
    });

    res.json({ student, enrollments, marksheet });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
