import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_content">
        <h3>Stay Connected</h3>
        <p>Follow us on our social media channels for updates and news.</p>
        <div className="social_icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
        <div className="contact_info">
          <p>Mobile: +1 (234) 567-8901</p>
          <p>Email: info@mywebsite.com</p>
        </div>
      </div>
      <div className="footer_bottom">
        <p>&copy; 2024 MyWebsite. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
