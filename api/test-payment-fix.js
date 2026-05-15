require('dotenv').config();

console.log('🧪 Testing Payment Fix...\n');

async function testPaymentFix() {
  try {
    console.log('1️⃣ Testing payment order creation...');
    
    // First login to get token
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
    
    // Test payment order creation
    const orderResponse = await fetch('http://localhost:5003/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: 149,
        currency: 'INR',
        receipt: 'receipt_' + Date.now()
      })
    });
    
    console.log('Order response status:', orderResponse.status);
    
    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      console.log('✅ Payment order created successfully!');
      console.log('Order ID:', orderData.id);
      console.log('Amount:', orderData.amount);
      console.log('Currency:', orderData.currency);
      console.log('\n🎉 PAYMENT SERVICE IS NOW WORKING!');
    } else {
      const errorData = await orderResponse.text();
      console.log('❌ Payment order failed:', errorData);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPaymentFix();
