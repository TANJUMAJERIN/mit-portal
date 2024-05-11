// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MySQL connection setup
// const connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '',
//   database: 'student_database'
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database');
// });

// // Endpoint to add a new student
// app.post('/addStudent', (req, res) => {
//   const { registration_number, email, password, name } = req.body;
//   const insertQuery = 'INSERT INTO students (registration_number, email, password, name) VALUES (?, ?, ?, ?)';
//   connection.query(insertQuery, [registration_number, email, password, name], (err, result) => {
//     if (err) {
//       console.error('Error inserting student:', err);
//       res.status(500).json({ error: 'Error inserting student' });
//     } else {
//       console.log('Student inserted successfully');
//       res.status(200).json({ message: 'Student inserted successfully' });
//     }
//   });
// });

// // Login route
// app.post('/login', (req, res) => {
//   const { email, registrationNo, password } = req.body;

//   let query = 'SELECT * FROM students WHERE email = ? AND password = ?';
//   let values = [email, password];

//   if (!registrationNo) {
//     query = `
//       SELECT * FROM (
//         SELECT 'student' AS type, * FROM students WHERE email = ? AND password = ?
//         UNION
//         SELECT 'teacher' AS type, * FROM teachers WHERE email = ? AND password = ?
//         UNION
//         SELECT 'staff' AS type, * FROM staffs WHERE email = ? AND password = ?
//       ) AS combined_table
//     `;
//     values = [email, password, email, password, email, password];
//   } else {
//     query = 'SELECT * FROM students WHERE email = ? AND password = ? AND registration_no = ?';
//     values = [email, password, registrationNo];
//   }

//   connection.query(query, values, (err, result) => {
//     if (err) {
//       console.error('Error executing SQL query: ', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }

//     if (result.length === 0) {
//       res.status(401).json({ error: 'Invalid credentials' });
//       return;
//     }

//     const userData = result[0];
//     delete userData.password;

//     res.status(200).json({ success: true, userData });
//   });
// });

// // Get student data and notices
// app.get('/dashboard', (req, res) => {
//   const registrationNumber = req.query.reg;
//   console.log('Registration number received:', registrationNumber);

//   const studentQuery = `SELECT name, email, registration_number FROM students WHERE registration_number = ?`;
//   const noticeQuery = `SELECT title, description, created_at FROM notices`;

//   connection.query(studentQuery, [registrationNumber], (err, studentResult) => {
//     if (err) {
//       console.error('Error fetching student data:', err);
//       res.status(500).json({ error: 'Error fetching student data' });
//     } else {
//       if (studentResult.length > 0) {
//         const studentData = studentResult[0];
//         connection.query(noticeQuery, (err, noticeResult) => {
//           if (err) {
//             console.error('Error fetching notices:', err);
//             res.status(500).json({ error: 'Error fetching notices' });
//           } else {
//             res.json({ userData: studentData, notices: noticeResult });
//           }
//         });
//       } else {
//         res.status(404).json({ error: 'Student not found' });
//       }
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const app = express();
const enrollStudentRoutes = require('./routes/enroll_student_data');

app.use(express.json());

// Mount the enrollment routes
app.use('/enroll', enrollStudentRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 3000');
});