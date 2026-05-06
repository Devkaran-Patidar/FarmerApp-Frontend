import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "./FarmerOrders.css";
import { FiCheckCircle, FiClock, FiPackage } from "react-icons/fi";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("access_token");

    const res = await axios.get(`${API_URL}/api/farmer/orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(res.data);

    const initialStatus = {};
    res.data.forEach(order => {
      initialStatus[order.id] = order.delivered;
    });
    setDeliveryStatus(initialStatus);
  };

  const toggleDelivered = (id) => {
    setDeliveryStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="farmer-page-container">
      <div className="farmer-page-header">
        <div>
          <h2 className="farmer-page-title">Orders Management</h2>
          <p className="farmer-page-subtitle">Track and update customer orders</p>
        </div>
      </div>

      <div className="farmer-orders-grid">
        {orders.length === 0 ? (
          <div className="farmer-empty-state">
            <FiPackage size={48} color="#cbd5e1" style={{marginBottom: '16px'}} />
            <p>No Orders Found</p>
          </div>
        ) : (
          orders.map((order) => (
            <div className="farmer-order-card" key={order.id}>
              
              <div className="farmer-order-header">
                <span className="farmer-order-id">#{order.order_id || order.id}</span>
                <span className="farmer-order-date">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="farmer-order-details">
                <div className="farmer-order-row">
                  <span className="label">Customer</span>
                  <span className="value">{order.buyer}</span>
                </div>
                <div className="farmer-order-row">
                  <span className="label">Email</span>
                  <span className="value" style={{fontSize: '0.85rem', color: '#64748b'}}>{order.email}</span>
                </div>
                <div className="farmer-order-row">
                  <span className="label">Product</span>
                  <span className="value">{order.product_name}</span>
                </div>
                <div className="farmer-order-row">
                  <span className="label">Quantity</span>
                  <span className="value">{order.quantity}</span>
                </div>
                <div className="farmer-order-row" style={{marginTop: '8px'}}>
                  <span className="label">Total Amount</span>
                  <span className="farmer-order-amount">₹{order.total_ammount}</span>
                </div>
              </div>

              <div className="farmer-order-actions">
                {deliveryStatus[order.id] ? (
                  <button 
                    className="farmer-btn-status delivered"
                    onClick={() => toggleDelivered(order.id)}
                  >
                    <FiCheckCircle /> Delivered
                  </button>
                ) : (
                  <button 
                    className="farmer-btn-status pending"
                    onClick={() => toggleDelivered(order.id)}
                  >
                    <FiClock /> Pending Delivery
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FarmerOrders;