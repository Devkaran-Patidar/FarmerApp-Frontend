import React from 'react';
import { Sprout, Truck, Tag, ShieldCheck, Smartphone, Lock } from 'lucide-react';
import "./Features.css";

export default function Features() {
  const features = [
    {
      icon: <Sprout className="feature-icon" />,
      title: "Farm Fresh Quality",
      description: "Directly sourced from local farms daily. Premium quality produce you can trust.",
      color: "var(--feature-green)"
    },
    {
      icon: <Truck className="feature-icon" />,
      title: "Reliable Delivery",
      description: "Order anytime - we deliver to your doorstep with scheduled, efficient timing.",
      color: "var(--feature-blue)"
    },
    {
      icon: <Tag className="feature-icon" />,
      title: "Best Prices",
      description: "Competitive pricing means you get quality produce without the high costs.",
      color: "var(--feature-orange)"
    },
    {
      icon: <ShieldCheck className="feature-icon" />,
      title: "Quality Assured",
      description: "Every single product is carefully inspected and checked before packing.",
      color: "var(--feature-purple)"
    },
    {
      icon: <Smartphone className="feature-icon" />,
      title: "Easy App",
      description: "Our user-friendly app makes shopping for fresh produce seamless and quick.",
      color: "var(--feature-pink)"
    },
    {
      icon: <Lock className="feature-icon" />,
      title: "Secure Payments",
      description: "Multiple payment options with bank-grade security. Your transactions are protected.",
      color: "var(--feature-teal)"
    }
  ];

  return (
    <section className="features-section">
      {/* Decorative background elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      
      <div className="features-container">
        <div className="features-header">
          <span className="subtitle">Our Promise</span>
          <h2>Why Choose AgroMart?</h2>
          <p className="header-desc">Experience the difference of true farm-to-table quality with our dedicated services designed for you.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              className="feature-card" 
              key={index}
              style={{ '--hover-color': feature.color }}
            >
              <div className="icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
