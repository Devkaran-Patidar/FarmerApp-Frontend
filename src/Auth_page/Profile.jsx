import "./Profile.css";
import { useState, useEffect } from "react";
import { API_URL } from "../config";
import { FaCircleUser } from "react-icons/fa6";
import loder from"../assets/loder/preloader.gif"

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("access_token");
  console.log("TOKEN:", accessToken);

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
          //  console.log("PROFILE DATA:", data);
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
          <div className="profile-loading">Loading...</div>
        ) : profile ? (
          <>
            <div className="profile-image">
              <img
                src={
                  profile.avatar
                    ? `https://farmerapp-backend-jhru.onrender.com${profile.avatar}`
                    : <FaCircleUser />
                }
                alt={profile.username}
              />
            </div>

            <div className="profile-details">
              <h2><strong>Name: </strong> {profile.username}</h2>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Phone:</strong> {profile.phone_number}</p>
            </div>
          </>
        ) : (
          <div className="profile-error"><img src={loder} alt="loder" /></div>
        )}
      </div>
    </section>
  );
}
