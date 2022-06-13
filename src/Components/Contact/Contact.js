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
            <input placeholder="Name" type="text" />
            <br />
            <input placeholder="Email" type="text" />
            <br />
            <input placeholder="Subject" type="text" />
          </div>
          <div>
            <textarea
              rows="4"
              cols="50"
              name="message"
              defaultValue="Message Text..."
            ></textarea>
            <br />
            <button className="" type="submit">
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
