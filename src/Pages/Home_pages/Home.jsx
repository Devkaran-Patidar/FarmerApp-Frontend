import { useState } from "react";
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

  return (
    <div className="mainhome-container">
      <div className=" mainhome-hero">
        <div className="hero-content">
            <h1 className="mainhome-heading">
              {/* Buy 🛒 & Sell🧑‍🌾
              orgainc Products.
              <br /> */}
          Fresh Farm <br />
          Product Delivered <br />
           to Your Home
        </h1> 
        </div>
        
        <div className="buttons-h">
              <button className="btn-h"><a href="/login">Login Here !</a></button>      
             <button className="btn-h"> <a href="/register">Register Now !</a></button>
        </div> 
       
       {/* 💬 Chat Button */}
        <div className="chatboat">
          <button onClick={() => setOpenChat(!openChat)}>
           Chat with Us__ <BsChatQuoteFill />
          </button>
        </div>

         {/* 🟢 Chatbot Popup */}
      
      {openChat && (
        <div className="chat-popup">
          <div className="chat-header">
            <span>🤖 Ai Assistant</span>
            <button onClick={() => setOpenChat(false)}>X</button>
          </div>

          <Chatbot />
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