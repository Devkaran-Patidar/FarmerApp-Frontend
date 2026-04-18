import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ShopNow.css";
import { API_URL } from "../../config";

const ShopNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [isProcessing, setIsProcessing] = useState(false);

  const state = location.state;

  if (!state || !state.items) {
    return (
      <div className="checkout-empty">
        <h3>No checkout data found.</h3>
        <button className="checkout-btn-back" onClick={() => navigate("/buyerhome")}>
          Go to Home
        </button>
      </div>
    );
  }

  const items = state.items;
  const total = state.total;

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch(`${API_URL}/api/farmer/create-order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items, total }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Order failed");
        setIsProcessing(false);
        return;
      }

      let opinion = window.confirm("Purchase Successful 🎉. Print Receipt?");
      if (opinion) {
        navigate(`/buyerhome/receipt/${data.order_id}/`);
      } else {
        navigate("/buyerhome");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-modern-wrapper">
      <div className="checkout-header-actions">
        <button className="checkout-back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Back to Cart
        </button>
      </div>

      <div className="checkout-container">
        <div className="checkout-main">
          <div className="checkout-header">
            <h2>Secure Checkout</h2>
            <p>Review your items and confirm your purchase.</p>
          </div>

          <div className="checkout-items-list">
            <h3>Order Items ({items.length})</h3>
            <div className="checkout-items-scroll">
              {items.map((item) => (
                <div className="checkout-item-card" key={item.id}>
                  <div className="checkout-item-details">
                    <h4>{item.product.name}</h4>
                    <span className="checkout-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <div className="checkout-item-price">
                    ₹{(item.quantity * item.product.price_per_unit).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="checkout-sidebar">
          <div className="checkout-summary-card">
            <h3>Payment Summary</h3>
            
            <div className="checkout-summary-row">
              <span>Item Total</span>
              <span>₹{total}</span>
            </div>
            
            <div className="checkout-summary-row">
              <span>Delivery Fee</span>
              <span className="free-text">Free</span>
            </div>
            
            <div className="checkout-summary-divider"></div>
            
            <div className="checkout-summary-row total-row">
              <span>Grand Total</span>
              <span>₹{total}</span>
            </div>

            <button 
              className={`checkout-btn-confirm ${isProcessing ? 'processing' : ''}`}
              onClick={handleConfirmPurchase}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
              ) : (
                <><i className="fa-solid fa-lock"></i> Confirm Purchase</>
              )}
            </button>

            <div className="checkout-trust-badges">
              <span><i className="fa-solid fa-shield-check"></i> Secure Payment</span>
              <span><i className="fa-solid fa-truck-fast"></i> Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNow;