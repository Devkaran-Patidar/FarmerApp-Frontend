import { useParams } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import "./Resetpass.css"
export default function ResetPassword() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const decodedToken = token

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
     const res = await fetch(
      `${API_URL}/api/user/reset-password/${uid}/${decodedToken}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();
    console.log(data)
    alert(data.message || data.error);
    navigate("/login");
  
  }
  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Set New Password</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <input
              type="password"
              className="auth-input"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Reset Password</button>
        </form>
      </div>
    </section>
  );
}