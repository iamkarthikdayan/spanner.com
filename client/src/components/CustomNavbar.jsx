import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Logo from '../assets/logo.png';
import './CustomNavbar.css';
import { useNavigate } from 'react-router-dom'; // Add this import
import {  useLocation } from 'react-router-dom';


function CustomNavbar() {
  const navigate = useNavigate(); // Add this line
  const location = useLocation();
  const handleScrollToRepair = () => {
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll after render
      navigate('/', { replace: false });
      setTimeout(() => {
        const el = document.getElementById('repair-services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Slight delay to allow the Home page to render
    } else {
      const el = document.getElementById('repair-services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand  target="_blank" rel="noopener noreferrer" onClick={() => navigate('/')}>
          <img
            src={Logo}
            alt="iFixit"
            height="80"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="ifixit-navbar" />
        <Navbar.Collapse id="ifixit-navbar">
          {/* Center the navigation links and add spacing */}
          <Nav className="mx-auto align-items-center" style={{ gap: '2rem' }}>
             <Nav.Link as="button" className="text-white btn btn-link" onClick={handleScrollToRepair}>
              Repair Services
            </Nav.Link>
            <Nav.Link target="_blank" rel="noopener noreferrer" className="text-white">
              Track Repair
            </Nav.Link>
            <Nav.Link target="_blank" rel="noopener noreferrer" className="text-white">
              Answers
            </Nav.Link>
            <Nav.Link target="_blank" rel="noopener noreferrer" className="text-white">
              Teardowns
            </Nav.Link>
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
          <Button
            variant="outline-light"
            className="ms-3"
            size="sm"
            onClick={() => navigate('/login')} // Use route path, not file path
          >
            Login
          </Button>
          <Button variant="light" className="ms-2" size="sm" onClick={() => navigate('/register')}>
            Sign Up
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default CustomNavbar;