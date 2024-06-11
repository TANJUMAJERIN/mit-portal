// import { useState } from 'react';
// import axios from 'axios';

// const StudentHistory = () => {
//   const [registrationNumber, setRegistrationNumber] = useState('');
//   const [session, setSession] = useState('');
//   const [historyData, setHistoryData] = useState(null);

//   const fetchHistory = async () => {
//     try {
//       const response = await axios.get(`/api/studentHistory/${registrationNumber}/${session}`);
//       setHistoryData(response.data);
//     } catch (error) {
//       console.error('Error fetching student history:', error);
//       setHistoryData(null);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Student History</h1>
//       <div className="mb-4">
//         <label className="block mb-2">Registration Number:</label>
//         <input
//           type="text"
//           value={registrationNumber}
//           onChange={(e) => setRegistrationNumber(e.target.value)}
//           className="border p-2 w-full"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Session:</label>
//         <input
//           type="text"
//           value={session}
//           onChange={(e) => setSession(e.target.value)}
//           className="border p-2 w-full"
//         />
//       </div>
//       <button onClick={fetchHistory} className="bg-blue-500 text-white py-2 px-4 rounded">Fetch History</button>

//       {historyData && (
//         <div className="mt-8">
//           <div className="mb-4">
//             <h2 className="text-xl font-bold">Student Details</h2>
//             <p><strong>Name:</strong> {historyData.student.name}</p>
//             <p><strong>Email:</strong> {historyData.student.email}</p>
//             <p><strong>Registration Number:</strong> {historyData.student.registration_number}</p>
//             <p><strong>Session:</strong> {historyData.student.session}</p>
//           </div>
//           <div className="mb-4">
//             <h2 className="text-xl font-bold">Enrolled Courses</h2>
//             <table className="min-w-full border-collapse border">
//               <thead>
//                 <tr>
//                   <th className="border p-2">Course Code</th>
//                   <th className="border p-2">Course Name</th>
//                   <th className="border p-2">Course Type</th>
//                   <th className="border p-2">Semester</th>
//                   <th className="border p-2">Session</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {historyData.enrollments.map((enrollment) => (
//                   <tr key={enrollment.id}>
//                     <td className="border p-2">{enrollment.coursecode}</td>
//                     <td className="border p-2">{enrollment.course.coursename}</td>
//                     <td className="border p-2">{enrollment.type}</td>
//                     <td className="border p-2">{enrollment.semester}</td>
//                     <td className="border p-2">{enrollment.session}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mb-4">
//             <h2 className="text-xl font-bold">Results</h2>
//             <table className="min-w-full border-collapse border">
//               <thead>
//                 <tr>
//                   <th className="border p-2">Course Code</th>
//                   <th className="border p-2">Course Name</th>
//                   <th className="border p-2">Marks</th>
//                   <th className="border p-2">GPA</th>
//                   <th className="border p-2">Semester</th>
//                   <th className="border p-2">Session</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {historyData.results.map((result) => (
//                   <tr key={result.id}>
//                     <td className="border p-2">{result.course_code}</td>
//                     <td className="border p-2">{result.course_name}</td>
//                     <td className="border p-2">{result.marks}</td>
//                     <td className="border p-2">{result.gpa}</td>
//                     <td className="border p-2">{result.semester}</td>
//                     <td className="border p-2">{result.session}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentHistory;
import { useState } from 'react';
import axios from 'axios';

export default function StudentHistory() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [session, setSession] = useState('');
  const [historyData, setHistoryData] = useState(null);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`/api/studentHistory/${registrationNumber}/${session}`);
      setHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching student history:', error);
      alert('Failed to fetch student history');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student History</h1>
      <div className="mb-4">
        <label className="block mb-2">Registration Number:</label>
        <input
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Session:</label>
        <input
          type="text"
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <button onClick={fetchHistory} className="bg-blue-500 text-white p-2 rounded">Fetch History</button>

      {historyData && (
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Student Details</h2>
            <p><strong>Name:</strong> {historyData.student.name}</p>
            <p><strong>Email:</strong> {historyData.student.email}</p>
            <p><strong>Registration Number:</strong> {historyData.student.registration_number}</p>
            <p><strong>Session:</strong> {historyData.student.session}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Enrolled Courses</h2>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr>
                  <th className="border p-2">Course Code</th>
                  <th className="border p-2">Course Name</th>
                  <th className="border p-2">Course Type</th>
                  <th className="border p-2">Semester</th>
                  <th className="border p-2">Session</th>
                </tr>
              </thead>
              <tbody>
                {historyData.enrollments.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td className="border p-2">{enrollment.coursecode}</td>
                    <td className="border p-2">{enrollment.course.coursename}</td>
                    <td className="border p-2">{enrollment.type}</td>
                    <td className="border p-2">{enrollment.semester}</td>
                    <td className="border p-2">{enrollment.session}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Results</h2>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr>
                  <th className="border p-2">Course Code</th>
                  <th className="border p-2">Course Name</th>
                  <th className="border p-2">Marks</th>
                  <th className="border p-2">GPA</th>
                  <th className="border p-2">Semester</th>
                  <th className="border p-2">Session</th>
                </tr>
              </thead>
              <tbody>
                {historyData.results.map((result) => (
                  <tr key={result.id}>
                    <td className="border p-2">{result.course_code}</td>
                    <td className="border p-2">{result.course_name}</td>
                    <td className="border p-2">{result.marks}</td>
                    <td className="border p-2">{result.gpa}</td>
                    <td className="border p-2">{result.semester}</td>
                    <td className="border p-2">{result.session}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
