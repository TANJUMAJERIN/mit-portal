// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// exports.initialCourseSelection = async (req, res) => {
//   const { roll, session, semester } = req.body;

//   try {
//     let courses;

//     if (semester === "1st") {
//       courses = await prisma.course.findMany({
//         take: 4
//       });
//     } else {
//       const passedCourses = await prisma.marksheetData.findMany({
//         where: {
//           student_roll: roll,
//           gpa: {
//             gt: 0
//           }
//         },
//         select: {
//           coursecode: true
//         }
//       });

//       const passedCourseCodes = passedCourses.map(c => c.coursecode);

//       courses = await prisma.course.findMany({
//         where: {
//           coursecode: {
//             notIn: passedCourseCodes
//           }
//         }
//       });
//     }

//     res.json({ courses });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while fetching courses." });
//   }
// };

// exports.submitCourseSelection = async (req, res) => {
//   const { roll, session, semester, selectedCourses } = req.body;

//   try {
//     for (const coursecode of selectedCourses) {
//       await prisma.courseEnrollment.create({
//         data: {
//           roll,
//           session,
//           semester,
//           coursecode
//         }
//       });

//       await prisma.selectedCourse.update({
//         where: { coursecode },
//         data: {
//           currentlyEnrolled: {
//             increment: 1
//           }
//         }
//       });
//     }

//     res.status(200).json({ message: "Courses successfully enrolled." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while enrolling in courses." });
//   }
// };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.initialCourseSelection = async (req, res) => {
  const { roll, session, semester } = req.body;

  try {
    let courses;

    if (semester === "1st") {
      courses = await prisma.course.findMany({
        take: 4
      });
    } else {
      const passedCourses = await prisma.marksheetData.findMany({
        where: {
          student_roll: roll,
          gpa: {
            gt: 0
          }
        },
        select: {
          coursecode: true
        }
      });

      const passedCourseCodes = passedCourses.map(c => c.coursecode);

      courses = await prisma.course.findMany({
        where: {
          coursecode: {
            notIn: passedCourseCodes
          }
        }
      });
    }

    res.json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching courses." });
  }
};

exports.submitCourseSelection = async (req, res) => {
  const { roll, session, semester, selectedCourses } = req.body;

  try {
    for (const coursecode of selectedCourses) {
      await prisma.courseEnrollment.create({
        data: {
          roll,
          session,
          semester,
          coursecode
        }
      });

      await prisma.selectedCourse.update({
        where: { coursecode },
        data: {
          currentlyEnrolled: {
            increment: 1
          }
        }
      });
    }

    res.status(200).json({ message: "Courses successfully enrolled." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while enrolling in courses." });
  }
};
