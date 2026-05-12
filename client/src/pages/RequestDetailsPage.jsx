import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestAPI } from '../services/api';

const RequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      const response = await requestAPI.getRequest(id);
      setRequest(response.data);
      setAnswer(response.data.answer || '');
    } catch (error) {
      console.error('Failed to fetch request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    try {
      setSubmitting(true);
      await requestAPI.submitAnswer(id, answer);
      await fetchRequest();
    } catch (error) {
      console.error('Failed to submit answer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Request not found</p>
          <button
            onClick={() => navigate('/admin')}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Request Details</h1>
            </div>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              request.status === 'COMPLETED' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {request.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">User Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">
                    {request.user.firstName} {request.user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{request.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{request.user.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Question</h2>
              <p className="text-gray-700">{request.question}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Palm Images</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Left Palm</p>
                  {request.leftPalmUrl ? (
                    <img 
                      src={request.leftPalmUrl} 
                      alt="Left Palm" 
                      className="w-full rounded-lg border"
                    />
                  ) : (
                    <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                      <p className="text-gray-500">No image</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Right Palm</p>
                  {request.rightPalmUrl ? (
                    <img 
                      src={request.rightPalmUrl} 
                      alt="Right Palm" 
                      className="w-full rounded-lg border"
                    />
                  ) : (
                    <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                      <p className="text-gray-500">No image</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {request.status === 'COMPLETED' ? 'Submitted Answer' : 'Write Answer'}
              </h2>
              
              {request.status === 'COMPLETED' ? (
                <div>
                  <p className="text-gray-700 whitespace-pre-wrap">{request.answer}</p>
                  <p className="text-sm text-gray-500 mt-4">
                    Answer sent via email on {new Date(request.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitAnswer}>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write your palm reading answer here..."
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submitting || !answer.trim()}
                    className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Answer'}
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    The answer will be sent to the user via email
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsPage;
