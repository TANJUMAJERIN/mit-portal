import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function FinalCourseSelection() {
	const [session, setSession] = useState("");
	const [semester, setSemester] = useState("");
	const [courses, setCourses] = useState([]);
	const [selectedCourses, setSelectedCourses] = useState([]);
	const [success, setSuccess] = useState(false);

	const { data: currentUser, status } = useSession();

	const fetchCourses = async () => {
		const roll = currentUser.user.roll;

		try {
			const response = await axios.post(
				"http://localhost:5000/api/final-course-selection",
				{
					roll,
					session,
					semester,
				},
			);
			console.log(response.data); // Log the response data
			setCourses(response.data.courses);
		} catch (error) {
			console.error("Error fetching courses:", error);
		}
	};

	const handleCourseSelection = (course_code) => {
		if (selectedCourses.includes(course_code)) {
			setSelectedCourses(
				selectedCourses.filter((code) => code !== course_code),
			);
		} else {
			setSelectedCourses([...selectedCourses, course_code]);
		}
	};

	const handleSubmit = async () => {
		if (selectedCourses.length < 2) {
			alert("Please select at least two course.");
			return;
		}

		if (selectedCourses.length > 4) {
			alert("Please select at most four courses.");
			return;
		}
		alert("Enrolled Successfully");
		setSelectedCourses([]);
		setSuccess(true);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Final Course Selection</h1>

			<div className="mb-4">
				<label className="block mb-2">Semester</label>
				<select
					value={semester}
					onChange={(e) => setSemester(e.target.value)}
					className="p-2 border rounded"
				>
					<option value="">Select Semester</option>
					<option value="1st">1st Semester</option>
					<option value="2nd">2nd Semester</option>
					<option value="3rd">3rd Semester</option>
				</select>
			</div>

			<div className="mb-4">
				<label className="block mb-2">Session</label>
				<input
					type="text"
					value={session}
					onChange={(e) => setSession(e.target.value)}
					className="p-2 border rounded"
				/>
			</div>

			<button
				type="button"
				onClick={fetchCourses}
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				Fetch Courses
			</button>

			{!success && courses && courses.length > 0 && (
				<div className="mt-4">
					<h2 className="text-xl font-bold mb-2">Available Courses</h2>
					<table className="table-auto w-full border">
						<thead>
							<tr>
								<th className="border px-4 py-2">Select</th>
								<th className="border px-4 py-2">Course Code</th>
								<th className="border px-4 py-2">Course Name</th>
								<th className="border px-4 py-2">Type</th>
							</tr>
						</thead>
						<tbody>
							{courses.map((course) => (
								<tr key={course.coursecode}>
									<td className="border px-4 py-2">
										<input
											type="checkbox"
											checked={selectedCourses.includes(course.coursecode)}
											onChange={() => handleCourseSelection(course.coursecode)}
										/>
									</td>
									<td className="border px-4 py-2">{course.coursecode}</td>
									<td className="border px-4 py-2">{course.coursename}</td>
									<td className="border px-4 py-2">{course.type}</td>
								</tr>
							))}
						</tbody>
					</table>

					<button
						type="button"
						onClick={handleSubmit}
						className="bg-green-500 text-white px-4 py-2 rounded mt-4"
					>
						Submit Selection
					</button>
				</div>
			)}
			{success && courses && courses.length > 0 && (
				<table className="min-w-full bg-white mt-16">
					<thead>
						<tr>
							<th className="border px-4 py-2 text-left">
								Enrolled Course Code
							</th>
							<th className="border px-4 py-2 text-left">
								Enrolled Course Name
							</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course) => (
							<tr key={course.coursecode}>
								<td className="border px-4 py-2">{course.coursecode}</td>
								<td className="border px-4 py-2">{course.coursename}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
