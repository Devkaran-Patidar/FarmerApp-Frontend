import React, { useEffect, useRef } from "react";
import "./category.css";
import { useNavigate } from "react-router-dom";

import fruitsImage from "../../assets/Category/image copy 4.png";
import vegetablesImage from "../../assets/Category/image.png";
import flowersImage from "../../assets/Category/image copy.png";
import dairyProductsImage from "../../assets/Category/image copy 5.png";
import grainsImage from "../../assets/Category/image copy 2.png";
import spicesImage from "../../assets/Category/image copy 7.png";
import Fertilizers from "../../assets/Category/image copy 6.png";
import Pulses from "../../assets/Category/image copy 3.png";

export default function Category() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleCategoryClick = (cat) => {
    navigate("/buyerhome/productlist", {
      state: { category: cat },
    });
  };

  // ✅ Auto Scroll Logic
  useEffect(() => {
    const container = scrollRef.current;

    let scrollAmount = 0;

    const autoScroll = () => {
      if (container) {
        scrollAmount += 1;
        container.scrollLeft += 1;

        // // Reset scroll when reached end
        // if (
        //   container.scrollLeft + container.clientWidth >=
        //   container.scrollWidth
        // ) {
        //   container.scrollLeft = 0;
        //   scrollAmount = 0;
        // }
      }
    };

    const interval = setInterval(autoScroll, 20);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Fruits", image: fruitsImage },
    { name: "Vegetables", image: vegetablesImage },
    { name: "Pulses", image: Pulses },
    { name: "Dairy Products", image: dairyProductsImage },
    { name: "Fertilizers", image: Fertilizers },
    { name: "Spices", image: spicesImage },
    { name: "Flowers", image: flowersImage },
    { name: "Grains", image: grainsImage },
  ];

  return (
    <div className="category-section">
      <h2 className="category-title">Explore Categories</h2>

      <div className="category-container" ref={scrollRef}>
        {categories.map((category) => (
          <div
            className="cat-container"
            onClick={() => handleCategoryClick(category.name)}
            key={category.name}
          >
            <img src={category.image} alt={category.name} />
            <h4>{category.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}