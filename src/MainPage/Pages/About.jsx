import React from "react";
import "./About.css";
import img from "../../Images/about_img.jpg";

function About() {
  return (
    <div className="About_main_page_container">
      <div className="about_img">
        <img src={img} alt="About Us" />
      </div>
      <div className="about_content">
        <h1>About Us</h1>
        <p>
          Our Student Teacher Appointment Booking System simplifies scheduling
          meetings between students and teachers. With an intuitive interface,
        </p>
        <p>
          users can easily book, modify, and cancel appointments, ensuring
          effective communication and personalized support for academic success.
        </p>
        <button>
          <a href="#contact">Contact me for more information</a>
        </button>
      </div>
    </div>
  );
}

export default About;
