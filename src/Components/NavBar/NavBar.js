import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = (props) => {
  const { displayOrHide } = props;

  return (
    <div className={`nav-container ${displayOrHide}`}>
      <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
        <Navbar.Brand className="me-auto" href="#home">
          <img
            className="navbar-logo"
            alt="nav-logo"
            src="http://192.168.0.116:8080/images/logo_small.png"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link href="#about">ABOUT</Nav.Link>
            <Nav.Link href="#features">FEATURES</Nav.Link>
            <Nav.Link href="#screens">SCREENS</Nav.Link>
            <Nav.Link href="#download">DOWNLOAD</Nav.Link>
            <Nav.Link href="#contact">CONTACT</Nav.Link>
            <Link className="nav-link" to="/registration">
              REGISTRATION
            </Link>
            <Link className="nav-link" to="/login">
              SIGN IN
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
