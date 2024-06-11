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

// const express = require('express');
// const cors = require('cors')
// const app = express()

// const enrollStudentRoutes = require('./routes/enroll_student_data');

// app.use(cors())
// app.use(express.json());

// // Mount the enrollment routes
// app.use('/enroll', enrollStudentRoutes);

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });
///backend server.js //result upload code
// const express = require('express');
// const multer = require('multer');
// const xlsx = require('xlsx');
// const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.use(cors());
// app.use(express.json());

// app.post('/api/upload', upload.single('file'), async (req, res) => {
//   const { courseCode, courseName, semester, session } = req.body;
//   const file = req.file;

//   if (!file) {
//     console.error('No file uploaded');
//     return res.status(400).send('No file uploaded');
//   }

//   try {
//     console.log('Reading uploaded file:', file.path);
//     const workbook = xlsx.readFile(file.path);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(sheet);

//     console.log('Data extracted from file:', data);

//     for (const row of data) {
//       const { roll, marks } = row;

//       // Add logging to verify row structure
//       console.log('Processing row:', row);

//       // Validate required fields
//       if (!roll || marks === undefined) {
//         console.error('Missing required field:', { roll, marks });
//         continue; // Skip invalid row
//       }

//       const gpa = calculateGPA(marks);
//       console.log(`Inserting data for roll: ${roll}, marks: ${marks}, gpa: ${gpa}`);

//       // Check for duplicate
//       const existingRecord = await prisma.marksheetData.findFirst({
//         where: {
//           student_roll: roll.toString(),
//           course_code: courseCode,
//           semester: semester,
//           session: session,
//         },
//       });

//       if (existingRecord) {
//         console.log(`Duplicate found for roll: ${roll}, skipping insertion.`);
//         continue; // Skip the duplicate record
//       }

//       await prisma.marksheetData.create({
//         data: {
//           student_roll: roll.toString(), // Convert roll to string
//           course_code: courseCode,
//           course_name: courseName,
//           semester: semester,
//           session: session,
//           marks: marks,
//           gpa: gpa,
//         },
//       });
//     }
//     res.status(200).send('Data uploaded successfully');
//   } catch (error) {
//     console.error('Error processing file:', error.message);
//     res.status(500).send('Server error: ' + error.message);
//   }
// });

// const calculateGPA = (marks) => {
//   if (marks >= 80) return 4.00;
//   if (marks >= 75) return 3.75;
//   if (marks >= 70) return 3.50;
//   if (marks >= 65) return 3.25;
//   if (marks >= 60) return 3.00;
//   if (marks >= 55) return 2.75;
//   if (marks >= 50) return 2.50;
//   if (marks >= 45) return 2.25;
//   if (marks >= 40) return 2.00;
//   return 0.00;
// };

// app.listen(4000, () => {
//   console.log('Server is running on port 4000');
// });
////////////////maksheet r server.js start///////////
// const express = require('express');
// const cors = require('cors');
// const uploadRoutes = require('./routes/uploadRoutes');
// const viewResultRoutes = require('./routes/viewResultRoutes');

// const app = express();
// const port = 5000;

// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());

// app.use('/api', uploadRoutes);
// app.use('/api', viewResultRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
///////////////marksheet  r server.js end/////////////
/////////////course servern startr/////////
// const express = require('express');
// const cors = require('cors');
// const courseRoutes = require('./routes/courseRoutes');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// app.use("/api", courseRoutes);

// app.listen(PORT, () => {
// 	console.log(`Server is running on http://localhost:${PORT}`);
// });

//////////////////////cute final start//////////
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const noticesRouter = require('./routes/notices');
const uploadRoutes = require('./routes/uploadRoutes');
const viewResultRoutes = require('./routes/viewResultRoutes');
const enroll_student_data = require('./routes/enroll_student_data');
const courseRoutes = require('./routes/courseRoutes');
const uploadStudentListRoutes = require('./routes/uploadStudentList');
const paymentSlipRoutes = require('./routes/paymentSlip'); 
const historyRouter = require('./routes/history');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api', viewResultRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notices', noticesRouter);
app.use('/api',enroll_student_data);
app.use("/api", courseRoutes);
app.use('/api', paymentSlipRoutes);
app.use('/api', uploadStudentListRoutes);
app.use('/api', historyRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

///////////////////cute final end////////////////////


//payment check
//const express = require('express');
// const cors = require('cors');
// const paymentSlipRoutes = require('./routes/paymentSlip'); // Ensure correct path

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());
// app.use('/api', paymentSlipRoutes);

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
