# Quick Start Guide - Palm Astro

## 1. Backend Setup

```bash
cd server
npm install
```

## 2. Environment Variables

Create `server/.env` file with:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/palmastro"
JWT_SECRET="your-jwt-secret-key-here"
ADMIN_EMAIL="admin@example.com"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
AWS_ACCESS_KEY="your-aws-access-key"
AWS_SECRET_KEY="your-aws-secret-key"
S3_BUCKET="your-s3-bucket-name"
RAZORPAY_KEY_ID="rzp_test_your-key-id"
RAZORPAY_SECRET="your-razorpay-secret"
EMAIL="your-gmail@gmail.com"
EMAIL_PASSWORD="your-gmail-app-password"
CLIENT_URL="http://localhost:5173"
```

## 3. Database Setup

```bash
cd server

# Install PostgreSQL if not installed
# Create database: palmastro

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Create admin user
npm run seed
```

## 4. Start Backend Server

```bash
cd server
npm run dev
```

Backend will run on: http://localhost:5000

## 5. Frontend Setup

```bash
cd client
npm install
```

## 6. Start Frontend

```bash
cd client
npm run dev
```

Frontend will run on: http://localhost:5173

## 7. Test the Application

1. Open http://localhost:5173
2. Click "Ask a Question"
3. Register/login with any email
4. Fill form and upload palm images
5. Proceed to payment (test mode)
6. Check admin dashboard at /admin

## 8. Admin Access

- Login with email matching ADMIN_EMAIL from .env
- Password: admin123 (from seed)
- Access dashboard at: http://localhost:5173/admin

## Common Issues & Solutions

### Database Connection Error
- Check PostgreSQL is running
- Verify DATABASE_URL format
- Ensure database exists

### File Upload Error
- Verify AWS credentials
- Check S3 bucket permissions
- Ensure bucket exists

### Payment Error
- Use Razorpay test keys
- Check key format
- Enable test mode in Razorpay dashboard

### Email Error
- Use Gmail app password (not regular password)
- Enable 2-factor authentication
- Check SMTP settings

### Google OAuth Error
- Verify redirect URI: http://localhost:5000/api/auth/google/callback
- Check client ID and secret
- Enable Google+ API

## Development Commands

```bash
# Backend
cd server
npm run dev          # Start with nodemon
npm start            # Production start
npx prisma studio    # View database

# Frontend  
cd client
npm run dev          # Development server
npm run build        # Build for production
npm run preview      # Preview build
```

## Test Users

### Admin User
- Email: admin@example.com (or your ADMIN_EMAIL)
- Password: admin123

### Regular User
- Register any email not matching ADMIN_EMAIL
- Will get USER role automatically
