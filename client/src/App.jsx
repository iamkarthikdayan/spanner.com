import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/CustomNavbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx';
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";

// Helper to conditionally render Navbar
function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register"; // Hide on login and register
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add other routes here */}
      </Routes>
    </Layout>
  );
}

export default App;