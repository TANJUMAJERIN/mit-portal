const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.initialCourseSelection = async (req, res) => {
	const { roll, session, semester } = req.body;
	console.log(roll);

	try {
		let courses;
		const availableCourses = [];

		if (semester === "1st") {
			courses = await prisma.course.findMany({
				where: {
					coursecode: {
						startsWith: "MITM 30",
					},
				},
			});
			for (const course of courses) {
				const passed = await prisma.marksheetdata.findMany({
					where: {
						course_code: course.coursecode,
						student_roll: roll,
						gpa: {
							gte: 2.0,
						},
					},
				});

				if (passed.length === 0) {
					availableCourses.push(course);
				}
			}
			console.log(availableCourses);
			res.json({ courses: availableCourses });
		} else {
			const passedCourses = await prisma.marksheetdata.findMany({
				where: {
					student_roll: roll,
					gpa: {
						gte: 2.0,
					},
				},
				select: {
					course_code: true,
				},
			});

			const passedCourseCodes = passedCourses.map((c) => c.course_code);

			if (passedCourseCodes === undefined || passedCourseCodes.length === 0) {
				courses = await prisma.course.findMany({});
			} else {
				courses = await prisma.course.findMany({
					where: {
						coursecode: {
							notIn: passedCourseCodes,
						},
					},
				});
			}
			res.json({ courses });
		}
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while fetching courses." });
	}
};

exports.submitCourseSelection = async (req, res) => {
	const { roll, session, semester, selectedCourses } = req.body;

	console.log(roll, session, semester, selectedCourses);

	try {
		for (const coursecode of selectedCourses) {
			const type = coursecode.startsWith("MITM") ? "Major" : "Elective";
			await prisma.courseenrollment.create({
				data: {
					// roll,
					// coursecode,
					type,
					semester,
					session,
					student: {
						connect: {
							registration_number: roll,
						},
					},
					course: {
						connect: {
							coursecode: coursecode,
						},
					},
				},
			});

			const course = await prisma.selectedcourse.findMany({
				where: { coursecode: coursecode, semester: semester, session: session },
			});

			if (course && course.length > 0) {
				await prisma.selectedcourse.updateMany({
					where: {
						coursecode: coursecode,
						semester: semester,
						session: session,
					},
					data: {
						currentlyEnrolled: {
							increment: 1,
						},
					},
				});
			} else {
				await prisma.selectedcourse.create({
					data: {
						coursecode,
						semester,
						session,
						currentlyEnrolled: 1,
					},
				});
			}

			console.log(course);
		}

		res.status(200).json({ message: "Courses successfully enrolled." });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while enrolling in courses." });
	}
};
