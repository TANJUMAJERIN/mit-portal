import { useState, useEffect } from "react";
import axios from "axios";

const TeacherFinalCourseOffer = () => {
	const [session, setSession] = useState("");
	const [semester, setSemester] = useState("");
	const [courses, setCourses] = useState([]);
	const [selectedCourses, setSelectedCourses] = useState(new Set());
	const [success, setSuccess] = useState(false);

	const fetchCourses = async () => {
		try {
			const res = await axios.get(
				"http://localhost:5000/api/finalCourseOffer",
				{
					params: {
						session,
						semester,
					},
				},
			);
			console.log(res.data);
			setCourses(res.data.courses);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCheckboxChange = (courseCode) => {
		setSelectedCourses((prev) => {
			const newSelectedCourses = new Set(prev);
			if (newSelectedCourses.has(courseCode)) {
				newSelectedCourses.delete(courseCode);
			} else {
				newSelectedCourses.add(courseCode);
			}
			return newSelectedCourses;
		});
	};

	const handleSubmit = async () => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/finalCourseOffer",
				{
					session,
					semester,
					selectedCourses: Array.from(selectedCourses),
				},
			);
			fetchCourses();
			setSuccess(true);
		} catch (error) {
			console.log(error);
		} // Refresh the list after submission
	};

	return (
		<div className="container mx-auto p-4">
			<div className="mb-4">
				<label className="block mb-2">Session:</label>
				<input
					type="text"
					value={session}
					onChange={(e) => setSession(e.target.value)}
					className="border p-2 rounded w-full"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2">Semester:</label>
				<select
					value={semester}
					onChange={(e) => setSemester(e.target.value)}
					className="border p-2 rounded w-full"
				>
					<option value="">Select Semester</option>
					<option value="2nd">2nd</option>
					<option value="3rd">3rd</option>
				</select>
			</div>
			<button
				onClick={fetchCourses}
				className="mt-4 p-2 bg-blue-500 text-white rounded"
			>
				Fetch Courses
			</button>
			{courses && courses.length > 0 && !success && (
				<>
					<table className="min-w-full bg-white">
						<thead>
							<tr>
								<th className="w-1/4 py-2">
									<input
										type="checkbox"
										onChange={(e) =>
											setSelectedCourses(
												new Set(
													e.target.checked
														? courses.map((c) => c.coursecode)
														: [],
												),
											)
										}
									/>
								</th>
								<th className="w-1/4 py-2">Course Code</th>
								<th className="w-1/2 py-2">Currently Enrolled</th>
							</tr>
						</thead>
						<tbody>
							{courses.map((course) => (
								<tr key={course.coursecode}>
									<td className="text-center py-2">
										<input
											type="checkbox"
											checked={selectedCourses.has(course.coursecode)}
											onChange={() => handleCheckboxChange(course.coursecode)}
										/>
									</td>
									<td className="text-center py-2">{course.coursecode}</td>
									<td className="text-center py-2">
										{course.currentlyEnrolled}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<button
						onClick={handleSubmit}
						className="mt-4 p-2 bg-blue-500 text-white rounded"
					>
						Submit
					</button>
				</>
			)}
			{success && courses && courses.length > 0 && (
				<table className="min-w-full bg-white">
					<thead>
						<tr>
							<th className="w-1/4 py-2">Course Code</th>
							<th className="w-1/2 py-2">Currently Enrolled</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course) => (
							<tr key={course.coursecode}>
								<td className="text-center py-2">{course.coursecode}</td>
								<td className="text-center py-2">{course.currentlyEnrolled}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default TeacherFinalCourseOffer;
