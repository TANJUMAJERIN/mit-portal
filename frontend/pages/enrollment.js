
import { useState, useEffect } from 'react';
import axios from '@/libs/axios';

export default function Enrollment() {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('/api/courses?registration_number=13');
        setCourses(response.data.electiveCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
    fetchCourses();
  }, []);

  const handleCourseSelection = (courseCode) => {
    if (selectedCourses.includes(courseCode)) {
      setSelectedCourses(selectedCourses.filter((course) => course !== courseCode));
    } else {
      setSelectedCourses([...selectedCourses, courseCode]);
    }
  };

  const handleEnrollment = async () => {
    try {
      const response = await axios.post('/api/enroll', {
        registration_number: '13',
        selectedCourses,
      });
      if (response.status === 200) {
        setMessage('Enrollment Successful!');
      } else {
        setMessage('Enrollment Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      setMessage('Enrollment Failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 text-black bg-white">
      <h1 className="text-2xl font-bold mb-4">Course Enrollment</h1>
      {message && <p className="mb-4">{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div
            key={course.courseCode}
            className={`border p-4 rounded ${
              selectedCourses.includes(course.courseCode) ? 'bg-blue-200' : 'bg-white'
            } cursor-pointer`}
            onClick={() => handleCourseSelection(course.courseCode)}
          >
            <h2 className="text-xl font-bold">{course.courseName}</h2>
            <p>Course Code: {course.courseCode}</p>
            <p>Enrolled: {course.currentlyEnrolled}</p>
            <p>Prerequisites: {course.prerequisiteList.join(', ')}</p>
            <p>Selectable: {course.selectable ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleEnrollment}
      >
        Enroll
      </button>
    </div>
  );
}