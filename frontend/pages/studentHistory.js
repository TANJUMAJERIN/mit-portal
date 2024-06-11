// import { useState } from 'react';
// import axios from 'axios';

// const StudentHistory = () => {
<<<<<<< HEAD
//   const [roll, setRoll] = useState('');
//   const [session, setSession] = useState('');
//   const [data, setData] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/history', { roll, session });
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
=======
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
>>>>>>> a28d37c9a0c53908cf27eaf31b6fa1974632eea5
//     }
//   };

//   return (
<<<<<<< HEAD
//     <div className="container mx-auto">
//       <form onSubmit={handleSubmit} className="flex flex-col items-center">
//         <input
//           type="text"
//           placeholder="Enter Roll"
//           value={roll}
//           onChange={(e) => setRoll(e.target.value)}
//           className="mb-4 px-4 py-2 border border-gray-300 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Enter Session"
//           value={session}
//           onChange={(e) => setSession(e.target.value)}
//           className="mb-4 px-4 py-2 border border-gray-300 rounded"
//         />
//         <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//           Submit
//         </button>
//       </form>
//       {data && data.length > 0 ? (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-4">Student History</h2>
//           <table className="w-full border-collapse">
//             <thead>
//               <tr>
//               <th className="border px-4 py-2">Roll</th>
//               <th className="border px-4 py-2">Session</th>
//               <th className="border px-4 py-2">Semester</th>
//                 <th className="border px-4 py-2">Course Code</th>
//                 <th className="border px-4 py-2">Course Name</th>

               

//                 <th className="border px-4 py-2">Marks</th>
//                 <th className="border px-4 py-2">GPA</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((record) => (
//                 <tr key={record.id}>
//                   <td className="border px-4 py-2">{record.student_roll}</td>
//                   <td className="border px-4 py-2">{record.session}</td>
//                   <td className="border px-4 py-2">{record.semester}</td>
//                   <td className="border px-4 py-2">{record.course_code}</td>
//                   <td className="border px-4 py-2">{record.course_name}</td>
                  
//                   <td className="border px-4 py-2">{record.marks}</td>
//                   <td className="border px-4 py-2">{record.gpa}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="mt-8">No data found.</div>
=======
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
>>>>>>> a28d37c9a0c53908cf27eaf31b6fa1974632eea5
//       )}
//     </div>
//   );
// };

// export default StudentHistory;
<<<<<<< HEAD

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
=======
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
>>>>>>> a28d37c9a0c53908cf27eaf31b6fa1974632eea5
    }
  };

  return (
<<<<<<< HEAD
    <div className="container mx-auto min-h-screen bg-sky-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full">
            Submit
          </button>
        </form>
      </div>
      {data && data.length > 0 ? (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Student History</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Roll</th>
                <th className="border px-4 py-2">Session</th>
                <th className="border px-4 py-2">Semester</th>
                <th className="border px-4 py-2">Course Code</th>
                <th className="border px-4 py-2">Course Name</th>
                <th className="border px-4 py-2">Marks</th>
                <th className="border px-4 py-2">GPA</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record) => (
                <tr key={record.id}>
                  <td className="border px-4 py-2">{record.student_roll}</td>
                  <td className="border px-4 py-2">{record.session}</td>
                  <td className="border px-4 py-2">{record.semester}</td>
                  <td className="border px-4 py-2">{record.course_code}</td>
                  <td className="border px-4 py-2">{record.course_name}</td>
                  <td className="border px-4 py-2">{record.marks}</td>
                  <td className="border px-4 py-2">{record.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 text-center">No data found.</div>
      )}
    </div>
  );
};

export default StudentHistory;
=======
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
>>>>>>> a28d37c9a0c53908cf27eaf31b6fa1974632eea5
