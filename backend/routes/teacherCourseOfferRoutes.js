
// const express = require('express');
// const router = express.Router();
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// // Route to handle course offering
// router.post('/offerCourse', async (req, res) => {
//   const { session, semester, coursecode } = req.body;

//   try {
//     // Check if the course already exists
//     const existingCourse = await prisma.selectedcourse.findFirst({
//       where: {
//         session,
//         semester,
//         coursecode,
//       },
//     });

//     if (existingCourse) {
//       return res.status(400).json({ message: 'Course already offered for this session and semester' });
//     }

//     const course = await prisma.selectedcourse.create({
//       data: {
//         session,
//         semester,
//         coursecode,
//         currentlyEnrolled: 0, // Assuming initially there are no enrollments
//       },
//     });

//     res.status(200).json({ message: 'Course offered successfully', course });
//   } catch (error) {
//     console.error('Error offering course:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to fetch courses based on semester
// router.get('/courses/:semester', async (req, res) => {
//   const { semester } = req.params;
//   let courseFilter = {};

//   if (semester === '2nd') {
//     courseFilter = {
//       where: {
//         coursecode: {
//           startsWith: 'MITE',
//         },
//       },
//     };
//   } else if (semester === '3rd') {
//     courseFilter = {
//       where: {
//         OR: [
//           { coursecode: { startsWith: 'MITE' } },
//           { coursecode: 'MITM 421' }
//         ],
//       },
//     };
//   }

//   try {
//     const courses = await prisma.course.findMany(courseFilter);
//     res.status(200).json(courses);
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Route to handle course offering
router.post('/offerCourse', async (req, res) => {
  const { session, semester, coursecode } = req.body;

  try {
    // Check if the course already exists
    const existingCourse = await prisma.selectedcourse.findFirst({
      where: {
        session,
        semester,
        coursecode,
      },
    });

    if (existingCourse) {
      return res.status(400).json({ message: 'Course already offered for this session and semester' });
    }

    const course = await prisma.selectedcourse.create({
      data: {
        session,
        semester,
        coursecode,
        currentlyEnrolled: 0, // Assuming initially there are no enrollments
      },
    });

    res.status(200).json({ message: 'Course offered successfully', course });
  } catch (error) {
    console.error('Error offering course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch courses based on semester
router.get('/courses/:semester', async (req, res) => {
  const { semester } = req.params;
  let courseFilter = {};

  if (semester === '2nd') {
    courseFilter = {
      where: {
        coursecode: {
          startsWith: 'MITE',
        },
      },
    };
  } else if (semester === '3rd') {
    courseFilter = {
      where: {
        OR: [
          { coursecode: { startsWith: 'MITE' } },
          { coursecode: 'MITE421' }
        ],
      },
    };
  }

  try {
    const courses = await prisma.course.findMany(courseFilter);
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
