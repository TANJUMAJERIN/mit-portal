const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/initial-course-selection', courseController.initialCourseSelection);
router.post('/submit-course-selection', courseController.submitCourseSelection);

module.exports = router;