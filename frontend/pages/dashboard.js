import { useState, useEffect } from 'react';
import Image from 'next/image';
import profilePicture from '../public/profile-picture.jpg';
import axios from '@/libs/axios';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const registrationNumber = '202401'; // Replace with the actual registration number
      //const response = await axios.get(/dashboard?registrationNumber=${registrationNumber});
       const response = await axios.get(`/dashboard?reg=${registrationNumber}`);
      //const response = await axios.get(`/dashboard?registrationNumber=${registrationNumber}`);



      const data = response.data;
      console.log(data);

      setUserData(data.userData);
      setNotices(data.notices);
      
      
      // alert("userdata",userData);
      // alert("notices",notices);
      setError(null); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
    }
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="flex items-center mb-4">
          <Image
            src={profilePicture}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{userData.name}</h3>
            <p className="text-sm text-gray-400">{userData.email}</p>
          </div>
        </div>
        <nav>
          <ul className="space-y-2">
            <li className="bg-gray-700 rounded p-2 cursor-pointer">
              Personal Info
            </li>
            <li className="bg-gray-700 rounded p-2 cursor-pointer">Notices</li>
          </ul>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome, {userData.name}!</h1>
          <p className="text-gray-600">
            Here's your personal dashboard with important information and notices.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Name</h3>
              <p className="text-gray-600">{userData.name}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Student ID</h3>
              <p className="text-gray-600">{userData.studentId}</p>
            </div>
          </div>
          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Update Profile
          </button>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Notices</h2>
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{notice.title}</h3>
                <p className="text-gray-600">{notice.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 
  

//   return (
//     <div className="flex h-screen">
//       <div className="w-64 bg-gray-800 text-white p-4">
//         <div className="flex items-center mb-4">
//           <Image
//             src={profilePicture}
//             alt="Profile Picture"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           <div className="ml-4">
//             <h3 className="text-lg font-semibold">{userData.name}</h3>
//             <p className="text-sm text-gray-400">{userData.email}</p>
//           </div>
//         </div>
//         <nav>
//           <ul className="space-y-2">
//             <li className="bg-gray-700 rounded p-2 cursor-pointer">
//               Personal Info
//             </li>
//             <li className="bg-gray-700 rounded p-2 cursor-pointer">Notices</li>
//           </ul>
//         </nav>
//       </div>

//       <div className="flex-1 p-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-4">Welcome, {userData.name}!</h1>
//           <p className="text-gray-600">
//             Here's your personal dashboard with important information and notices.
//           </p>
//           {error && <p className="text-red-500">{error}</p>} 
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Name</h3>
//               <p className="text-gray-600">{userData.name}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Email</h3>
//               <p className="text-gray-600">{userData.email}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Registration Number</h3>
//               <p className="text-gray-600">{userData.registration_number}</p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-semibold mb-4">Notices</h2>
//           <div className="space-y-4">
//             {notices.map((notice, index) => (
//               <div key={index} className="bg-gray-100 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold">{notice.title}</h3>
//                 <p className="text-gray-600">{notice.description}</p>
//                 <p className="text-gray-500">Created at: {notice.created_at}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;