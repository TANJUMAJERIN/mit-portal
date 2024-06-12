import { useState } from 'react';
import axios from 'axios';

export default function TeacherCourseOffer() {
  const [session, setSession] = useState('');
  const [semester, setSemester] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleFetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses/${semester}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleOfferCourse = async (e) => {
    e.preventDefault();
    try {
      for (const coursecode of selectedCourses) {
        await axios.post('http://localhost:5000/api/offerCourse', {
          session,
          semester,
          coursecode,
        });
      }
      alert('Courses offered successfully');
    } catch (error) {
      console.error('Error offering course:', error);
      alert(error.response?.data?.message || 'Failed to offer course');
    }
  };

  const handleCheckboxChange = (coursecode) => {
    setSelectedCourses((prev) =>
      prev.includes(coursecode)
        ? prev.filter((code) => code !== coursecode)
        : [...prev, coursecode]
    );
  };

  return (
    <div className="container mx-auto min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mb-8">
        <form onSubmit={handleOfferCourse} className="flex flex-col items-center">
          <label className="w-full mb-2 text-left text-gray-700">Session:</label>
          <input
            type="text"
            placeholder="Enter Session"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
          />
          <label className="w-full mb-2 text-left text-gray-700">Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select Semester</option>
            
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
          </select>
          <button type="button" onClick={handleFetchCourses} className="px-4 py-2 bg-blue-500 text-white rounded w-full mb-4">
            Fetch Courses
          </button>
          {courses.length > 0 && (
            <div className="w-full">
              <h3 className="text-xl mb-4">Available Courses</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Course Code</th>
                    <th className="border px-4 py-2">Course Name</th>
                    <th className="border px-4 py-2">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.coursecode}>
                      <td className="border px-4 py-2">{course.coursecode}</td>
                      <td className="border px-4 py-2">{course.coursename}</td>
                      <td className="border px-4 py-2">
                        <input
                          type="checkbox"
                          value={course.coursecode}
                          onChange={() => handleCheckboxChange(course.coursecode)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full mt-4">
                Offer Selected Courses
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
