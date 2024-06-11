import { useState } from 'react';
import axios from 'axios';

export default function PaymentSlip() {
  const [roll, setRoll] = useState('');
  const [semester, setSemester] = useState('');
  const [session, setSession] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/api/paymentSlip/${roll}/${semester}/${session}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'paymentSlip.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error fetching payment slip:', error);
      alert('Failed to fetch payment slip');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Payment Slip</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Roll Number:</label>
          <input
            type="text"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Semester:</label>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Session:</label>
          <input
            type="text"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Generate Payment Slip
        </button>
      </form>
    </div>
  );
}
