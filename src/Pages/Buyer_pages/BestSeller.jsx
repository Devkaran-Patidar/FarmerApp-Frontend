import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BestSellers.css";
import { FaAward } from "react-icons/fa";
import { API_URL } from "../../config";

const BestSellers = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  // ✅ ONE state only
  const [sellers, setSellers] = useState([]);

  // 🔥 Auto scroll
  useEffect(() => {
    const slider = sliderRef.current;

    const interval = setInterval(() => {
      if (slider) slider.scrollLeft += 1;
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch API
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch(`${API_URL}/api/farmer/topbuyers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("API:", data);
        setSellers(data);
      });
  }, []);

  // duplicate for loop effect
  const loopSellers = [...sellers, ...sellers];

  return (
    <div className="seller-section">
      <div className="section-header">
        <h2>Top Sellers</h2>
        <FaAward style={{ color: "#eab308" }} />
      </div>

      <div className="seller-slider" ref={sliderRef}>
        {loopSellers.map((seller, index) => (
          <div
            className="seller-card"
            key={index}
            onClick={() =>
              navigate(`/buyerhome/visitstore/${seller.id}`)
            }
          >
            <div className="seller-image-wrapper">
              <img
                src={seller.avatar || "https://i.pravatar.cc/100"}
                alt={seller.username}
              />
              <div className="seller-rating-badge">
                ⭐ {seller.rating || "4.5"}
              </div>
            </div>

            <div className="seller-info">
              <h4>{seller.username}</h4>
              <p>Verified Farmer</p>
            </div>

            <button className="visit-store-btn">
              Visit Store
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;