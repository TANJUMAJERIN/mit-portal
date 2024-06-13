const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/initial-course-selection', courseController.initialCourseSelection);
router.post('/submit-course-selection', courseController.submitCourseSelection);
//router.post('/major-course-selection', courseController.majorCourseSelection);
//router.post('/elective-course-selection', courseController.electiveCourseSelection);
router.get('/fetch-major-courses', courseController.majorCourseFetch);
router.post('/final-course-selection', courseController.finalCourseSelection);

module.exports = router;