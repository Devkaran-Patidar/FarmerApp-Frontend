import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BestSellers.css";
import { FaAward } from "react-icons/fa";

const BestSellers = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const sellers = [
    { id: 1, name: "Ramesh Kumar", image: "https://i.pravatar.cc/100?img=1", rating: 4.8 },
    { id: 2, name: "Sita Devi", image: "https://i.pravatar.cc/100?img=2", rating: 4.7 },
    { id: 3, name: "Amit Sharma", image: "https://i.pravatar.cc/100?img=3", rating: 4.9 },
    { id: 4, name: "Priya Singh", image: "https://i.pravatar.cc/100?img=4", rating: 4.6 },
    { id: 5, name: "Rahul Verma", image: "https://i.pravatar.cc/100?img=5", rating: 4.8 },
  ];

  // Duplicate for infinite scroll
  const loopSellers = [...sellers, ...sellers];

  // 🔥 Auto horizontal scroll
  useEffect(() => {
    const slider = sliderRef.current;

    const interval = setInterval(() => {
      if (slider) {
        slider.scrollLeft += 1;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="seller-section">
      <div className="section-header">
        <h2>Top Sellers</h2>
        <FaAward className="section-icon text-yellow-500" style={{ color: "#eab308" }} />
      </div>

      <div className="seller-slider" ref={sliderRef}>
        {loopSellers.map((seller, index) => (
          <div
            className="seller-card"
            key={index}
            onClick={() => navigate(`/seller/${seller.id}`, { state: seller })}
          >
            <div className="seller-image-wrapper">
              <img src={seller.image} alt={seller.name} />
              <div className="seller-rating-badge">⭐ {seller.rating}</div>
            </div>

            <div className="seller-info">
              <h4>{seller.name}</h4>
              <p>Verified Farmer</p>
            </div>
            
            <button className="visit-store-btn">Visit Store</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;