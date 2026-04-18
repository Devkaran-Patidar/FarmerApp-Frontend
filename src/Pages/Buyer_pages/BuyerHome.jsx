import ProductList from "./ProductList";
import Category from "./Category";
import ProductBanner from "./ProductBanner";
import BestSellers from "./BestSeller";
import "./BuyerHome.css";
import { BiSolidOffer } from "react-icons/bi";
import { MdLocalMall } from "react-icons/md";

const BuyerHome = (props) => {
  return (
    <div className="buyerhome-container">
      <div className="buyerhome-wrapper">
        
        {/* Section 1: Banner */}
        <section className="buyerhome-section banner-section-wrapper">
          <div className="section-header">
          <h2>Special Offers</h2>
            <BiSolidOffer className="section-icon offer-icon" />
          </div>
          <ProductBanner />
        </section>

        {/* Section 2: Categories */}
        <section className="buyerhome-section category-section-wrapper">
          <h2>Categories</h2>
          <Category />
        </section>

        {/* Section 3: Best Sellers */}
        <section className="buyerhome-section bestsellers-section-wrapper">
          <BestSellers />
        </section>

        {/* Section 4: Product List */}
        <section className="buyerhome-section product-list-section-wrapper">
          <div className="section-header">
            <h2>Fresh Products</h2>
            <MdLocalMall className="section-icon product-icon" />
          </div>
          <ProductList setCartCount={props.setCartCount} cartCount={props.cartCount} />
        </section>

      </div>
    </div>
  );
};

export default BuyerHome;