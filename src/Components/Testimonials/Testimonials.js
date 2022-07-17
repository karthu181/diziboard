import React from "react";
import { Carousel } from "react-bootstrap";
import "./Testimonials.css"

const Testimonials = () => {
    return (

        <section className="testimonials-bg-container">
            <div className="testimonials-inner-container">
                <Carousel controls={false}>
                    <Carousel.Item interval={2000}>
                        <div className="item active text-center">
                            <img src="images/image.png" alt="testimonial" className="testimonials-img center-block" />
                            <div className="testimonial-caption">
                                <h2>Sagan</h2>
                                <h4><span> Vidya Bharathi Techno School </span>Principal</h4>
                                <p>"We think our services are second-to-none and that our schools have the best school websites, but you don't have to take our word for it! We are quite proud of our relationship with our schools and the administrators we support. Read on to find out why these schools entrust us with their online communications and why they believe they have the best school websites available."</p>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <div className="item text-center">
                            <img src="images/image.png" alt="testimonial" className="testimonials-img center-block" />
                            <div className="testimonial-caption">
                                <h2>Shivaranjan</h2>
                                <h4><span> Vikas Techno School </span>Principal</h4>
                                <p>"We think our services are second-to-none and that our schools have the best school websites, but you don't have to take our word for it! We are quite proud of our relationship with our schools and the administrators we support. Read on to find out why these schools entrust us with their online communications and why they believe they have the best school websites available."</p>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <div className="item text-center">
                            <img src="images/image.png" alt="testimonial" className="testimonials-img center-block" />
                            <div className="testimonial-caption">
                                <h2>Lasya</h2>
                                <h4><span> Bharathiya Vidyalayam </span>Principal</h4>
                                <p>"We think our services are second-to-none and that our schools have the best school websites, but you don't have to take our word for it! We are quite proud of our relationship with our schools and the administrators we support. Read on to find out why these schools entrust us with their online communications and why they believe they have the best school websites available."</p>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </section>
    )
}
export default Testimonials