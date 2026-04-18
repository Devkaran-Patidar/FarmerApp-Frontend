import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { API_URL } from "../../config";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const sliderRef = useRef(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch(`${API_URL}/api/farmer/product/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, [id, token]);

  if (!product) return <div className="pd-loading">Loading product details...</div>;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  const handleAddToCart = async (productId) => {
    if (!token) {
      alert("Please login first");
      return;
    }
    const res = await fetch(`${API_URL}/api/farmer/add-to-cart/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
    });
    if (res.ok) navigate("/buyerhome/cart");
  };

  const handleBuyNow = (product) => {
    if (!token) {
      alert("Please login first");
      return;
    }
    navigate("/buyerhome/shop-now", {
      state: { items: [{ id: product.id, product: product, quantity: 1 }], total: product.price_per_unit },
    });
  };

  return (
    <div className="pd-container">
      <button className="pd-back-btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>

      <div className="pd-content">
        {/* Left Side: Images */}
        <div className="pd-image-gallery">
          <div className="pd-slider-wrapper">
            <button className="pd-arrow left" onClick={scrollLeft}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="pd-slider" ref={sliderRef}>
              {product.images?.length > 0 ? (
                product.images.map((img, index) => (
                  <div className="pd-slide" key={img.id}>
                    <img src={img.image_url} alt={`${product.name}-${index}`} className="pd-image" />
                  </div>
                ))
              ) : (
                <div className="pd-no-image">
                  <i className="fa-solid fa-image"></i>
                  <p>No images available</p>
                </div>
              )}
            </div>

            <button className="pd-arrow right" onClick={scrollRight}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="pd-details-panel">
          <div className="pd-header-info">
            <h1 className="pd-title">{product.name}</h1>
            <div className="pd-badges">
              <span className="pd-badge quality">⭐ {product.quality_grade}</span>
              {product.available_quantity > 0 && (
                <span className="pd-badge instock">In Stock</span>
              )}
            </div>
          </div>

          <div className="pd-price-section">
            <h2 className="pd-price">₹{product.price_per_unit}</h2>
            <span className="pd-unit">/ {product.unit_type}</span>
          </div>

          <p className="pd-stock-info">
            <i className="fa-solid fa-box-open"></i> {product.available_quantity} {product.unit_type} Available
          </p>

          <div className="pd-actions">
            <button className="pd-btn-cart" onClick={() => handleAddToCart(product.id)}>
              <i className="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
            <button className="pd-btn-buy" onClick={() => handleBuyNow(product)}>
              <i className="fa-solid fa-bolt"></i> Buy Now
            </button>
          </div>

          <div className="pd-divider"></div>

          <div className="pd-info-sections">
            <div className="pd-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="pd-section pd-overview">
              <h3>Overview</h3>
              <ul>
                <li><i className="fa-solid fa-location-dot"></i> <strong>Location:</strong> {product.location}</li>
                <li><i className="fa-solid fa-truck"></i> <strong>Delivery:</strong> {product.delivery_option}</li>
                <li><i className="fa-regular fa-calendar"></i> <strong>Harvest Date:</strong> {product.harvest_date}</li>
              </ul>
            </div>
          </div>

          <div className="pd-disclaimer">
            <i className="fa-solid fa-circle-info"></i>
            <p>Every effort is made to maintain accuracy of all information. Actual product packaging and materials may contain more and/or different information.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;