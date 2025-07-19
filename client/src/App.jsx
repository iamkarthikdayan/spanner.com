import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/CustomNavbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx';
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import AirConditionerRepair from './pages/AirConditionerRepair';
import WashingMachineRepair from './pages/WashingMachineRepair.jsx';
import ACMechanics from './pages/ACMechanics.jsx';
import ProviderHome from './provider/ProviderHome.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
// Helper to conditionally render Navbar

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/admin"; // Hide on login and register
  const hideFooter = location.pathname === "/admin";
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
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
        <Route path="/ac-repair" element={<AirConditionerRepair />} />
        <Route path="/wm-repair" element={<WashingMachineRepair />} />
        <Route path="/ac-mechanics" element={<ACMechanics />} />
        <Route path="/provider-home" element={<ProviderHome />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Add more provider-specific routes as needed */}

      </Routes>
    </Layout>
  );
}

export default App;