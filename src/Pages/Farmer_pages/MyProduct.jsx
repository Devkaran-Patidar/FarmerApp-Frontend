import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProducts.css";
import { API_URL } from "../../config";
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiTruck } from "react-icons/fi";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/farmer/myproduct/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
        // console.log(data)
      } else {
        console.log("Error:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await fetch(
      `${API_URL}/api/farmer/deleteproduct/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProducts();
  };

  return (
    <div className="farmer-page-container">
      <div className="farmer-page-header">
        <div>
          <h2 className="farmer-page-title">My Products</h2>
          <p className="farmer-page-subtitle">Manage your inventory and product listings</p>
        </div>
        <button
          className="farmer-btn-primary"
          onClick={() => navigate("/farmerhome/addproduct")}
        >
          <FiPlus /> Add Product
        </button>
      </div>

      <div className="farmer-products-grid">
        {products.length === 0 ? (
          <div className="farmer-empty-state">
            <p>No Products Found</p>
            <button onClick={() => navigate("/farmerhome/addproduct")}>Create your first product</button>
          </div>
        ) : (
          products.map((item) => (
            <div 
              className="farmer-product-card" 
              key={item.id}
              onClick={() => navigate(`/farmerhome/product/${item.id}`)}
            >
              <div className="farmer-product-image">
                <img 
                  src={
                    item.images?.length > 0
                      ? item.images[0].image_url
                      : "https://via.placeholder.com/300"
                  }
                  alt={item.name}
                />
                <span className="farmer-badge-grade">Grade {item.quality_grade}</span>
              </div>

              <div className="farmer-product-content">
                <h3 className="farmer-product-name">{item.name}</h3>

                <div className="farmer-product-price-row">
                  <span className="farmer-product-price">₹{item.price_per_unit} <small>/{item.unit_type}</small></span>
                  <span className="farmer-product-stock">{item.available_quantity} {item.unit_type} left</span>
                </div>

                <div className="farmer-product-meta">
                  <span><FiMapPin /> {item.location}</span>
                  <span><FiTruck /> {item.delivery_option}</span>
                </div>

                <div className="farmer-product-actions">
                  <button 
                    className="farmer-btn-icon edit" 
                    onClick={(e) => { e.stopPropagation(); navigate(`/farmerhome/editproduct/${item.id}`); }}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button 
                    className="farmer-btn-icon delete"  
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
