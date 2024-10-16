import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "../../Images/logo.jpeg"

function Navbar({ openRegister, openLogin }) {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo">
          <img src={logo} alt="" />
      </div>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {['Home', 'About', 'Contact'].map((item) => (
            <li
              key={item}
              className={activeItem === item ? 'active' : ''}
              onClick={() => handleItemClick(item)}
            >
              <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} style={{textDecoration:"none"}}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`buttons ${isMenuOpen ? 'hidden' : ''}`}>
        <button onClick={openRegister}>Register</button>
        <button onClick={openLogin}>Login</button>
      </div>
      <div className="toggle-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
}

export default Navbar;
