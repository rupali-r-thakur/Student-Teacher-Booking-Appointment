import React from 'react'
import img from "../../Images/home_img.png";
import "./Hero.css"
function Hero() {
  return (
    <div className="home_main_page_container">
      <div className="home">
        <div className="content">
          <h1>Discover Innovative Solutions for Your Everyday Challenges.</h1>
          <p>
            Embracing innovation allows us to turn everyday challenges into
            opportunities for growth. By fostering collaboration and creativity,
            we can discover effective solutions that enhance productivity and
            improve our overall lives.
          </p>
          <button ><a href="#contact">Contact</a></button>
        </div>
        <div className="img">
          <img src={img} alt="Home" />
        </div>
      </div>
    </div>
  )
}

export default Hero