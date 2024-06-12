

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
    
    const user = await prisma.user.create({
      data: {
        email: email,
        role: "student",
        password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi"
      },
    });

    // Remove the record from the enrolled table
    await prisma.enrolled.delete({
      where: {
        email: email,
      },
    });
    console.log(email);

    res.json(user);
  } catch (error) {
    console.error('Error saving student:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


////////////////

// const express = require('express');
// const router = express.Router();
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// // Get enrolled students
// router.get('/enrollments', async (req, res) => {
//   try {
//     const enrolledStudents = await prisma.enrolled.findMany();
//     res.json(enrolledStudents);
//   } catch (error) {
//     console.error('Error fetching enrolled students:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Save student
// router.post('/students', async (req, res) => {
//   try {
//     const { registration_number, email, session, name } = req.body;
    
//     // Validate incoming data
//     if (!registration_number || !email || !session || !name) {
//       console.error('Validation Error: Missing fields');
//       return res.status(400).json({ error: 'All fields are required.' });
//     }

//     // Log the incoming data for debugging
//     console.log('Received data:', req.body);

//     const student = await prisma.student.create({
//       data: {
//         registration_number,
//         email,
//         session,
//         name,
//       },
//     });
    
//     const user = await prisma.user.create({
//       data: {
        
//         email: email,
//         role:  "student",
//         password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi"
        
        
//       },
//     });

    
   
//     res.json(user);
//   } catch (error) {
//     console.error('Error saving student:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;