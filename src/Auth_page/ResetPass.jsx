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
    <div className="resetpass">
      <form onSubmit={handleSubmit}>
      <h2>Set New Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
    </div>
  );
}