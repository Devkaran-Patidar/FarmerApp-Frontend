import ProductList from "./ProductList";
import Category from "./Category";
import ProductBanner from "./ProductBanner";
import BestSellers from "./BestSeller";
import "./BuyerHome.css";

import { BiSolidOffer } from "react-icons/bi";
import { MdLocalMall } from "react-icons/md";

const BuyerHome = ({ setCartCount, cartCount }) => {
  return (
    <div className="buyerhome-container">
      <div className="buyerhome-wrapper">

        {/* Special Offers */}
        <section className="buyerhome-section">
          <div className="section-header">
            <h2>Special Offers</h2>
            <BiSolidOffer className="section-icon offer-icon" />
          </div>

          <ProductBanner />
        </section>

        {/* Categories */}
        <section className="buyerhome-section">
          <h2 className="section-title">Categories</h2>
          <Category />
        </section>

        {/* Best Sellers */}
        <section className="buyerhome-section">
          <h2 className="section-title">Best Sellers</h2>
          <BestSellers />
        </section>

        {/* Products */}
        <section className="buyerhome-section">
          <div className="section-header">
            <h2>Fresh Products</h2>
            <MdLocalMall className="section-icon product-icon" />
          </div>

          <ProductList
            setCartCount={setCartCount}
            cartCount={cartCount}
          />
        </section>

      </div>
    </div>
  );
};

export default BuyerHome;