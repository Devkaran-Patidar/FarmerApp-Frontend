import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./Register.css";
import { API_URL } from "../config";

export default function Register({ islogin, setIslogin }) {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("role", e.target.role.value);
    formData.append("username", e.target.username.value);
    formData.append("email", e.target.email.value);
    formData.append("avatar", e.target.avatar.files[0]); // renamed to avatar
    formData.append("phone_number", e.target.number.value);
    formData.append("password", e.target.password.value);

    try {
      const res = await fetch(`${API_URL}/api/user/register/` , {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      // console.log(result)

      if (!res.ok) {
  let errorMessage = "";

  for (let key in result) {
    errorMessage += `${key}: ${result[key][0]}\n`;
  }

  alert(errorMessage);
  return;
}
      // After registration, automatically login to get JWT
      const loginRes = await fetch(`${API_URL}/api/user/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        alert("Auto login failed!");
        return;
      }

      // Store JWT tokens in localStorage
      localStorage.setItem("access_token", loginData.access);
      localStorage.setItem("refresh_token", loginData.refresh);

      localStorage.setItem("role", loginData.user.role);
      localStorage.setItem("userId", loginData.user.id);
      localStorage.setItem("islogin", "true");
      setIslogin(true);


      const role = loginData.user.role.toLowerCase();
      if(role === "farmer")  {
        navigate("/farmerhome")
      }
      else if (role === "buyer") {
        navigate("/buyerhome");
      }
      else{
         alert("Unknown role: " + role);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <form className="auth-form" onSubmit={handleSignup} encType="multipart/form-data">
          <div className="auth-input-group">
            <select name="role" className="auth-input" required defaultValue="">
              <option value="" disabled>Select Role</option>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
          <div className="auth-input-group">
            <input type="text" name="username" className="auth-input" placeholder="Full Name" required />
          </div>
          <div className="auth-input-group">
            <input type="email" name="email" className="auth-input" placeholder="Email Address" required />
          </div>
          <div className="auth-input-group">
            <input type="file" name="avatar" className="auth-input" accept="image/*" required />
          </div>
          <div className="auth-input-group">
            <input type="tel" name="number" className="auth-input" placeholder="Phone Number" pattern="[0-9]{10}" minLength={10} maxLength={10} required />
          </div>
          <div className="auth-input-group">
            <input type="password" name="password" className="auth-input" placeholder="Password" required />
          </div>

          <button type="submit" className="auth-button">Sign Up</button>

          <div className="auth-links">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
