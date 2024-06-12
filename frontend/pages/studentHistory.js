
import { useState } from 'react';
import axios from 'axios';

const StudentHistory = () => {
  const [roll, setRoll] = useState('');
  const [session, setSession] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/history', { roll, session });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label className="w-full mb-2 text-left text-gray-700">Registration No:</label>
          <input
            type="text"
            placeholder="Enter Roll"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
          />
          <label className="w-full mb-2 text-left text-gray-700">Session:</label>
          <input
            type="text"
            placeholder="20XX-XX"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded w-full"
          />
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded w-full hover:bg-indigo-700 transition-colors duration-300">
            Submit
          </button>
        </form>
      </div>
      {data ? (
        <div className="mt-8 w-full max-w-4xl">
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Student Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong className="text-gray-600">Registration Number:</strong> {data.student.registration_number}
              </div>
              <div>
                <strong className="text-gray-600">Name:</strong> {data.student.name || 'N/A'}
              </div>
              <div>
                <strong className="text-gray-600">Email:</strong> {data.student.email}
              </div>
              <div>
                <strong className="text-gray-600">Session:</strong> {data.student.session}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Enrolled Course List</h2>
          <table className="w-full border-collapse table-auto mb-8">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Course Code</th>
                <th className="border border-gray-400 px-4 py-2">Course Name</th>
                <th className="border border-gray-400 px-4 py-2">Course Type</th>
                <th className="border border-gray-400 px-4 py-2">Semester</th>
                <th className="border border-gray-400 px-4 py-2">Session</th>
              </tr>
            </thead>
            <tbody>
              {data.enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="even:bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                  <td className="border border-gray-300 px-4 py-2">{enrollment.coursecode}</td>
                  <td className="border border-gray-300 px-4 py-2">{enrollment.course.coursename}</td>
                  <td className="border border-gray-300 px-4 py-2">{enrollment.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{enrollment.semester}</td>
                  <td className="border border-gray-300 px-4 py-2">{enrollment.session}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Marksheet</h2>
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Roll</th>
                <th className="border border-gray-400 px-4 py-2">Session</th>
                <th className="border border-gray-400 px-4 py-2">Semester</th>
                <th className="border border-gray-400 px-4 py-2">Course Code</th>
                <th className="border border-gray-400 px-4 py-2">Course Name</th>
                <th className="border border-gray-400 px-4 py-2">Marks</th>
                <th className="border border-gray-400 px-4 py-2">GPA</th>
              </tr>
            </thead>
            <tbody>
              {data.marksheet.map((record) => (
                <tr key={record.id} className="even:bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                  <td className="border border-gray-300 px-4 py-2">{record.student_roll}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.session}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.semester}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.course_code}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.course_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.marks}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-600">No data found.</div>
      )}
    </div>
  );
};

export default StudentHistory;