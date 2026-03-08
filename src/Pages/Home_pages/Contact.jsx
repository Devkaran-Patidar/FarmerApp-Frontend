import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section className="contact-containery">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Have questions? We'd love to hear from you</p>
      </div>

      <div className="contact-cards">

        {/* Email */}
        <div className="contact-card">
          <div className="icon email">
            <Mail size={28} />
          </div>
          <h3>Email Us</h3>
          <p className="highlight">infoagromart@gmail.com</p>
        </div>

        {/* Phone */}
        <div className="contact-card">
          <div className="icon phone">
            <Phone size={28} />
          </div>
          <h3>Call Us</h3>
          <p className="highlight">+91 9689858687</p>
        </div>

        {/* Location */}
        <div className="contact-card">
          <div className="icon location">
            <MapPin size={28} />
          </div>
          <h3>Our Location</h3>
          <p className="highlight">SVVV, Indore, Madhya Pradesh, India</p>
        </div>

        {/* Message */}
        <div className="contact-card mess">
          <div className="icon message">
            <MessageCircle size={28} />
          </div>

          <Link to="/contactform">
            <h3 className="mess">Message Here..</h3>
          </Link>

          <p className="highlight">24/7 - Always Available</p>
        </div>

      </div>
    </section>
  );
}