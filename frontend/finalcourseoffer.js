import React, { useState, useEffect } from 'react';
import axios from '@/libs/axios';

const FinalCourseOffering = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/elective-courses');
        setCourses(response.data.electiveCourses);
      } catch (error) {
        console.error('Error fetching elective courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseSelection = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleFinalCourseOffering = async () => {
    try {
      const response = await axios.post('/api/final-courses', {
        selectedCourses,
      });
      if (response.status === 200) {
        setMessage('Final Course Offering Successful!');
      } else {
        setMessage('Final Course Offering Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error offering final courses:', error);
      setMessage('Final Course Offering Failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 text-black bg-white">
      <h1 className="text-2xl font-bold mb-4">Final Course Offering</h1>
      {message && <p className="mb-4">{message}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr
              key={course.course_code}
              className="cursor-pointer"
              onClick={() => handleCourseSelection(course)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course)}
                  onChange={() => handleCourseSelection(course)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.course_code}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.course_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.currently_enrolled}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleFinalCourseOffering}
      >
        Offer Final Courses
      </button>
    </div>
  );
};

export default FinalCourseOffering;