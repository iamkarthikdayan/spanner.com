import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/CustomNavbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import AirConditionerRepair from './pages/AirConditionerRepair';
import WashingMachineRepair from './pages/WashingMachineRepair.jsx';
import ACMechanics from './pages/ACMechanics.jsx';
import ProviderHome from './provider/ProviderHome.jsx';
import AdminDashboard from './Admin/AdminDashboard.jsx';

function Layout({ children }) {
  const location = useLocation();

  // ✅ Hide Navbar on Login, Register, and Admin Dashboard
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
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

        {/* Other routes */}
        <Route path="/ac-repair" element={<AirConditionerRepair />} />
        <Route path="/wm-repair" element={<WashingMachineRepair />} />
        <Route path="/ac-mechanics" element={<ACMechanics />} />
        <Route path="/provider-home" element={<ProviderHome />} />

        {/* ✅ Admin Route */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;
