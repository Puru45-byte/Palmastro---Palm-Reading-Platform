import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage'
import PalmReadingsPage from './pages/PalmReadingsPage'
import LinesPage from './pages/LinesPage'
import BlogPage from './pages/BlogPage'
import PremiumLoginPage from './pages/PremiumLoginPage'
import SignupPage from './pages/SignupPage'
import GoogleCallback from './pages/GoogleCallback'
import FormPage from './pages/FormPage'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'
import AdminDashboard from './pages/AdminDashboard'
import WelcomeAdmin from './pages/WelcomeAdmin'
import RequestDetailsPage from './pages/RequestDetailsPage'
import ProfilePage from './pages/ProfilePage'
import ContactPage from './pages/ContactPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/palm-readings" element={<PalmReadingsPage />} />
        <Route path="/lines" element={<LinesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
                    <Route path="/premium-login" element={<PremiumLoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
                    <Route path="/auth/callback" element={<GoogleCallback />} />
          <Route path="/form" element={<ProtectedRoute><FormPage /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><WelcomeAdmin /></AdminRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/request/:id" element={<AdminRoute><RequestDetailsPage /></AdminRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
    </div>
  );
}

export default App;
