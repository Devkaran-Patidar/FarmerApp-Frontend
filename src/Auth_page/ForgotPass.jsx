import { useState } from "react";
import "./Forgetpass.css"
import { API_URL } from "../config";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/user/forgot-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-subtitle">Enter your email to receive a reset link.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <input
              type="email"
              className="auth-input"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            /> 
          </div>
          <button type="submit" className="auth-button">Send Reset Link</button>
        </form>
      </div>
    </section>
  );
}