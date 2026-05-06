import "./FarmerHeader.css";
import logo from "../../assets/logo/homelogo.png";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi"; // Better icons

export default function FarmerHeader({ islogin, setIslogin }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIslogin(false);
    navigate("/login");
  };

  return (
    <header className="farmer-header">
      <div className="farmer-header-container">
        <div className="farmer-logo">
          <Link to="/">
            <img src={logo} alt="AgroMart Logo" />
          </Link>
        </div>

        <div className="farmer-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        <nav className={`farmer-nav ${menuOpen ? "active" : ""}`}>
          <Link to="/farmerhome" onClick={() => setMenuOpen(false)}>
            <AiFillProduct className="nav-icon" />
            My Products
          </Link>

          <Link to="/farmerhome/farmerorders" onClick={() => setMenuOpen(false)}>
            <FaShoppingBag className="nav-icon" />
            Orders
          </Link>
          
          <Link to="/farmerhome/farmerearning" onClick={() => setMenuOpen(false)}>
            <GiTakeMyMoney className="nav-icon" />
            Earnings
          </Link>

          <Link to="/farmerhome/profile" onClick={() => setMenuOpen(false)}>
            <CgProfile className="nav-icon" />
            Profile
          </Link>

          <button className="farmer-logout-btn" onClick={handleLogout}>
            <FiLogOut className="nav-icon" />
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
