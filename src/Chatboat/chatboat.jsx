import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import "../Chatboat/chatboat.css";
import { API_URL } from "../config";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  // ⏱ time format
  const getTime = () => {
    const now = new Date();
    return now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");
  };

  // 📜 auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  // 🚀 send message
  const sendMessage = async (customMsg) => {
    const msgToSend = customMsg || message;
    if (!msgToSend.trim()) return;

    const userMsg = {
      sender: "user",
      text: msgToSend,
      time: getTime(),
    };

    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setTyping(true);

    try {
      const res = await axios.post(`${API_URL}/api/ai/chatboat/`, {
        message: msgToSend,
      });

      setTimeout(() => {
        if (res.data.type === "product") {
          setChat((prev) => [
            ...prev,
            {
              sender: "bot",
              products: res.data.data,
              time: getTime(),
            },
          ]);
        } else {
          setChat((prev) => [
            ...prev,
            {
              sender: "bot",
              text: res.data.reply,
              time: getTime(),
            },
          ]);
        }
        setTyping(false);
      }, 800); // simulate AI delay

    } catch (err) {
      console.error(err);
      setTyping(false);
    }
  };

  // ⚡ quick reply
  const handleQuickMessage = (text) => {
    sendMessage(text);
  };

  return (
    <div className="chatbot-container">
      {/* Chat Area */}
      <div className="chat-box">
        {chat.length === 0 && (
          <div style={{ textAlign: "center", color: "#64748b", margin: "auto", fontSize: "0.95rem", padding: "20px" }}>
            <p style={{ fontSize: "2rem", marginBottom: "8px" }}>👋</p>
            <p style={{ fontWeight: "600", color: "#334155", margin: "0 0 4px 0" }}>Welcome to AgroMart!</p>
            <p style={{ margin: 0 }}>How can I help you today?</p>
          </div>
        )}

        {chat.map((msg, i) => (
          <div
            key={i}
            className={`message-wrapper ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <div className="message-bubble">
              {msg.text && <p style={{ margin: 0 }}>{msg.text}</p>}

              {/* Product Cards */}
              {msg.products &&
                msg.products.map((p, idx) => (
                  <div key={idx} className="product-card">
                    <img src={p.image} alt="" className="product-image" />
                    <h4 className="product-title">{p.name}</h4>
                    <p className="product-price">₹{p.price}</p>
                    <button className="product-buy-btn">Add to Cart</button>
                  </div>
                ))}
            </div>
            <span className="message-time">{msg.time}</span>
          </div>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <div className="message-wrapper bot">
            <div className="message-bubble typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Quick Options */}
      <div className="quick-options">
        {["Customer Support", "Login/Register", "Discounts", "Offers", "Delivery 🚚", "Payment 💳", "Services"].map(
          (opt, i) => (
            <button
              key={i}
              className="option-btn"
              onClick={() => handleQuickMessage(opt)}
            >
              {opt}
            </button>
          )
        )}
      </div>

      {/* Input */}
      <div className="input-area">
        <input
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask for products, delivery..."
        />
        <button 
          className="send-btn" 
          onClick={() => sendMessage()}
          disabled={!message.trim()}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default Chatbot;