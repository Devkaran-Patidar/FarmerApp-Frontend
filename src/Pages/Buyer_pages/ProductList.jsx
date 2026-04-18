import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// const API_BASE = "http://127.0.0.1:8000"; 
import "./productlist.css"
import { API_URL } from "../../config";
import { useLocation } from "react-router-dom";

const ProductPage = ({setCartCount,cartCount}) => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  // Fetch all products
  const location = useLocation();
 useEffect(() => {
  const selectedCategory = location.state?.category || "";

  setCategory(selectedCategory);

  fetchProducts(searchTerm, selectedCategory);

  if (token) {
    fetchCart();
  }
}, []);

  const fetchProducts = async (query ="",cat = "") => {
    try {
      const res = await fetch(`${API_URL}/api/farmer/allproducts/?search=${query}&category=${cat}`);
      const data = await res.json();
      setProducts(data);
      // console.log(data)
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  // Fetch cart count
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


  // Add To Cart
  const handleAddToCart = async (productId) => {
  if (!token) {
    alert("Please login first");
    return;
  }

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
    // alert("Added to cart!");
    // setCartCount +=1; 
    fetchCart();
    navigate("/buyerhome"); 
    setCartItems((prev) => [...prev, productId]);
  
  }
};

  // Buy Now
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
          product: product,
          quantity: 1,
        },
      ],
      total: product.price_per_unit,
    },
  });
};


  return (
    <div className="allproduct-page">
      
      <div className="product-navbar sticky-navbar">        
        <div className="searchbar modern-searchbar">
          <div className="search-input-wrapper">
            <i className="fa-solid fa-magnifying-glass search-icon" style={{ color: '#64748b' }}></i>
            <input 
              type="text" 
              name="searchbar" 
              placeholder="Search for fresh farm products..."  
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                fetchProducts(value, category);  
              }} 
            />
          </div>
        </div>
      </div>

      <div className="allproduct modern-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card modern-product-card" 
            onClick={() => navigate(`/buyerhome/product/${product.id}`)}>
            
            <div className="image-wrapper modern-image-wrapper">
              {product.images && product.images.length > 0 ? (
                <img src={product.images[0].image_url} alt={product.name} />
              ) : (
                <div className="no-image-placeholder">
                  <i className="fa-solid fa-image"></i>
                </div>
              )}
              <span className="modern-badge">⭐ {product.quality_grade}</span>
            </div>
            
            <div className="card-body modern-card-body">
              <h2 className="product-title" title={product.name}>{product.name}</h2>
              
              <div className="price-stockk modern-price-stock">
                <span className="pricee modern-price">
                  ₹{product.price_per_unit} <small className="unit-type">/{product.unit_type}</small>
                </span>
                <span className="stockk modern-stock">
                  <span className="stock-dot"></span> {product.available_quantity} {product.unit_type} Available
                </span>
              </div>

              <div className="location modern-location">
                <div className="loc-item"><i className="fa-solid fa-location-dot"></i> {product.location}</div>
                <div className="loc-item"><i className="fa-solid fa-truck"></i> {product.delivery_option}</div>
              </div>
              
              <div className="buttonns modern-buttons">
                <button 
                  className={`modern-cart-btn ${cartItems.includes(product.id) ? 'in-cart' : ''}`}  
                  onClick={(e) => {  
                    e.stopPropagation(); 
                    if (cartItems.includes(product.id)) {
                      navigate("/buyerhome/cart");
                    } else {
                      handleAddToCart(product.id);
                    }
                  }}
                >
                  <i className={`fa-solid ${cartItems.includes(product.id) ? 'fa-cart-arrow-down' : 'fa-cart-plus'}`}></i>
                  {cartItems.includes(product.id) ? "Go to Cart" : "Add to Cart"}
                </button>
                <button 
                  className="modern-buy-btn"  
                  onClick={(e) => {
                    handleBuyNow(product); 
                    e.stopPropagation();
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