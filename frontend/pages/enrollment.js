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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prerequisites</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr
              key={course.courseCode}
              className={`cursor-pointer ${!course.selectable ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  disabled={!course.selectable}
                  checked={selectedCourses.includes(course.courseCode)}
                  onChange={() => handleCourseSelection(course.courseCode)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.courseCode}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.courseName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.prerequisiteList.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleEnrollment}
      >
        Enroll
      </button>
    </div>
  );
}
