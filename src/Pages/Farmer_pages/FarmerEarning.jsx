import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "./FarmerEarning.css";
import { FiDollarSign, FiPackage, FiRefreshCw } from "react-icons/fi";

function FarmerEarning() {
  const [earning, setEarning] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const res = await axios.get(
        `${API_URL}/api/farmer/earning/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEarning(res.data.total_earning || 0);
      setDeliveredOrders(res.data.delivered_orders || 0);
      setLoading(false);

    } catch (err) {
      setError("Failed to load earnings");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="farmer-page-container"><p>Loading earnings dashboard...</p></div>;
  }

  if (error) {
    return <div className="farmer-page-container"><h3 style={{ color: "red" }}>{error}</h3></div>;
  }

  return (
    <div className="farmer-page-container">
      <div className="farmer-earning-dashboard">
        
        <div className="farmer-page-header">
          <div>
            <h2 className="farmer-page-title">Earnings Dashboard</h2>
            <p className="farmer-page-subtitle">Overview of your revenue and completed orders</p>
          </div>
        </div>

        <div className="farmer-earning-cards-container">
          
          <div className="farmer-earning-card">
            <div className="farmer-earning-icon money">
              <FiDollarSign />
            </div>
            <div className="farmer-earning-info">
              <span className="farmer-earning-label">Total Earnings</span>
              <h3 className="farmer-earning-value">₹{earning.toLocaleString()}</h3>
            </div>
          </div>

          <div className="farmer-earning-card">
            <div className="farmer-earning-icon orders">
              <FiPackage />
            </div>
            <div className="farmer-earning-info">
              <span className="farmer-earning-label">Delivered Orders</span>
              <h3 className="farmer-earning-value">{deliveredOrders}</h3>
            </div>
          </div>

        </div>

        <div className="farmer-earning-actions">
          <button className="farmer-btn-refresh" onClick={fetchEarnings}>
            <FiRefreshCw /> Refresh Data
          </button>
        </div>

      </div>
    </div>
  );
}

export default FarmerEarning;