import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProducts.css";
import { API_URL } from "../../config";

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
    <div className="myproducts-container">
      {/* <h2>My Products</h2> */}

      <button
        className="add-btn"
        onClick={() => navigate("/farmerhome/addproduct")}
      >
        + Add Product
      </button>

      <div className="products-grid">
        {products.length === 0 ? (
          <p className="no-product">No Products Found</p>
        ) : (
          products.map((item) => (
        
          <div className="product-card"     key={item.id}
          onClick={() => navigate(`/farmerhome/product/${item.id}`)}
              style={{ cursor: "pointer" }}>
              <div className="image-wrapper">
               <img 
  src={
    item.images?.length > 0
      ? item.images[0].image_url
      : "https://via.placeholder.com/300"
  }
  alt={item.name}
/>
                  <span className="badge">{item.quality_grade} ⭐</span>
                </div>

                <div className="card-body">
                    <h2>{item.name}</h2>
                    {/* <p className="description">  {item.description} </p> */}

                  <div className="price-stockk">
                      <span className="pricee">₹{item.price_per_unit} <small>/{item.unit_type}</small></span>
                   <span className="stockk">{item.available_quantity} {item.unit_type} Available  </span>
                  </div>

                    {/* <p className="harvest">Harvest Date: {item.harvest_date}</p> */}
                  <div className="location-f">
                   📍  {item.location}  |  🚚 {item.delivery_option}
                  </div>
                  <div className="buttons">
                   <button className="edit-button" onClick={(e) =>{ e.stopPropagation();  navigate(`/farmerhome/editproduct/${item.id}`)  }}>Edit</button>
                    <button className="delete-button"  onClick={(e) =>{ e.stopPropagation(); handleDelete(item.id)}}>Delete</button>
                 </div>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
