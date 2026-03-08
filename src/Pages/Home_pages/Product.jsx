import "./Product.css";
import img1 from "../../assets/product_image/ghee.png"
import img2 from "../../assets/product_image/honey2.png"
import img3 from "../../assets/product_image/image.png"
import img4 from "../../assets/product_image/image copy.png"
import img5 from "../../assets/product_image/image copy 5.png"
import img6 from "../../assets/product_image/image copy 3.png"

export default function Product() {
  return (
    <section className="product-section">
       <div className="product-heading">
        <h4>Fresh produce organized just the way you like it</h4>
       </div>

      <div className="product-cards">

          <div className="pro-cards">
            <div className="pro-img">
                <img src={img5} alt="img-1" />
            </div>
            <div className="pro-cont">
                <h4>Fruits</h4>
                <p>Fresh & Organic</p>
            </div>
          </div>
          <div className="pro-cards">
            <div className="pro-img">
                <img src={img2} alt="img-1" />
            </div>
            <div className="pro-cont">
                <h4>Honey</h4>
                <p>Natural sweetener</p>
            </div>
          </div>
          <div className="pro-cards">
            <div className="pro-img">
                <img src={img3} alt="img-1" />
            </div>
            <div className="pro-cont">
                <h4>Mushroom</h4>
                <p>Fresh & Organic</p>
            </div>
          </div>
          <div className="pro-cards">
            <div className="pro-img">
                <img src={img4} alt="img-1" />
            </div>
            <div className="pro-cont">
                <h4>Vermicompost</h4>
                <p>organic manure produced by earthworms</p>
            </div>
          </div>
          <div className="pro-cards">
            <div className="pro-img">
                <img src={img1} alt="img-1" />
            </div>
            <div className="pro-cont">
                <h4>Fruits</h4>
                <p>Fresh & Organic</p>
            </div>
          </div>
          <div className="pro-cards">
            <div className="pro-img">
                <img src={img6} alt="img-1" />
            </div>
            <div className="pro-cont">
                <h4>Vegitabels</h4>
                <p>Edible plants</p>
            </div>
          </div>

      </div>
      
    </section>
  );
}
