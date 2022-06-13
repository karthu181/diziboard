import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import "./Screens.css";

const Screens = () => {
  // const [count, setCount] = useState(500);

  // const intervalId = setInterval(function() {
  //   setCount((prevCount) => prevCount + 1);
  // }, 1000);

  // if (count === 844) {
  //   clearInterval(intervalId);
  // }

  // useEffect(() => {}, [count]);

  return (
    <div id="screens" className="screens-bg-container">
      <h1 className="about-us-text">SCREENS</h1>
      <hr className="screens-hr-line" />
      <p className="about-us-description">
        A simple yet ever so useful motivational guide and help application that
        we had developed. Indian Thoughts looks to refresh and rejuvenate the
        minds of its readers. Who are looking to take a break from their routine
        to add up some color to their mind.
      </p>
      <div className="screens-carousel-container">
        <Carousel controls={false}>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100 carousel-images"
              src="https://image.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100 carousel-images"
              src="https://image.shutterstock.com/image-photo/bank-blocks-linked-money-by-600w-1937886058.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        <h1>1</h1>
      </div>
    </div>
  );
};

export default Screens;
