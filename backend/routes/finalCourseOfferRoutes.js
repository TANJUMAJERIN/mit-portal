const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch courses based on session and semester
router.get('/api/finalCourseOffer', async (req, res) => {
    const { session, semester } = req.query;

    try {
        const courses = await prisma.selectedcourse.findMany({
            where: {
                session: session,
                semester: semester,
            },
        });

        res.json({ courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching courses.' });
    }
});

// Handle course selection submission
router.post('/api/finalCourseOffer', async (req, res) => {
    const { session, semester, selectedCourses } = req.body;

    try {
        // Delete courses not selected
        await prisma.selectedcourse.deleteMany({
            where: {
                session: session,
                semester: semester,
                coursecode: {
                    notIn: selectedCourses,
                },
            },
        });

        // Ensure selected courses are still in the table
        for (const coursecode of selectedCourses) {
            await prisma.selectedcourse.upsert({
                where: {
                    coursecode_session_semester: {
                        coursecode,
                        session,
                        semester,
                    },
                },
                update: {},
                create: {
                    session,
                    semester,
                    coursecode,
                    currentlyEnrolled: 0, // or any default value
                },
            });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while submitting courses.' });
    }
});

module.exports = router;
