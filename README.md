# Palm Astro - Palm Reading Platform

A production-ready full-stack web application for paid palm reading services where users can upload palm images, ask questions, pay via Razorpay, and receive personalized answers via email.

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

### Services
- AWS S3 (image storage)
- Razorpay (payments)
- Nodemailer (email)
- Google OAuth

## Features

- User authentication (email/password + Google OAuth)
- Palm image upload to AWS S3
- Razorpay payment integration (Rs. 149)
- Admin dashboard for managing requests
- Email notifications to users
- Role-based access control
- Mobile responsive design

## Project Structure

```
palmastro/
client/                 # React frontend
  src/
    pages/             # Page components
    components/        # Reusable components
    services/          # API services
    contexts/          # React contexts
server/                # Node.js backend
  controllers/         # Route controllers
  routes/             # API routes
  middleware/         # Express middleware
  utils/              # Utility functions
  prisma/             # Database schema
  config/             # Configuration files
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- AWS S3 bucket
- Razorpay account
- Google OAuth credentials
- Gmail account (for email)

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd palmastro

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Variables

Create a `.env` file in the `server` directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/palmastro"
JWT_SECRET="your-jwt-secret-key"
ADMIN_EMAIL="admin@example.com"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
AWS_ACCESS_KEY="your-aws-access-key"
AWS_SECRET_KEY="your-aws-secret-key"
S3_BUCKET="your-s3-bucket-name"
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_SECRET="your-razorpay-secret"
EMAIL="your-gmail-address"
EMAIL_PASSWORD="your-gmail-app-password"
CLIENT_URL="http://localhost:5173"
```

### 3. Database Setup

```bash
cd server

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed database with admin user
npx prisma db seed
```

### 4. Start the Application

```bash
# Start backend server
cd server
npm run dev

# Start frontend (in another terminal)
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify-payment` - Verify payment

### Upload
- `POST /api/upload/palm-images` - Upload palm images

### Requests
- `POST /api/requests` - Create reading request
- `GET /api/requests` - Get all requests (admin only)
- `GET /api/requests/:id` - Get request details (admin only)
- `PUT /api/requests/:id/answer` - Submit answer (admin only)

## User Flow

1. **Landing Page**: User learns about the service
2. **Login/Registration**: User creates account or logs in
3. **Form Page**: User fills details, uploads palm images, asks question
4. **Payment**: User pays Rs. 149 via Razorpay
5. **Success**: Confirmation that request is submitted
6. **Email**: User receives answer within 24 hours

## Admin Flow

1. Admin logs in (same login system, role determined by ADMIN_EMAIL)
2. Access dashboard at `/admin`
3. View all requests with filtering (pending/completed)
4. Click on request to view details and palm images
5. Write and submit answer
6. Answer automatically sent to user via email

## Security Features

- JWT authentication
- Role-based access control
- File type validation (JPG/PNG only)
- Razorpay signature verification
- Environment variable protection
- Input validation and sanitization

## Deployment Notes

### Frontend (Vercel/Netlify)
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: Add `VITE_API_URL`

### Backend (Heroku/Railway)
- Start command: `npm start`
- Add all environment variables
- Ensure PostgreSQL is configured

### AWS S3 Setup
1. Create S3 bucket
2. Configure CORS policy
3. Set bucket permissions
4. Add IAM user with S3 access

### Razorpay Setup
1. Create Razorpay account
2. Get API keys
3. Configure webhook (optional)
4. Set test/live mode

### Google OAuth Setup
1. Create Google Cloud project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URI: `{backend_url}/api/auth/google/callback`

## Development

### Adding New Features
1. Update Prisma schema if needed
2. Run migrations: `npx prisma migrate dev`
3. Add API routes in `server/routes/`
4. Add frontend components/pages
5. Update API services in `client/src/services/`

### Database Management
```bash
# View database
npx prisma studio

# Reset database
npx prisma migrate reset

# Deploy migrations
npx prisma migrate deploy
```

## Troubleshooting

### Common Issues
1. **Database connection**: Check DATABASE_URL and PostgreSQL status
2. **File upload**: Verify AWS credentials and bucket permissions
3. **Email**: Check Gmail app password and SMTP settings
4. **Payment**: Ensure Razorpay keys are correct and test mode is enabled
5. **CORS**: Verify CLIENT_URL matches frontend URL

### Logs and Debugging
- Backend logs: Check console output
- Frontend: Use browser developer tools
- Database: Use Prisma Studio for inspection

## Support

For issues and questions:
1. Check this README
2. Review error logs
3. Verify environment variables
4. Test individual components

