import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Cart.css";
import emptycart from "../../assets/emptyCart.png";
import { API_URL } from "../../config";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_URL}/api/farmer/view-cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(data.items);
        setCartTotal(data.cart_total);
      }
    } catch (error) {
      console.error("Error fetching cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (itemId) => {
    await fetch(`${API_URL}/api/farmer/remove-cart/${itemId}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    await fetch(`${API_URL}/api/farmer/update-cart/${itemId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });
    fetchCart();
  };

  const goToCheckout = () => {
    navigate("/buyerhome/shop-now", {
      state: { items: cartItems, total: cartTotal },
    });
  };

  if (loading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  return (
    <div className="cart-modern-wrapper">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <p>{cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty-state">
          <img src={emptycart} alt="Empty Cart" className="empty-cart-img" />
          <h3>Your cart feels a bit empty</h3>
          <p>Browse our fresh farm products and add them to your cart.</p>
          <Link to="/buyerhome" className="cart-btn-shop">
            <i className="fa-solid fa-basket-shopping"></i> Shop Now
          </Link>
        </div>
      ) : (
        <div className="cart-modern-layout">
          {/* Left Side: Items */}
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div className="cart-item-card" key={item.id}>
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.product.name}</h4>
                  <div className="cart-item-price-unit">
                    <span className="cart-item-price">₹{item.product.price_per_unit}</span>
                    <span className="cart-item-unit">/ {item.product.unit_type}</span>
                  </div>
                </div>

                <div className="cart-item-controls">
                  <div className="cart-qty-wrapper">
                    <button
                      className="cart-qty-btn minus"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="cart-qty-input"
                      onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                    />
                    <button
                      className="cart-qty-btn plus"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  
                  <div className="cart-item-subtotal">
                    ₹{(item.product.price_per_unit * item.quantity).toFixed(2)}
                  </div>

                  <button className="cart-btn-remove" onClick={() => handleRemove(item.id)} title="Remove Item">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Summary */}
          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-delivery">Free</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>

              <button onClick={goToCheckout} className="cart-btn-checkout">
                Proceed to Checkout <i className="fa-solid fa-arrow-right"></i>
              </button>
              
              <div className="secure-checkout">
                <i className="fa-solid fa-shield-halved"></i> Secure Checkout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
