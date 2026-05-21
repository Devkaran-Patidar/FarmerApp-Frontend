import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BestSellers.css";
import { FaAward } from "react-icons/fa";
import { API_URL } from "../../config";

const BestSellers = () => {

  const navigate = useNavigate();
  const sliderRef = useRef(null);

  // state
  const [sellers, setSellers] = useState([]);

  // auto scroll slider
  useEffect(() => {

    const slider = sliderRef.current;

    const interval = setInterval(() => {

      if (slider) {

        // reset scroll when end reached
        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth
        ) {
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft += 1;
        }
      }

    }, 20);

    return () => clearInterval(interval);

  }, []);

  // fetch top sellers
  useEffect(() => {

    const fetchSellers = async () => {

      try {

        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `${API_URL}/api/farmer/topbuyers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // token expired
        if (response.status === 401) {

          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          navigate("/login");

          return;
        }

        const data = await response.json();

        console.log("API:", data);

        // safe array check
        if (Array.isArray(data)) {
          setSellers(data);
        } else {
          setSellers([]);
        }

      } catch (error) {

        console.log("Fetch Error:", error);
        setSellers([]);

      }
    };

    fetchSellers();

  }, [navigate]);

  // duplicate items for smooth loop effect
  const loopSellers = Array.isArray(sellers)
    ? [...sellers, ...sellers]
    : [];

  return (

    <div className="seller-section">

      <div className="section-header">
        <h2>Top Sellers</h2>
        <FaAward style={{ color: "#eab308" }} />
      </div>

      <div
        className="seller-slider"
        ref={sliderRef}
      >

        {loopSellers.length > 0 ? (

          loopSellers.map((seller, index) => (

            <div
              className="seller-card"
              key={index}
              onClick={() =>
                navigate(`/buyerhome/visitstore/${seller.id}`)
              }
            >

              <div className="seller-image-wrapper">

                <img
                  src={
                    seller.avatar ||
                    "https://i.pravatar.cc/100"
                  }
                  alt={seller.username || "Seller"}
                />

                <div className="seller-rating-badge">
                  ⭐ {seller.rating || "4.5"}
                </div>

              </div>

              <div className="seller-info">
                <h4>{seller.username || "Unknown Seller"}</h4>
                <p>Verified Farmer</p>
              </div>

              <button className="visit-store-btn">
                Visit Store
              </button>

            </div>

          ))

        ) : (

          <p className="no-sellers">
            No sellers available
          </p>

        )}

      </div>

    </div>
  );
};

export default BestSellers;