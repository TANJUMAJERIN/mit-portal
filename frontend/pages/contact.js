// pages/contact.js
import React from "react";
import { FaHome, FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Contact Information
        </h2>
        <div className="flex items-center mb-4">
          <FaHome className="text-purple-600 w-6 h-6 mr-4" />
          <span className="text-gray-700">IIT, University of Dhaka</span>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="text-purple-600 w-6 h-6 mr-4" />
          <a href="mailto:iit@du.ac.bd" className="text-gray-700">
            iit@du.ac.bd
          </a>
        </div>
        <div className="flex items-center mb-4">
          <FaPhone className="text-purple-600 w-6 h-6 mr-4" />
          <span className="text-gray-700">8801779482994</span>
        </div>
        <div className="flex items-center mb-8">
          <FaGlobe className="text-purple-600 w-6 h-6 mr-4" />
          <a
            href="http://www.iit.du.ac.bd"
            className="text-gray-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://www.iit.du.ac.bd
          </a>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Contact Hours
        </h2>
        <div className="mb-2">
          <span className="font-bold text-gray-800">Sunday-Thursday:</span>{" "}
          <span className="text-gray-700">9am to 5pm</span>
        </div>
        <div>
          <span className="font-bold text-gray-800">Friday-Saturday:</span>{" "}
          <span className="text-gray-700">Closed</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
