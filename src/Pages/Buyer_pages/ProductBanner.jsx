import React, { useEffect, useRef } from "react";
import "./ProductBanner.css";
import banner1 from "../../assets/Banners/image.png";
import banner2 from "../../assets/Banners/image copy 2.png";
import banner3 from "../../assets/Banners/image copy 3.png";
import banner4 from "../../assets/Banners/image copy 4.png";
import banner5 from "../../assets/Banners/image copy 5.png";
import banner6 from"../../assets/Banners/image copy 6.png";
// import banner7 from "../../assets/Banners/image copy 7.png";
import banner8 from "../../assets/Banners/image copy 8.png";
import banner9 from "../../assets/Banners/image copy 9.png";
import banner10 from "../../assets/Banners/image copy.png";
const ProductBanner = () => {
  const sliderRef = useRef(null);
  const banner_img = [ banner2, banner4, banner5, banner6, banner8, banner9, banner10];
  
  const loopBanners = [...banner_img, ...banner_img];

  // 🔥 Auto scroll
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
    <div className="banner-section">
      <div className="banner-slider" ref={sliderRef}>
        {loopBanners.map((banner, index) => (
          <div className="banner-card" key={index}>
            <img src={banner} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBanner;