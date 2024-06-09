// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const viewResult = async (req, res) => {
//   const { semester, session, rollNumber } = req.body;

//   try {
//     // Fetch student details
//     const student = await prisma.students.findUnique({
//       where: {
//         registration_number: rollNumber,
//       },
//     });

//     if (!student) {
//       return res.status(404).send('Student not found');
//     }

//     // Fetch marksheet data
//     const results = await prisma.marksheetData.findMany({
//       where: {
//         student_roll: rollNumber,
//         semester: semester,
//         session: session,
//       },
//       select: {
//         course_code: true,
//         course_name: true,
//         gpa: true,
//       },
//     });

//     if (!results.length) {
//       return res.status(404).send('No results found for the given details');
//     }

//     res.status(200).json({ results, student });
//   } catch (error) {
//     console.error('Error fetching results:', error);
//     res.status(500).send('Server error: ' + error.message);
//   }
// };

// module.exports = { viewResult };//////////////////////////////////////////
// const prisma = require('../prisma/prismaClient');

// const viewResult = async (req, res) => {
//   console.log('viewResult function called');
//   console.log('Request body:', req.body);
//   const { semester, session, rollNumber } = req.body;

//   try {
//     // Fetch student details
//     const student = await prisma.students.findUnique({
//       where: {
//         registration_number: rollNumber,
//       },
//     });

//     if (!student) {
//       return res.status(404).send('Student not found');
//     }

//     // Fetch marksheet data
//     const results = await prisma.marksheetData.findMany({
//       where: {
//         student_roll: rollNumber,
//         semester: semester,
//         session: session,
//       },
//       select: {
//         course_code: true,
//         course_name: true,
//         gpa: true,
//       },
//     });

//     if (!results.length) {
//       return res.status(404).send('No results found for the given details');
//     }

//     res.status(200).json({ results, student });
//   } catch (error) {
//     console.error('Error fetching results:', error);
//     res.status(500).send('Server error: ' + error.message);
//   }
// };

// module.exports = { viewResult };

const prisma = require('../prisma/prismaClient');

const viewResult = async (req, res) => {
  const { semester, session, rollNumber } = req.body;

  try {
    // Fetch student details
    const student = await prisma.students.findUnique({
      where: {
        registration_number: rollNumber,
      },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Fetch marksheet data
    const results = await prisma.marksheetData.findMany({
      where: {
        student_roll: rollNumber,
        semester: semester,
        session: session,
      },
      select: {
        course_code: true,
        course_name: true,
        gpa: true,
      },
    });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Roll number is not given exam in this semester' });
    }

    res.status(200).json({ results, student });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

module.exports = { viewResult };