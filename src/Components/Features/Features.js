import "./Features.css";
import React from "react";

const Features = () => {
  return (
    <section id="features" className="features-bg-container">
      <h1 className="features-heading">FEATURES</h1>
      <hr className="features-hr-line" />
      <p className="features-description">
        The point of your app is the same as your website, just made easier and
        more useful. It is to give parents the ability to get educated on their
        child's education. Anything they need, from school announcements all the
        way up to district events, all information has to be easy to access and
        available all the time.
      </p>
      <div className="features-row-container">
        <div className="features-left-text-container">
          <h1 className="features-subheadings text-end">LIVE BUS TRACKING</h1>
          <p className="features-sub-des text-end">
            Managing the school bus fleet and ensuring the safety of school
            students is a huge challenge for any school. Not anymore!
          </p>
          <h1 className="features-subheadings text-end">
            EXAM-RESULT MANAGEMENT
          </h1>
          <p className="features-sub-des text-end">
            Managing the scheduling of exams in your school, publishing results
            and printing report cards could be a time-consuming task. Not
            anymore!
          </p>
          <h1 className="features-subheadings text-end">
            TIME TABLE PUBLISHING
          </h1>
          <p className="features-sub-des text-end">
            The TImeTablePublisher(TTPUB) is a web publishing system that allows
            examine, transform and modify scheduling school time table
          </p>
        </div>
        <div className="features-iphone-black-container">
          <img
            alt="iphone-black"
            src="http://192.168.0.116:8080/images/iphone-black.png"
            className="features-iphone-black-in-features"
          />
        </div>
        <div className="features-right-text-container">
          <h1 className="features-subheadings text-start">
            ONLINE ASSESSMENTS
          </h1>
          <p className="features-sub-des text-start">
            Online assessments are capable of providing significantly improved
            feedback to teaching and learning
          </p>
          <h1 className="features-subheadings text-start">
            COMMUNICATION MANAGEMENT
          </h1>
          <p className="features-sub-des text-start">
            Communications managers are responsible for conveying an school's
            internal and external messages.
          </p>
          <h1 className="features-subheadings text-start">BRAND YOUR SCHOOL</h1>
          <p className="features-sub-des text-start">
            Today's school branding goes a step further and identifies a
            school's unique competitive advantage.
          </p>
        </div>
      </div>

      <div className="features-purchase-btn-des-container">
        <div className="features-purchase-des-container">
          <p className="features-purchase-des">
            Apps are pieces of software that run on any device, such as laptop,
            smart phone, or an iPod or iPad. As devices increase in popularity -
            at home and business, as well as in the classroom - a seemingly
            endless range of apps have become available for purchase. Many of
            these apps are designed specifically for use by teachers and
            students.
          </p>
        </div>
        <div className="features-purchase-btn-container">
          <button className="btn btn-primary features-purchase-btn">
            PURCHASE NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
