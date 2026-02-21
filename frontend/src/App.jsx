import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import ShowSelection from './pages/ShowSelection';
import SeatSelection from './pages/SeatSelection';
import BookingSuccess from './pages/BookingSuccess';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';

// Admin Pages (to be created)
import AdminDashboard from './pages/AdminDashboard';
import Theatres from './pages/Theatres';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-cinema-black transition-colors duration-300">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/theatres" element={<Theatres />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/book/:movieId" element={<ShowSelection />} />
                <Route path="/seats/:showId" element={
                  <ProtectedRoute>
                    <SeatSelection />
                  </ProtectedRoute>
                } />
                <Route path="/booking-success/:bookingId" element={
                  <ProtectedRoute>
                    <BookingSuccess />
                  </ProtectedRoute>
                } />
                <Route path="/my-bookings" element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/*" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
