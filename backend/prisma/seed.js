const prisma = require("./prismaClient");

const main = async () => {
	const courses = [
		{
			coursecode: "MITM 303",
			coursename: "Advanced Computer Networks & Internetworking",
			type: "Major",
			credit: 3,
		},
		{
			coursecode: "MITM 304",
			coursename: "Database Architecture and Administration",
			type: "Major",
			credit: 3,
		},
		{
			coursecode: "MITM 310",
			coursename: "Advanced Data Structures and Algorithms",
			type: "Major",
			credit: 3,
		},
		{
			coursecode: "MITM 311",
			coursename: "Advanced Object-Oriented Programming",
			type: "Major",
			credit: 3,
		},
		{
			coursecode: "MITM 301",
			coursename: "IT Project Management",
			type: "Major",
			credit: 3,
		},
		{
			coursecode: "MITM 305",
			coursename: "Web Technology and Internet Computing",
			type: "Major",
			credit: 3,
		},
		{
			coursecode: "MITM 421",
			coursename: "Project for MIT/Internship",
			type: "Major",
			credit: 6,
		},
		{
			coursecode: "MITE 436",
			coursename: "Artificial Intelligence",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 430",
			coursename: "Machine Learning",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 437",
			coursename: "Data Mining",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 431",
			coursename: "Big Data Analytic",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 432",
			coursename: "Cryptography and Security Mechanisms",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 442",
			coursename: "Network Security",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 438",
			coursename: "Secured Software System",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 433",
			coursename: "Cyber Security",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 434",
			coursename: "Software Quality Assurance and Testing",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 439",
			coursename: "Software Requirements Engineering and Design",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 435",
			coursename: "Software Maintenance and Analytics",
			type: "Elective",
			credit: 3,
		},
		{
			coursecode: "MITE 441",
			coursename: "Software Design Pattern",
			type: "Elective",
			credit: 3,
		},
	];

	for (const course of courses) {
		await prisma.course.create({
			data: course,
		});
	}

	console.log("Courses seeded successfully");

	const students = [
		{
			registration_number: "1312",
			name: "Tanjuma Tabassum",
			email: "bsse1312@iit.du.ac.bd",
			session: "2020-21",
			role: "student",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
		},
		{
			registration_number: "1301",
			name: "Shifa Jahan",
			email: "bsse1301@iit.du.ac.bd",
			session: "2020-21",
			role: "student",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
		},
		{
			registration_number: "1305",
			name: "Faria Akter",
			email: "bsse1305@iit.du.ac.bd",
			session: "2020-21",
			role: "student",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
		},
	];

	for (const student of students) {
		await prisma.student.create({
			data: student,
		});
	}

	console.log("Students seeded successfully");

	const staffs = [
		{
			email: "salim@iit.du.ac.bd",
			name: "Md. Salim",
			Password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
			role: "staff",
		},
	];

	for (const staff of staffs) {
		await prisma.staff.create({
			data: staff,
		});
	}

	console.log("Staffs seeded successfully");

	const teachers = [
		{
			email: "naushin@iit.du.ac.bd",
			name: "Dr. Naushin Nower",
			designation: "Professor",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
			role: "Course Coordinator",
		},
		{
			email: "toukir@iit.du.ac.bd",
			name: "Toukir Ahmed",
			designation: "Leacturer",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
			role: "Course Teacher",
		},
	];

	for (const teacher of teachers) {
		await prisma.teacher.create({
			data: teacher,
		});
	}

	console.log("Teachers seeded successfully");

	const user = [
		{
			email: "salim@iit.du.ac.bd",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
			role: "staff",
		},
		{
			email: "bsse1312@iit.du.ac.bd",
			role: "student",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
		},
		{
			email: "bsse1301@iit.du.ac.bd",
			role: "student",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
		},
		{
			email: "bsse1305@iit.du.ac.bd",
			role: "student",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
		},
		{
			email: "naushin@iit.du.ac.bd",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
			role: "teacher",
		},
		{
			email: "toukir@iit.du.ac.bd",
			password: "$2y$10$UM851DbJi9iMHKvRLySDBuCNdE3SITdaAkPB4y4TzaYbCt2JGbIoi",
			role: "teacher",
		},
	];

	for (const u of user) {
		await prisma.user.create({
			data: u,
		});
	}

	console.log("Users seeded successfully");
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
