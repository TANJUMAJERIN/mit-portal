
//below is correct
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import UploadResult from '../components/uploadResult';
import Link from "next/link";
const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response.data.userData);
      setError(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data. Please try again later.');
      router.push('/login');
    }
  };

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem('token');
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

  const uploadResult = async () => {
    try {
      const token = localStorage.getItem('token');
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

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="flex items-center mb-4">
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{userData.name}</h3>
            <p className="text-sm text-gray-400">{userData.email}</p>
          </div>
        </div>
        <nav>
          <ul className="space-y-2">
            <li className="bg-gray-700 rounded p-2 cursor-pointer" onClick={fetchNotices}>Notices</li>
          </ul>
        </nav>
        <br></br>
        <nav>
          <ul className="space-y-2">
          <li>
              <Link href="../components/UploadResult" className="text-white hover:text-gray-300">
                Upload Result
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome, {userData.name}!</h1>
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
          </div>
          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Update Profile</button>
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
};

export default Dashboard;

