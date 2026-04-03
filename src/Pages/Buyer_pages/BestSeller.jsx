import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BestSellers.css";

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

        // reset smoothly
        // if (slider.scrollLeft >= slider.scrollWidth / 2) {
        //   slider.scrollLeft = 0;
        // }
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="seller-section">
      <h3>Best Sellers</h3>

      <div className="seller-slider" ref={sliderRef}>
        {loopSellers.map((seller, index) => (
          <div
            className="seller-card"
            key={index}
            onClick={() => navigate(`/seller/${seller.id}`, { state: seller })}
          >
            <img src={seller.image} alt={seller.name} />

            <div className="seller-info">
              <h4>{seller.name}</h4>
              <p>⭐ {seller.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;