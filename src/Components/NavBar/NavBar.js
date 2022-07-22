import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = (props) => {
  const { hideOrShow } = props;
  console.log(hideOrShow)
  return (
    <div className={`nav-container ${hideOrShow[0]} fixed-top`}>
      <Navbar collapseOnSelect  expand="lg" bg="transparent" variant="light">
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
            <Nav.Link href="#home">
              <span  className={`${hideOrShow[1]}`}>HOME</span></Nav.Link>
            <Nav.Link href="#about">
              <span  className={`${hideOrShow[1]}`}>ABOUT</span></Nav.Link>
            <Nav.Link href="#features">
              <span className={`${hideOrShow[1]}`}>FEATURES</span></Nav.Link>
            <Nav.Link href="#screens">
              <span className={`${hideOrShow[1]}`}>SCREENS</span></Nav.Link>
            <Nav.Link href="#download" >
              <span className={`${hideOrShow[1]}`}>DOWNLOAD</span></Nav.Link>
            <Nav.Link href="#contact">
              <span  className={`${hideOrShow[1]}`}>CONTACT</span></Nav.Link>
            <Link className="nav-link" to="/registration"> 
              <span className={`${hideOrShow[1]}`}>REGISTRATION</span>
            </Link>
            <Link className="nav-link" to="/login">
              <span className={`${hideOrShow[1]}`}>SIGN IN</span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
