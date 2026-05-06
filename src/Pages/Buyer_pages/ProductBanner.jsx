import React, { useEffect, useRef } from "react";
import "./ProductBanner.css";
import banner4 from "../../assets/Banners/image copy 4.png";
import banner5 from "../../assets/Banners/image copy 5.png";
import banner6 from "../../assets/Banners/image copy 6.png";
import banner9 from "../../assets/Banners/image copy 3.png";
import banner8 from "../../assets/Banners/image copy 7.png";
import { useNavigate } from "react-router-dom";

const ProductBanner = () => {
  const sliderRef = useRef(null);
  const banner_img = [ banner6, banner8, banner5, banner9, banner4];
  const navigate = useNavigate();
  const loopBanners = [...banner_img, ...banner_img];

  // 🔥 Auto scroll
  useEffect(() => {
    const slider = sliderRef.current;

    const interval = setInterval(() => {
      if (slider) {
        // Scroll by the width of one card + gap (16px)
        const cardWidth = slider.querySelector('.banner-card')?.offsetWidth || 0;
        const gap = 16;
        
        // If we reached the end, snap back to start
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
        }
      }
    }, 3500); // Wait 3.5 seconds before scrolling

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-section">
      <div className="banner-slider" ref={sliderRef}>
        {loopBanners.map((banner, index) => (
          <div className="banner-card" key={index}>
            <img src={banner} alt={`Banner ${index + 1}`} />
            <div className="banner-overlay-modern">
              <div className="banner-content">
                <span className="banner-badge">Hot Deal</span>
                <h3>Fresh from Farm</h3>
                <p>Up to 20% off on selected items</p>
                <button className="modern-btn" onClick={ () => navigate("productlist")}>Shop Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBanner;