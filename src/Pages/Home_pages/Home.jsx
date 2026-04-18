import { useState, useEffect } from "react";
import About from "./About";
import Contact from "./Contact";
import Features from "./Features";
import Footer from "./Footer";
import Product from "./Product";
import "./Home.css"
import Chatbot from "../../Chatboat/chatboat";
import { BsChatQuoteFill } from "react-icons/bs";

export default function Home() {
  const [openChat, setOpenChat] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mainhome-container">
      <div className="mainhome-hero">
        <div className="hero-content">
          <h1 className="mainhome-heading">
            <span className="highlight-text">Fresh Farm</span> <br />
            Product Delivered <br />
            to Your Home
          </h1>
          <p className="hero-subtitle">
            Connect directly with farmers to get the freshest organic produce.
          </p>
          <div className="buttons-h">
            <a href="/login" className="btn-h btn-primary">Login Here</a>
            <a href="/register" className="btn-h btn-secondary">Register Now</a>
          </div>
        </div>

        {/* Right side image slider */}
        <div className="hero-image-wrapper">
          <div className="slider-container">
            {heroImages.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Fresh Produce ${index + 1}`} 
                className={`hero-image ${index === currentImg ? "active" : ""}`} 
              />
            ))}
            
            <div className="slider-dots">
              {heroImages.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${index === currentImg ? "active-dot" : ""}`}
                  onClick={() => setCurrentImg(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* 💬 Chat Button */}
        <div className="chatbot-wrapper">
          <button className="chatbot-btn" onClick={() => setOpenChat(!openChat)}>
            Chat with Us <BsChatQuoteFill className="chat-icon" />
          </button>
        </div>

        {/* 🟢 Chatbot Popup */}
        {openChat && (
          <div className="chat-popup">
            <div className="chat-header">
              <span>🤖 AgroMart AI Assistant</span>
              <button className="close-chat" onClick={() => setOpenChat(false)}>&times;</button>
            </div>
            <div className="chat-body">
              <Chatbot />
            </div>
          </div>
        )}
      </div>

      <div className="allpages">
        <Product />
        <Features />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}