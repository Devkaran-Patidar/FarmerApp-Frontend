import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Category from "./Category";
import ProductBanner from "./ProductBanner";
import BestSellers from "./BestSeller";

import "./BuyerHome.css";
const BuyerHome = (props) => {
 
  return (
    <div className="container">

      <div className="scroll-container">
        {/* Section 1 */}
        <div className="sections">
            <p>Offers..</p>
            <ProductBanner />
          {/* <BannerSlider banners={data.banners} /> */}
        </div>

        {/* Section 2 */}
        <div className="sections">
          <Category />
        </div>

        {/* Section 3 */}
        <div className="sections">
          <BestSellers />
        </div>

        <div className="product-list-section">
            <p>Products</p>
             <ProductList setCartCount={props.setCartCount} cartCount={props.cartCount} />
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;