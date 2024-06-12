import { useState } from 'react';
import axios from 'axios';

export default function NoticeGenerate() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('notice', file);

    try {
      const response = await axios.post('http://localhost:5000/api/uploadNotice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Notice uploaded successfully');
    } catch (error) {
      console.error('Error uploading notice:', error);
      setMessage('Failed to upload notice');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Notice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Notice PDF:</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="border p-2 w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload Notice</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}
