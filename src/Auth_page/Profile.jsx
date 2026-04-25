import "./Profile.css";
import { useState, useEffect } from "react";
import { API_URL } from "../config";
import { FaCircleUser, FaEnvelope, FaPhone, FaUserShield, FaPen } from "react-icons/fa6";
import loder from "../assets/loder/preloader.gif";

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("access_token");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId || !accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/api/user/profile/${userId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Server error:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
 
    fetchProfile();
  }, [userId, accessToken]);

  return (
    <section className="profile-page">
      <div className="profile-container">
        {loading ? (
          <div className="profile-loading">
            <img src={loder} alt="loading..." className="loader-gif" />
          </div>
        ) : profile ? (
          <>
            <div className="profile-header-bg"></div>
            <div className="profile-content-wrapper">
              <div className="profile-image-wrapper">
                {profile.avatar ? (
                  <img
                    src={`https://farmerapp-backend-jhru.onrender.com${profile.avatar}`}
                    alt={profile.username}
                    className="profile-avatar"
                  />
                ) : (
                  <FaCircleUser className="default-avatar-icon" />
                )}
                <button className="edit-avatar-btn" title="Change Avatar">
                  <FaPen />
                </button>
              </div>

              <div className="profile-main-info">
                <h2 className="profile-name">{profile.username}</h2>
                <div className="profile-role-badge">
                  <FaUserShield className="role-icon" />
                  {profile.role || "User"}
                </div>
              </div>

              <div className="profile-details-grid">
                <div className="detail-card">
                  <div className="detail-icon-wrapper email-icon">
                    <FaEnvelope />
                  </div>
                  <div className="detail-info">
                    <span className="detail-label">Email Address</span>
                    <span className="detail-value">{profile.email || "Not provided"}</span>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon-wrapper phone-icon">
                    <FaPhone />
                  </div>
                  <div className="detail-info">
                    <span className="detail-label">Phone Number</span>
                    <span className="detail-value">{profile.phone_number || "Not provided"}</span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="btn-edit-profile">Edit Profile</button>
              </div>
            </div>
          </>
        ) : (
          <div className="profile-error">
            <p>Failed to load profile data.</p>
          </div>
        )}
      </div>
    </section>
  );
}
