import "./Product.css";
import img1 from "../../assets/product_image/ghee.png"
import img2 from "../../assets/product_image/honey.png"
import img4 from "../../assets/product_image/image copy.png"
import img5 from "../../assets/product_image/image copy 5.png"
import img6 from "../../assets/product_image/image copy 3.png"
import img7 from "../../assets/product_image/corn.webp"
import img10 from "../../assets/product_image/masrum.jpeg"
import img11 from "../../assets/product_image/copy image.png"

export default function Product() {
  const products = [
    {
      id: 1,
      name: "Fresh Fruits",
      desc: "A vibrant mix of daily harvested, farm-fresh seasonal fruits.",
      img: img5,
      badge: "Organic"
    },
    {
      id: 2,
      name: "Pure Honey",
      desc: "100% natural, unpasteurized honey sourced from wild bees.",
      img: img2,
      badge: "Pure"
    },
    {
      id: 3,
      name: "Mushrooms",
      desc: "Handpicked, organic mushrooms with rich umami flavor.",
      img: img10,
      badge: "Fresh"
    },
    {
      id: 4,
      name: "Vermicompost",
      desc: "Nutrient-rich organic compost to boost your soil health.",
      img: img4,
      badge: "Eco"
    },
    {
      id: 5,
      name: "Desi Ghee",
      desc: "Aromatic, traditional A2 cow ghee for healthy cooking.",
      img: img1,
      badge: "Bestseller"
    },
    {
      id: 6,
      name: "Vegetables",
      desc: "Crisp, pesticide-free vegetables delivered straight from the farm.",
      img: img6,
      badge: "Daily"
    },
    {
      id: 7,
      name: "Organic Corn",
      desc: "Sweet, juicy, and 100% organic golden sweet corn.",
      img: img7,
      badge: "Fresh"
    },

    {
      id: 10,
      name: "Leafy Greens",
      desc: "Nutrient-dense, freshly picked green leafy vegetables.",
      img: img11,
      badge: "Fresh"
    }
  ];

  return (
    <section className="product-section">
      <div className="product-heading">
        <h4>Farm Fresh Produce</h4>
        <p>Organized just the way you like it, straight from the farm to your table</p>
      </div>

      <div className="product-cards">
        {products.map((product) => (
          <div className="pro-cards" key={product.id}>
            <span className={`badge ${product.badge.toLowerCase()}`}>{product.badge}</span>
            <div className="pro-img">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="pro-cont">
              <h4>{product.name}</h4>
              <p>{product.desc}</p>
            </div>
            <div className="pro-action">
              <button className="action-btn">
                <span>Add to Cart</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
