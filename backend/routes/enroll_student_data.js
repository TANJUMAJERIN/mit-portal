const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma_client');
//ager code e /enroll chilona
router.post('/enroll/upload', async (req, res) => {
  const studentsData = req.body;
  console.log('Received Data:', studentsData); // Add this line
  studentsData.map((student) => console.log(student))

  try {
    const createdStudents = await prisma.enrolled.createMany({
      data: studentsData.map((student) => ({
        registration_number: student.registration_number,
        email: student.email,
        session: student.session,
        name: student.name,
      })),
      skipDuplicates: true, // Skip duplicates based on unique constraint
    });

    res.status(200).json(createdStudents);
  } catch (error) {
    console.error('Error creating students:', error);
    res.status(500).json({ error: 'Error creating students' });
  }
});

module.exports = router;