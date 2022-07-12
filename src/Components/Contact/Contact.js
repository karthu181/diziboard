import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div id="contact" className="contact-bg-container">
      <h1 className="about-us-text">GET IN TOUCH</h1>
      <hr className="about-us-hr-line" />
      <p className="about-us-description">
        Have a question or comment? Drop us a line
      </p>
      <div>
        <form className="contact-form">
          <div>
            <input className="form-control" placeholder="Name" type="text" />
            <br />
            <input className="form-control" placeholder="Email" type="email" />
            <br />
            <input className="form-control" placeholder="Subject" type="text" />
          </div>
          <div>
            <textarea
              className="form-control"
              rows="4"
              cols="50"
              name="message"
              placeholder="Message Text...."
            ></textarea>
            <br />
            <button className="btn btn-default" type="submit">
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
