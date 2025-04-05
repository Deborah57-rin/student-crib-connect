
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Index from './pages/home/Home';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';
import { AuthProvider } from './context/AuthProvider';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import PropertyForm from './pages/createProperty/PropertyForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PropertyDetails from './components/propertyCard/PropertyDetails';
import Listings from './pages/myProperty/Listings';
import Profile from './pages/profile/Profile';




function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar /> {/* Render the Navbar within the router */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<div>Properties</div>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/create-property" element={<ProtectedRoute><PropertyForm/></ProtectedRoute>} />
        <Route path="/property-details/:id" element={<PropertyDetails/>} />
        <Route path="/my-properties/:id" element={<ProtectedRoute><Listings/></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;