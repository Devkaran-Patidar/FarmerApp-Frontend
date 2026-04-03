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
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        AgroMart AI Assistant
      </div>

      {/* Chat Area */}
      <div style={styles.chatBox}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.sender === "user" ? "#dcf8c6" : "#ffffff",
            }}
          >
            {msg.text && <p>{msg.text}</p>}

            {/* Product Cards */}
            {msg.products &&
              msg.products.map((p, idx) => (
                <div key={idx} style={styles.card}>
                  <img src={p.image} alt="" style={styles.image} />
                  <h4>{p.name}</h4>
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    ₹{p.price}
                  </p>
                  <button style={styles.buyBtn}>Add to Cart</button>
                </div>
              ))}

            <span style={styles.time}>{msg.time}</span>
          </div>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <div style={{ ...styles.message, backgroundColor: "#fff" }}>
            <p>🤖 Typing...</p>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Quick Options */}
      <div style={styles.quickOptions}>
        {["Customer Support", "Login/Register", "Discounts","Offers", "Delivery 🚚", "Payment 💳","Services"].map(
          (opt, i) => (
            <button
              key={i}
              style={styles.optionBtn}
              onClick={() => handleQuickMessage(opt)}
            >
              {opt}
            </button>
          )
        )}
      </div>

      {/* Input */}
      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask for products, delivery..."
        />
        <button style={styles.sendBtn} onClick={() => sendMessage()}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

// 🎨 MODERN UI STYLES
const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Segoe UI",
  },

  header: {
    background: "linear-gradient(90deg, #075E54, #0f9b8e)",
    color: "white",
    padding: "15px",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "16px",
  },

  chatBox: {
    flex: 1,
    padding: "10px",
    background: "#e5ddd5",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },

  message: {
    maxWidth: "75%",
    padding: "10px",
    margin: "6px",
    borderRadius: "10px",
    position: "relative",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  },

  time: {
    fontSize: "10px",
    position: "absolute",
    bottom: "5px",
    right: "10px",
    color: "gray",
  },

  inputBox: {
    display: "flex",
    padding: "10px",
    background: "#fff",
    borderTop: "1px solid #ddd",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
  },

  sendBtn: {
    marginLeft: "10px",
    background: "#075E54",
    color: "white",
    border: "none",
    borderRadius: "50%",
    padding: "12px",
    cursor: "pointer",
  },

  card: {
    marginTop: "8px",
    padding: "8px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },

  image: {
    width: "100%",
    borderRadius: "6px",
  },

  buyBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "6px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },

  quickOptions: {
    display: "flex",
    flexWrap: "wrap",
    padding: "6px",
    background: "#e5ddd5",
  },

  optionBtn: {
    margin: "4px",
    padding: "6px 10px",
    borderRadius: "15px",
    border: "none",
    background: "#25D366",
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default Chatbot;