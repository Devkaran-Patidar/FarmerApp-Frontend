import "./About.css";

export default function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-badge">About Us</div>
          <h2 className="about-title">
            Empowering Farmers, <span>Transforming Trade.</span>
          </h2>
          <p className="about-description">
            AgroMart is a mobile platform built to empower farmers by removing
            middlemen from the supply chain. We provide direct market access,
            transparent pricing, and digital solutions to improve agricultural trade.
          </p>

          <div className="about-stats-container">
            <div className="about-stat-card">
              <div className="stat-icon">👨‍🌾</div>
              <h3>500+</h3>
              <p>Farmers Connected</p>
            </div>
            <div className="about-stat-card">
              <div className="stat-icon">🛒</div>
              <h3>1000+</h3>
              <p>Buyers Registered</p>
            </div>
            <div className="about-stat-card">
              <div className="stat-icon">🎧</div>
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>
          </div>
        </div>
        
        <div className="about-visual">
          <div className="visual-circle"></div>
          <div className="visual-card-wrapper visual-card-1-pos">
            <div className="visual-card">
              <span className="card-icon">🌱</span>
              <h4>Direct Trade</h4>
              <p>Zero Middlemen</p>
            </div>
          </div>
          <div className="visual-card-wrapper visual-card-2-pos delay">
            <div className="visual-card">
              <span className="card-icon">📈</span>
              <h4>Best Prices</h4>
              <p>Market Driven</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
