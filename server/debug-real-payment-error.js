require('dotenv').config();

console.log('🔍 Debugging Real Payment Error...\n');

async function debugPaymentError() {
  try {
    console.log('1️⃣ Testing with realistic Razorpay payment data...');
    
    // Login to get token
    const loginResponse = await fetch('http://localhost:5003/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@palmastro.com',
        password: 'test123'
      })
    });
    
    if (!loginResponse.ok) {
      console.log('❌ Login failed');
      return;
    }
    
    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('✅ Login successful!');
    
    // Test with realistic Razorpay response structure
    const testPaymentData = {
      razorpay_order_id: 'order_NqLXx8gP9p2i7w',
      razorpay_payment_id: 'pay_NqLXy8gP9p2i7w',
      razorpay_signature: '8f2c3b4a5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3',
      formData: JSON.stringify({
        question: 'What does my future hold?',
        leftPalmUrl: 'uploads/test_left_palm.jpg',
        rightPalmUrl: 'uploads/test_right_palm.jpg'
      })
    };
    
    console.log('Sending payment verification data:', testPaymentData);
    
    const verifyResponse = await fetch('http://localhost:5003/api/payments/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testPaymentData)
    });
    
    console.log('Verification response status:', verifyResponse.status);
    console.log('Verification response headers:', Object.fromEntries(verifyResponse.headers.entries()));
    
    const responseText = await verifyResponse.text();
    console.log('Verification response body:', responseText);
    
    if (verifyResponse.ok) {
      const verifyData = JSON.parse(responseText);
      console.log('✅ Payment verification successful!');
      console.log('Response:', verifyData);
    } else {
      console.log('❌ Payment verification failed with status:', verifyResponse.status);
      console.log('Error details:', responseText);
      
      // Try to parse error if it's JSON
      try {
        const errorData = JSON.parse(responseText);
        console.log('Parsed error:', errorData);
      } catch (e) {
        console.log('Error is not JSON format');
      }
    }
    
  } catch (error) {
    console.error('❌ Debug test failed:', error.message);
    console.error('Full error:', error);
  }
}

debugPaymentError();
