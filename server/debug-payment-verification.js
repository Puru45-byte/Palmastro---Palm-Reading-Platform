require('dotenv').config();

console.log('🔍 Debugging Payment Verification Issue...\n');

async function testPaymentVerification() {
  try {
    console.log('1️⃣ Testing payment verification endpoint...');
    
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
    
    // Test verification with test data
    const verifyResponse = await fetch('http://localhost:5003/api/payments/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        razorpay_order_id: 'test_order_123',
        razorpay_payment_id: 'test_payment_123',
        razorpay_signature: 'bypass_signature_for_testing',
        formData: JSON.stringify({
          question: 'Test question',
          leftPalmUrl: 'test_left.jpg',
          rightPalmUrl: 'test_right.jpg'
        })
      })
    });
    
    console.log('Verification response status:', verifyResponse.status);
    
    if (verifyResponse.ok) {
      const verifyData = await verifyResponse.json();
      console.log('✅ Verification test successful!');
      console.log('Response:', verifyData);
    } else {
      const errorData = await verifyResponse.text();
      console.log('❌ Verification failed:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPaymentVerification();
