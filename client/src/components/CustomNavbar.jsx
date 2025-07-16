import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Logo from '../assets/logo.png';
import './CustomNavbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import UserDashboard from '../pages/UserDashboard';

function CustomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showDashboard, setShowDashboard] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, []);

  const handleScrollToRepair = () => {
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const el = document.getElementById('repair-services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('repair-services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')}>
            <img src={Logo} alt="iFixit" height="80" className="d-inline-block align-top" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="ifixit-navbar" />
          <Navbar.Collapse id="ifixit-navbar">
            <Nav className="mx-auto align-items-center" style={{ gap: '2rem' }}>
              <Nav.Link as="button" className="text-white btn btn-link" onClick={handleScrollToRepair}>
                Repair Services
              </Nav.Link>
              <Nav.Link className="text-white">Track Repair</Nav.Link>
              <Nav.Link className="text-white">Answers</Nav.Link>
              <Nav.Link className="text-white">Teardowns</Nav.Link>
            </Nav>

            <Form className="d-flex ms-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 bg-white text-dark border-secondary"
                aria-label="Search"
                size="sm"
              />
              <Button className="btn-search-custom" size="sm">Search</Button>
            </Form>

            {/* Show Login/Sign Up only if NOT logged in */}
            {!loggedInUser && (
              <>
                <Button variant="outline-light" className="ms-3" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="light" className="ms-2" size="sm" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </>
            )}

            {/* ✅ Show User Icon only if logged in as "user" */}
            {loggedInUser?.role === 'user' && (
              <FaUserCircle
                size={28}
                color="white"
                style={{ marginLeft: '1rem', cursor: 'pointer' }}
                onClick={() => setShowDashboard(true)}
              />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Slide-in Dashboard */}
      {showDashboard && <UserDashboard onClose={() => setShowDashboard(false)} user={loggedInUser} />}
    </>
  );
}

export default CustomNavbar;