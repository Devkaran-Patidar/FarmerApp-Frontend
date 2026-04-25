import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { API_URL } from "../config";

export default function Login({ islogin, setIslogin }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (islogin) {
      const role = localStorage.getItem("role");
      if (role === "farmer") navigate("/farmerhome");
      else if (role === "buyer") navigate("/buyerhome");
    }
  }, [islogin, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await fetch(`${API_URL}/api/user/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Invalid credentials");
        return;
      }

      // Store JWT tokens
      localStorage.setItem("access_token", result.access);
      localStorage.setItem("refresh_token", result.refresh);

      localStorage.setItem("islogin", "true");
      localStorage.setItem("role", result.user.role);
      localStorage.setItem("userId", result.user.id);
      setIslogin(true);

      const role = result.user.role.toLowerCase();
      if (role === "farmer") navigate("/farmerhome");
      else if (role === "buyer") navigate("/buyerhome");
      else alert("Unknown role: " + role);

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-input-group">
            <input
              type="email"
              id="email"
              name="email"
              className="auth-input"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="auth-input-group">
            <input
              type="password"
              id="password"
              name="password"
              className="auth-input"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="auth-button">Sign In</button>
        </form>
        <div className="auth-links">
          <Link to="/forgotpass" className="auth-link">Forgot Password?</Link>
          <p>
            Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
