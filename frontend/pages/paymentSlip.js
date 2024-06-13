
import { useState } from 'react';
import axios from 'axios';

export default function PaymentSlip() {
  const [roll, setRoll] = useState('');
  const [semester, setSemester] = useState('');
  const [session, setSession] = useState('');
  const [paymentData, setPaymentData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/api/paymentSlip/${roll}/${semester}/${session}`);
      setPaymentData(response.data);
    } catch (error) {
      console.error('Error fetching payment slip:', error);
      alert('Failed to fetch payment slip');
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/paymentSlip/${roll}/${semester}/${session}?format=pdf`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'paymentSlip.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF');
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
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Semester</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>Session:</label>
          <input
            type="text"
            placeholder='20XX-XX'
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

      {paymentData && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Payment Slip</h2>
          <div className="mb-4">
            <div><strong>Name:</strong> {paymentData.student.name}</div>
            <div><strong>Roll:</strong> {paymentData.student.roll}</div>
            <div><strong>Session:</strong> {paymentData.student.session}</div>
            <div><strong>Semester:</strong> {paymentData.student.semester}</div>
          </div>
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Particulars</th>
                <th className="border border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Semester Fee</td>
                <td className="border border-gray-300 p-2">10,000</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Lab Usage Fee</td>
                <td className="border border-gray-300 p-2">8,000</td>
              </tr>
              {paymentData.fees.courseFees.map((fee, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{fee.course} Fee</td>
                  <td className="border border-gray-300 p-2">{fee.fee}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="border border-gray-300 p-2">Total Fee</td>
                <td className="border border-gray-300 p-2">{paymentData.fees.totalFee}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handleDownloadPdf}
            className="mt-4 bg-green-500 text-white p-2 rounded"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
