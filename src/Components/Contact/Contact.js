import React from "react";
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa';
import 'animate.css'
import "./Contact.css";

const Contact = () => {
  return (
    <div id="contact" className="contact-bg-container">
      <div className="contact-animation">
        <h1 className="about-us-text">GET IN TOUCH</h1>
        <hr className="about-us-hr-line" />
        <p className="about-us-description">
          Have a question or comment? Drop us a line
        </p>
        <div>
          <form className="contact-form">
            <div>
              <input placeholder="Name" type="text" className="contact-us-input-containers" />
              <br />
              <input placeholder="Email" type="text" className="contact-us-input-containers" />
              <br />
              <input placeholder="Subject" type="text" className="contact-us-input-containers" />
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Message Text..."
                className="contact-us-textarea"
                style={{resize:"none"}}
              />
              <br />
              <button className="contact-us-button-send" type="submit">
                SEND
              </button>
            </div>
          </form>
          <ul className="social-icons">

            <li className="social-icons-list-items">
              <a href="#">
                <i className="socila-icons-items"><FaFacebookF /></i>
              </a>
            </li>
            <li className="social-icons-list-items">
              <a href="#">
                <i className="socila-icons-items"><FaTwitter /></i>
              </a>
            </li>
            <li className="social-icons-list-items">
              <a href="#">
                <i className="socila-icons-items"><FaYoutube /></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="contact-us-bottom-container">
        <div className="contact-bottom-flex-container">
          <div className="contact-name-phone-container">
            <p className="contact-copyright">COPYRIGHT © 2018<span className="contact-span-item"><a href="#">-MASSIL TECHNOLOGIES PVT LTD</a></span></p>
            <p className="contact-phne-number">CONTACT : +9140 27177600</p>
          </div>

          <a href="#home">
            <div className="contact-scrool-up">
              <i><FaAngleUp className="contact-icon-color" /></i>

            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;