import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./BuyerHeader.css";
import logo from "../../assets/logo/homelogo.png";

import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { RiNotification2Fill } from "react-icons/ri";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function BuyerHeader({ islogin, setIslogin, setCartCount, cartCount }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIslogin(false);
    navigate("/login");
  };

  return (
    <header className="modern-buyer-header">
      <div className="header-container">
        
        {/* Logo */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="AgroMart Logo" className="header-logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={`nav-links ${menuOpen ? "mobile-active" : ""}`}>
          <Link to="/buyerhome" onClick={() => setMenuOpen(false)} className="nav-item">
            <AiOutlineHome className="nav-icon" />
            <span>Home</span>
          </Link>

          <Link to="/buyerhome/productlist" onClick={() => setMenuOpen(false)} className="nav-item">
            <FiShoppingBag className="nav-icon" />
            <span>Products</span>
          </Link>

          <Link to="/buyerhome/orderhistory" onClick={() => setMenuOpen(false)} className="nav-item">
            <i className="fa-solid fa-box nav-icon"></i>
            <span>Orders</span>
          </Link>

          <Link to="/buyerhome/profile" onClick={() => setMenuOpen(false)} className="nav-item">
            <CgProfile className="nav-icon" />
            <span>Profile</span>
          </Link>

          {/* Mobile Logout (shows only in mobile menu) */}
          <button className="mobile-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>

        {/* Right Actions (Cart, Notifications, Desktop Logout, Hamburger) */}
        <div className="header-actions">
          <Link to="/buyerhome/notifications" className="action-icon-btn">
            <RiNotification2Fill />
            <span className="notification-dot"></span>
          </Link>

          <Link to="/buyerhome/Cart" className="action-icon-btn cart-btn">
            <BsCart3 />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <button className="desktop-logout-btn" onClick={handleLogout}>
            Logout
          </button>

          {/* Hamburger Menu Icon */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
        
      </div>
    </header>
  );
}
