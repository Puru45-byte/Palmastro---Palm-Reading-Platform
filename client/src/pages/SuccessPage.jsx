import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Your palm reading request has been successfully submitted. Our expert astrologers will review your palm images and provide you with a personalized reading.
            </p>
            
            <div className="text-left space-y-2 text-sm text-gray-600">
              <p>What happens next:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Our experts will analyze your palm images</li>
                <li>You will receive your answer via email within 24 hours</li>
                <li>The answer will be based on your specific question</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors font-semibold"
            >
              Back to Home
            </Link>
            
            <button
              onClick={() => window.location.href = 'mailto:support@palmastro.com'}
              className="block w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
