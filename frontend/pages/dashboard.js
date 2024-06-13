

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react'

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (session && status === 'authenticated') {
      fetchData();
    }
  }, [session, status]);

  const fetchData = async () => {
  console.log(session.user)
    try {
      const response = await axios.get(`http://localhost:5000/api/dashboard`, {
        params: {
          email: session.user.email,
          role: session.user.role
        }
      });
      setUserData(response.data.userData);
      setError(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data. Please try again later.');
    }
  };

  const fetchNotices = async () => {
    console.log('here')
    try {
      const token = session.user.token;
      const response = await axios.get(`http://localhost:5000/api/notices`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotices(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching notices:', error);
      setError('Error fetching notices. Please try again later.');
    }
  };

  const navigateToUploadResult = () => {
    router.push('/uploadResult');
  };

  const navigateToViewResult = () => {
    router.push('/ViewResult');
  };

  const navigateToStudentEnroll = () => {
    router.push('/uploadEnrollment');
  };

  const navigateToPayment = () => {
    router.push('/paymentSlip');
  };

  const navigateToVerification = () => {
    router.push('/enrollmentVerification');
  };

  const navigateToNoticeGenerate = () => {
    router.push('/noticeGenerate');
  };
  const navigateToHistory = () => {
    router.push('/studentHistory');
  };

  // const navigateToCourseOffer = () => {
  //   router.push('/courseOffer');
  // };

  const navigateToInitialCourseSelection = () => {
    router.push('/courseOffer');
  };

  const navigateToFinalCourseEnrollment = () => {
    router.push('/finalCourseEnrollment');
  };
  
  const navigateToTeacherCourseOffer = () => {
    router.push('/teacherCourseOffer');
  };

  const renderNavOptions = () => {
    switch (userData.role) {
      case 'staff':
        return (
          <>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={fetchNotices}>Notices</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToStudentEnroll}>Student Enrollment</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToNoticeGenerate}>Generate Notice</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToPayment}>Payment</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToHistory}>History</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={() => signOut( {callbackUrl: '/'} )}>Log out</li>
          </>
        );
      case 'Course Teacher':
        return (
          <>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={fetchNotices}>Notices</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToUploadResult}>Upload Result</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToHistory}>History</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={() => signOut( {callbackUrl: '/'} )}>Log out</li>
            

          </>
        );
      case 'Director':
        return (
          <>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={fetchNotices}>Notices</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToVerification}>Enrollment Verification</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToHistory}>History</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={() => signOut( {callbackUrl: '/'} )}>Log out</li>
          </>
        );
      case 'Course Coordinator':
        return (
          <>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={fetchNotices}>Notices</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToVerification}>Enrollment Verification</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToTeacherCourseOffer}>Course Offer</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToHistory}>History</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={() => signOut( {callbackUrl: '/'} )}>Log out</li>
          </>
        );
      case 'student':
        return (
          <>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={fetchNotices}>Notices</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToPayment}>Payment</li>
           
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToInitialCourseSelection}>Initial Course Selection</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToFinalCourseEnrollment}>Final Course Enrollment</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={navigateToViewResult}>View Result</li>
            <li className="bg-blue-200 rounded p-2 cursor-pointer hover:bg-blue-300" onClick={() => signOut( {callbackUrl: '/'} )}>Log out</li>
          </>
        );
      default:
        return null;
    }
  };

//   return (
//     <div className="flex h-screen">
//       <div className="w-64 bg-blue-100 text-black p-4">
//         <div className="flex items-center mb-4">
//           <div className="ml-4">
//             <h3 className="text-lg font-semibold">{userData.name}</h3>
//             <p className="text-sm text-gray-700">{userData.email}</p>
//           </div>
//         </div>
//         <nav>
//           <ul className="space-y-2">
//             {renderNavOptions()}
//           </ul>
//         </nav>
//       </div>
//       <div className="flex-1 p-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-4">{userData.name}!</h1>
//           <p className="text-gray-600">Here's your personal dashboard with important information and notices.</p>
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
//           </div>
//           <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Update Profile</button>
//         </div>
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Notices</h2>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             {notices.map(notice => (
//               <div key={notice.id} className="mb-4">
//                 <h3 className="text-lg font-semibold mb-2">{notice.title}</h3>
//                 <p className="text-gray-600">{notice.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





return (
  <div className="flex h-screen">
    <div className="w-64 bg-blue-100 text-black p-4">
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
          <img src="iit.jpg" className="object-cover w-full h-full" alt="User Image" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">{userData.name}</h3>
          <p className="text-sm text-gray-700">{userData.email}</p>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          {renderNavOptions()}
        </ul>
      </nav>
    </div>
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{userData.name}</h1>
        <p className="text-gray-600">Here's your personal dashboard with important information and notices.</p>
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
          {userData.role === 'student' && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Roll Number</h3>
              <p className="text-gray-600">{userData.registration_number}</p>
            </div>
          )}
          {(userData.role === 'Course Teacher' || userData.role === 'Course Coordinator' || userData.role === 'Director') && (
  <>
   
    <div>
      <h3 className="text-lg font-semibold mb-2">Designation</h3>
      <p className="text-gray-600">{userData.designation}</p>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">Role</h3>
      <p className="text-gray-600">{userData.role}</p>
    </div>
  </>
)}
</div>
<button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-sm">Change Password</button>
</div>
<div className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">Notices</h2>
  <div className="bg-white rounded-lg shadow-md p-6">
    {notices.map(notice => (
      <div key={notice.id} className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{notice.title}</h3>
        <p className="text-gray-600">{notice.description}</p>
      </div>
    ))}
  </div>
</div>
</div>
</div>
);
}

export default Dashboard;
