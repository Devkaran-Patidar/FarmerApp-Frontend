import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Reciept.css"
import { API_URL } from "../config";

export default function Receipt() {
  const navigate = useNavigate();
  const receiptRef = useRef();

  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("userId");

  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);


  useEffect(() => {
    if (!orderId) {
      alert("No order found");
      navigate("/buyerhome");
      return;
    }

    fetch(`${API_URL}/api/farmer/orders/${orderId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch order");
      });
  }, [orderId, token, navigate]);

  // =======================
  // FETCH PROFILE
  // =======================
  useEffect(() => {
    if (!userId || !token) {
      setLoadingProfile(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/user/profile/${userId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Profile fetch failed:", res.status);
          setLoadingProfile(false);
          return;
        }

        const data = await res.json();
        setProfile(data);
        setLoadingProfile(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [userId, token]);

  // =======================
  // PRINT FUNCTION
  // =======================
  const handlePrint = () => {
    const printContents = receiptRef.current.innerHTML;
    const newWindow = window.open("", "_blank");

    newWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; padding: 20px; color: #334155; }
            .receipt-logo { text-align: center; color: #10b981; margin-bottom: 10px; display: flex; justify-content: center;}
            .receipt-header { text-align: center; margin-bottom: 20px; }
            .receipt-header h2 { margin: 0 0 5px 0; color: #0f172a; }
            .receipt-date { color: #64748b; font-size: 14px; }
            .receipt-divider { border-bottom: 2px dashed #e2e8f0; margin: 20px 0; }
            .receipt-section { margin-bottom: 20px; }
            .receipt-section h3 { font-size: 14px; text-transform: uppercase; color: #94a3b8; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;}
            .receipt-section p { margin: 5px 0; display: flex; justify-content: space-between; }
            .item-header { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; font-weight: bold; padding-bottom: 10px; border-bottom: 1px solid #e2e8f0; margin-bottom: 10px; }
            .item-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; margin-bottom: 8px; }
            .item-qty { text-align: center; }
            .item-price, .item-total { text-align: right; }
            .summary-row { display: flex; justify-content: space-between; margin-top: 10px; }
            .summary-row.total { font-weight: bold; font-size: 18px; margin-top: 15px; padding-top: 10px; border-top: 2px solid #e2e8f0; color: #10b981;}
            .receipt-footer { text-align: center; margin-top: 30px; font-size: 14px; color: #64748b; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    newWindow.document.close();
    newWindow.print();
  };

  if (!order) return <div className="receipt-wrapper"><h3 style={{textAlign: "center", marginTop: "20px"}}>Loading receipt...</h3></div>;

  return (
    <div className="receipt-wrapper">
      <div className="receipt-card" ref={receiptRef}>
        <div className="receipt-header">
           <div className="receipt-logo">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
               <polyline points="22 4 12 14.01 9 11.01"></polyline>
             </svg>
           </div>
           <h2>AgroMart Receipt</h2>
           <p className="receipt-date">{new Date(order.created_at).toLocaleString()}</p>
        </div>
        
        <div className="receipt-divider dashed"></div>
        
        <div className="receipt-details">
          <div className="receipt-section">
            <h3>Customer Details</h3>
            {!loadingProfile && profile ? (
              <>
                <p><strong>Name:</strong> <span>{profile.username}</span></p>
                <p><strong>Email:</strong> <span>{profile.email}</span></p>
                <p><strong>Phone:</strong> <span>{profile.phone_number}</span></p>
              </>
            ) : <p>Loading...</p>}
          </div>
          
          <div className="receipt-section">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> <span>#{order.order_id}</span></p>
            <p><strong>Status:</strong> <span>{order.status || 'Completed'}</span></p>
          </div>
        </div>

        <div className="receipt-divider dashed"></div>

        <div className="receipt-items">
          <div className="item-header">
            <span>Item</span>
            <span className="item-qty">Qty</span>
            <span className="item-price">Price</span>
            <span className="item-total">Total</span>
          </div>
          {order.items.map((item, index) => (
             <div className="item-row" key={index}>
               <span className="item-name">{item.product}</span>
               <span className="item-qty">{item.quantity}</span>
               <span className="item-price">₹{item.price}</span>
               <span className="item-total">₹{item.quantity * item.price}</span>
             </div>
          ))}
        </div>

        <div className="receipt-divider solid"></div>

        <div className="receipt-summary">
           <div className="summary-row">
             <span>Subtotal</span>
             <span>₹{order.total_price}</span>
           </div>
           <div className="summary-row total">
             <span>Total Amount</span>
             <span>₹{order.total_price}</span>
           </div>
        </div>
        
        <div className="receipt-footer">
          <p>Thank you for shopping with AgroMart!</p>
          <p style={{ fontSize: '12px', marginTop: '4px' }}>If you have any questions concerning this receipt, please contact us.</p>
        </div>
      </div>
      
      <div className="receipt-actions">
        <button className="btn-print" onClick={handlePrint}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print Receipt
        </button>
        <button className="btn-back" onClick={() => navigate('/buyerhome')}>
           Continue Shopping
        </button>
      </div>
    </div>
  );
}
