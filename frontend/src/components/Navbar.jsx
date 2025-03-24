import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
// import { FaCircleUser } from "react-icons/fa6";
import { LiaUserCircleSolid } from "react-icons/lia";
import { isAuthenticated, logout } from "../utils/auth";

export default function Navbar() {
  console.log("Navbar component rendering...");

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    console.log("authChange event fired! Checking auth...");
  setIsLoggedIn(isAuthenticated()); // ✅ Navbar turant update karega

  const checkAuth = () => {
    console.log("Auth status changed, updating navbar...");
    setIsLoggedIn(isAuthenticated());
  };

  window.addEventListener("authChange", checkAuth);
  return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  const handleLogout = () => {
    logout(() => {
      navigate("/login");
    });
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Jobify</h2>

      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
          </>
        ) : (
          <div className="user-menu">
            {/* ✅ Show user icon if logged in */}
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="user-icon">
              <LiaUserCircleSolid size={24} />
            </button>

            {dropdownOpen && (
              <div className="profile-dropdown">
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>View Profile</Link>
                <Link to="/documents" onClick={() => setDropdownOpen(false)}>Your Documents</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
