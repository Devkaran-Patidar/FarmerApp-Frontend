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
    // console.log(data)
    alert(data.message || data.error);
  };

  return (
    <div className="forgetpass">
      <form onSubmit={handleSubmit} className="forgetform">
      <p>Forgot Password</p>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        
        required
      /> 
      <button type="submit">Send Reset Link</button>
    </form>
    </div>
  );
}