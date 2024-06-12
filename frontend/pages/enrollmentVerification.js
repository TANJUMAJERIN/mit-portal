import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnrollmentVerification = () => {
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  const fetchEnrolledStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/enrollments');
      setEnrolledStudents(response.data);
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleSaveStudent = async () => {
    try {
      const { registration_number, email, session, name } = selectedStudent;
      if (registration_number && email && session && name) {
        await axios.post('http://localhost:5000/api/students', selectedStudent);
        console.log('Student saved successfully');
        // Optionally, reset the selected student or perform additional operations
        setSelectedStudent(null);
      } else {
        console.error('Selected student does not have all required fields.');
      }
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  // const handleSaveStudent = async () => {
  //   try {
  //     const { id, registration_number, email, session, name } = selectedStudent;
  //     if (id && registration_number && email && session && name) {
  //       await axios.post('http://localhost:5000/api/students', selectedStudent);
  //       console.log('Student saved successfully');
  //       setSelectedStudent(null);
  //       fetchEnrolledStudents(); // Refresh the enrolled students list
  //     } else {
  //       console.error('Selected student does not have all required fields.');
  //     }
  //   } catch (error) {
  //     console.error('Error saving student:', error);
  //   }
  // };
  

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Enrollment Verification</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Registration Number</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Session</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {enrolledStudents.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.registration_number}</td>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">{student.session}</td>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleSelectStudent(student)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Selected Student</h2>
          <p>Registration Number: {selectedStudent.registration_number}</p>
          <p>Email: {selectedStudent.email}</p>
          <p>Session: {selectedStudent.session}</p>
          <p>Name: {selectedStudent.name}</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleSaveStudent}
          >
            Save Student
          </button>
        </div>
      )}
    </div>
  );
};

export default EnrollmentVerification;
