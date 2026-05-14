console.log('🔍 Debugging Frontend Environment Variables...\n');

// Check if Vite is loading the environment variables
console.log('📋 Frontend Environment Check:');
console.log('VITE_RAZORPAY_KEY_ID:', import.meta.env.VITE_RAZORPAY_KEY_ID);
console.log('MODE:', import.meta.env.MODE);
console.log('BASE_URL:', import.meta.env.BASE_URL);
console.log('PROD:', import.meta.env.PROD);
console.log('DEV:', import.meta.env.DEV);

// Check what the PaymentPage will see
if (import.meta.env.VITE_RAZORPAY_KEY_ID) {
  console.log('✅ Razorpay key loaded:', import.meta.env.VITE_RAZORPAY_KEY_ID);
} else {
  console.log('❌ Razorpay key NOT loaded');
  console.log('💡 This means the frontend .env file is not being read');
  console.log('💡 Or the frontend needs to be restarted');
}

console.log('\n🔧 Frontend Troubleshooting:');
console.log('1. Check if client/.env file exists');
console.log('2. Check if VITE_RAZORPAY_KEY_ID is set correctly');
console.log('3. Restart frontend development server');
console.log('4. Clear browser cache and refresh');
