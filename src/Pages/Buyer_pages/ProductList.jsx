import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./productlist.css";
import { API_URL } from "../../config";

const ProductPage = ({ setCartCount, cartCount }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const selectedCategory = location.state?.category || "";

    setCategory(selectedCategory);

    fetchProducts(searchTerm, selectedCategory);

    if (token) {
      fetchCart();
    }
  }, []);

  // ===== Fetch Products =====
  const fetchProducts = async (query = "", cat = "") => {
    try {
      const res = await fetch(
        `${API_URL}/api/farmer/allproducts/?search=${query}&category=${cat}`
      );

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  // ===== Fetch Cart =====
  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_URL}/api/farmer/view-cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setCartCount(data.cart_count);
      }
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  };

  // ===== Add To Cart =====
  const handleAddToCart = async (productId) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/farmer/add-to-cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });

      if (res.ok) {
        fetchCart();

        setCartItems((prev) => [...prev, productId]);

        navigate("/buyerhome");
      }
    } catch (err) {
      console.error("Error adding to cart", err);
    }
  };

  // ===== Buy Now =====
  const handleBuyNow = (product) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    navigate("/buyerhome/shop-now", {
      state: {
        items: [
          {
            id: product.id,
            product,
            quantity: 1,
          },
        ],
        total: product.price_per_unit,
      },
    });
  };

  return (
    <div className="marketplace-page">

      {/* ===== Search Bar ===== */}
      <div className="marketplace-navbar">
        <div className="marketplace-searchbox">

          <i className="fa-solid fa-magnifying-glass marketplace-search-icon"></i>

          <input
            type="text"
            placeholder="Search fresh farm products..."
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;

              setSearchTerm(value);

              fetchProducts(value, category);
            }}
          />
        </div>
      </div>

      {/* ===== Product Grid ===== */}
      <div className="marketplace-grid">

        {products.map((product) => (
          <div
            key={product.id}
            className="marketplace-card"
            onClick={() =>
              navigate(`/buyerhome/product/${product.id}`)
            }
          >

            {/* ===== Product Image ===== */}
            <div className="marketplace-image-box">

              {product.images?.length > 0 ? (
                <img
                  src={product.images[0].image_url}
                  alt={product.name}
                />
              ) : (
                <div className="marketplace-empty-image">
                  <i className="fa-solid fa-image"></i>
                </div>
              )}

              <span className="marketplace-quality-badge">
                ⭐ {product.quality_grade}
              </span>
            </div>

            {/* ===== Product Content ===== */}
            <div className="marketplace-content">

              {/* Product Title */}
              <h3 className="marketplace-title">
                {product.name}
              </h3>

              {/* Price & Stock */}
              <div className="marketplace-meta">

                <div className="marketplace-price">
                  ₹{product.price_per_unit}
                  <span>/{product.unit_type}</span>
                </div>

                <div className="marketplace-stock">
                  <span className="marketplace-stock-indicator"></span>

                  {product.available_quantity} {product.unit_type}
                </div>
              </div>

              {/* Product Info */}
              <div className="marketplace-details">

                <p>
                  📍 {product.location}
                </p>

                <p>
                  🚚 {product.delivery_option}
                </p>
              </div>

              {/* Buttons */}
              <div className="marketplace-actions">

                {/* Add To Cart */}
                <button
                  className={`marketplace-cart-btn ${
                    cartItems.includes(product.id)
                      ? "active-cart"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (cartItems.includes(product.id)) {
                      navigate("/buyerhome/cart");
                    } else {
                      handleAddToCart(product.id);
                    }
                  }}
                >
                  <i
                    className={`fa-solid ${
                      cartItems.includes(product.id)
                        ? "fa-cart-arrow-down"
                        : "fa-cart-plus"
                    }`}
                  ></i>

                  {cartItems.includes(product.id)
                    ? "Go to Cart"
                    : "Add to Cart"}
                </button>

                {/* Buy Now */}
                <button
                  className="marketplace-buy-btn"
                  onClick={(e) => {
                    e.stopPropagation();

                    handleBuyNow(product);
                  }}
                >
                  Buy Now
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;