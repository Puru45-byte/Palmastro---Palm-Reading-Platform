import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentAPI, uploadAPI, requestAPI } from '../services/api';


const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = async () => {
    try {
      setLoading(true);
      const orderData = {
        amount: 149,
        currency: 'INR',
        receipt: 'receipt_' + Date.now()
      };
      console.log('Sending order data:', orderData);
      
      const response = await paymentAPI.createOrder(orderData);
      console.log('Backend order response:', response);
      console.log('Order data:', response.data);
      console.log('Order ID:', response.data?.id);
      console.log('Order amount:', response.data?.amount);
      console.log('Order currency:', response.data?.currency);
      setOrder(response.data);
    } catch (err) {
      console.error('Order creation error:', err);
      setError('Failed to create payment order');
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve, reject) => {
      // Remove any existing razorpay scripts first
      document.querySelectorAll('script[src*="razorpay"]').forEach(s => s.remove());
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = false;
      script.onload = () => {
        console.log('Razorpay loaded:', typeof window.Razorpay);
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!order || !order.id) {
      alert("Order creation failed. Please try again.");
      return;
    }

    // Force remove wrong SDK and load correct one
    await loadRazorpay();
    
    // Verify correct SDK loaded
    const testInstance = new window.Razorpay({key: 'test'});
    console.log('Has open?', typeof testInstance.open);
    if (typeof testInstance.open !== 'function') {
      alert('Wrong Razorpay SDK still loading. Check network tab.');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency || 'INR',
      name: 'Palm Reading Service',
      description: 'Palm Reading Service',
      order_id: order.id,
      handler: async function(response) {
        console.log('=== RAZORPAY RESPONSE DEBUG ===');
        console.log('Full response object:', response);
        console.log('Response keys:', Object.keys(response));
        console.log('razorpay_order_id:', response.razorpay_order_id);
        console.log('razorpay_payment_id:', response.razorpay_payment_id);
        console.log('razorpay_signature:', response.razorpay_signature);
        console.log('=== END RAZORPAY DEBUG ===');
        
        try {
          // Get form data from localStorage
          const formData = JSON.parse(localStorage.getItem('palmRequestData') || '{}');
          console.log('Form data from localStorage:', formData);
          
          const verificationPayload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            formData: JSON.stringify(formData)
          };
          
          console.log('=== VERIFICATION REQUEST DEBUG ===');
          console.log('Sending to backend:', verificationPayload);
          console.log('=== END VERIFICATION DEBUG ===');
          
          // Verify payment with server
          const verifyResponse = await fetch('/api/payments/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(verificationPayload)
          });
          
          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
            console.log('Payment verified successfully');
            // Clear the stored form data
            localStorage.removeItem('palmRequestData');
            navigate('/success');
          } else {
            console.error('=== PAYMENT VERIFICATION FAILED ===');
            console.error('Backend response:', verifyData);
            console.error('Error message:', verifyData.message);
            console.error('Full error details:', verifyData);
            console.error('=== END VERIFICATION ERROR ===');
            alert('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('=== PAYMENT VERIFICATION CATCH ERROR ===');
          console.error('Error object:', error);
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
          console.error('=== END CATCH ERROR ===');
          alert('Payment verification failed. Please contact support.');
        }
      },
      prefill: { name: '', email: '', contact: '' },
      theme: { color: '#7C3AED' },
      modal: {
        ondismiss: function() {
          console.log('Payment dismissed');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function(response) {
      alert('Payment failed: ' + response.error.description);
    });
    rzp.open();
  };

  const submitRequest = async () => {
    const requestData = JSON.parse(localStorage.getItem('palmRequestData'));
    
    const formData = new FormData();
    formData.append('images', requestData.leftPalm);
    formData.append('images', requestData.rightPalm);
    
    const uploadResponse = await uploadAPI.uploadPalmImages(formData);
    
    await requestAPI.createRequest({
      question: requestData.question,
      leftPalmUrl: uploadResponse.data.leftPalmUrl,
      rightPalmUrl: uploadResponse.data.rightPalmUrl
    });
    
    localStorage.removeItem('palmRequestData');
  };

  // JSX rendering part of the component
  if (loading && !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Payment</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="text-center mb-8">
          <div className="bg-purple-100 rounded-lg p-6 mb-6">
            <p className="text-gray-600 mb-2">Palm Reading Service</p>
            <p className="text-4xl font-bold text-purple-600">Rs. 149</p>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <p>Secure payment powered by Razorpay</p>
            <p>You will receive your reading within 24 hours</p>
          </div>
        </div>
        
        <button
          onClick={handlePayment}
          disabled={!order || loading}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 font-semibold"
        >
          {loading ? 'Processing...' : 'Pay Rs. 149'}
        </button>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-purple-600 hover:text-purple-700 text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
