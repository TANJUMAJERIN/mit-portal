<<<<<<< HEAD
// import { useState } from "react";
// import axios from "../libs/axios";

// export default function UploadEnrollment() {
//   const [file, setFile] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted");
//     const formData = new FormData();
//     formData.append("file", file);

//     console.log("FormData prepared", formData);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/uploadStudentList",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Response received", response.data);
//       alert(response.data);
//     } catch (error) {
//       console.error(
//         "Error uploading data:",
//         error.response ? error.response.data : error.message
//       );
//       alert(
//         `Upload failed: ${error.response ? error.response.data : error.message}`
//       );
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Upload Enrollment Data</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label>Excel File:</label>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="border p-2 w-full"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Upload Enrollment Data
//         </button>
//       </form>
//     </div>
//   );
// }
=======
>>>>>>> a28d37c9a0c53908cf27eaf31b6fa1974632eea5
import { useState } from "react";
import axios from "../libs/axios";

export default function UploadEnrollment() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const formData = new FormData();
    formData.append("file", file);

    console.log("FormData prepared", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/uploadStudentList",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response received", response.data);
      alert(response.data);
    } catch (error) {
      console.error(
        "Error uploading data:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Upload failed: ${error.response ? error.response.data : error.message}`
      );
    }
  };

  return (
<<<<<<< HEAD
    <div className="container mx-auto min-h-screen bg-sky-100 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Upload Students Data
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Excel File:</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="border p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Upload Enrollment Data
          </button>
        </form>
      </div>
=======
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Enrollment Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Excel File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Upload Enrollment Data
        </button>
      </form>
>>>>>>> a28d37c9a0c53908cf27eaf31b6fa1974632eea5
    </div>
  );
}
