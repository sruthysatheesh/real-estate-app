import { useState, useContext, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // Debugging - can be removed in production
  useEffect(() => {
    console.log("Current user in Navbar:", currentUser);
  }, [currentUser]);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Real Estate Logo" />
          <span>Estate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/agents">Agents</Link>
      </div>

      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/noavatar.jpeg"}
              alt={currentUser.username || "User profile"}
            />
            <span>{currentUser.username || "User"}</span>
            <Link to="/profile" className="profile">
              {<div className="notification">3</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </>
        )}

        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Navigation menu"
            onClick={() => setOpen(!open)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
          />
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="menu">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link to="/agents" onClick={() => setOpen(false)}>Agents</Link>
            {currentUser ? (
              <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
                <Link to="/register" onClick={() => setOpen(false)}>Sign up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;