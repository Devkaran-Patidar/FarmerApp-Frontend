import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState({}); // 👈 NEW

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

    // initialize local delivery status
    const initialStatus = {};
    res.data.forEach(order => {
      initialStatus[order.id] = order.delivered;
    });
    setDeliveryStatus(initialStatus);
  };

  // 👇 Toggle only clicked order
  const toggleDelivered = (id) => {
    setDeliveryStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "green" }}>
        <b>📦 ORDERS</b>
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid gray",
              padding: 15,
              margin: 10,
              width: "20rem",
              background: "rgb(240, 255, 240)",
            }}
          >
            <p><b>Name:</b> {order.buyer}</p>
            <p><b>Email:</b> {order.email}</p>
            <p><b>Order ID:</b> {order.order_id}</p>
            <p><b>Product Name:</b> {order.product_name}</p>
            <p><b>Quantity:</b> {order.quantity}</p>
            <p><b>Date:</b> {order.created_at}</p>
            <p><b>Amount:</b> {order.total_ammount}</p>

            <div>
              {deliveryStatus[order.id] ? (
                <button onClick={() => toggleDelivered(order.id)} style={{color:"white",background:"darkgreen", border:"none", padding:"7px 12px", borderRadius:"8px", cursor:"pointer"}}>
                  ✅ Delivered
                </button>
              ) : (
                <button onClick={() => toggleDelivered(order.id)} style={{color:"white",background:"darkred", border:"none", padding:"7px 12px", borderRadius:"8px", cursor:"pointer"}}>
                  ❌ Not Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmerOrders;