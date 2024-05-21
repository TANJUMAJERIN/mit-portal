const express = require('express');
const router = express.Router();
const prisma = require('../libs/prisma_client');

router.post('/upload', async (req, res) => {
  const studentsData = req.body;

  studentsData.map((student) => console.log(student))

  try {
    const createdStudents = await prisma.enrolled.createMany({
      data: studentsData.map((student) => ({
        registration_number: student.registration_number,
        name: student.name,
        email: student.email,
        session: student.session,
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
