import { useEffect, useMemo, useState } from "react";
import "./Visitstore.css";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config";

export default function Visitstore() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    const [storeData, setStoreData] = useState({ farmer: null, products: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchStore = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/api/farmer/visitstore/${id}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });

                if (!response.ok) {
                    throw new Error("Unable to load store data");
                }

                const data = await response.json();

                if (!isMounted) {
                    return;
                }

                setStoreData({
                    farmer: data.farmer || null,
                    products: Array.isArray(data.products) ? data.products : [],
                });
            } catch (fetchError) {
                if (isMounted) {
                    setError(fetchError.message || "Something went wrong");
                    setStoreData({ farmer: null, products: [] });
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchStore();

        return () => {
            isMounted = false;
        };
    }, [id, token]);

    const farmer = storeData.farmer;
    const products = storeData.products;

    const productCountLabel = useMemo(() => {
        const count = products.length;
        return count === 1 ? "1 product" : `${count} products`;
    }, [products.length]);

    const handleProductClick = (productId) => {
        navigate(`/buyerhome/product/${productId}`);
    };

    return (
        <div className="visit-store-page">
            <div className="visit-store-shell">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left"></i> Back
                </button>

                <section className="store-hero">
                    <div className="store-hero-copy">
                        <span className="store-eyebrow">Farmer Store</span>
                        <h1>{farmer?.username || "Store"}</h1>
                        <p>
                            Browse fresh farm products directly from the seller.
                        </p>

                        <div className="store-meta-row">
                            <span className="store-meta-pill">
                                <i className="fa-solid fa-bag-shopping"></i>
                                {loading ? "Loading products..." : productCountLabel}
                            </span>
                            <span className="store-meta-pill">
                                <i className="fa-solid fa-shield-heart"></i>
                                Verified farmer
                            </span>
                        </div>
                    </div>

                    <div className="store-profile-card">
                        <div className="store-avatar-wrap">
                            <img
                                src={farmer?.avatar || "https://via.placeholder.com/160?text=Farmer"}
                                alt={farmer?.username || "Farmer profile"}
                                className="store-avatar"
                            />
                        </div>

                        <div className="store-profile-info">
                            <h2>{farmer?.username || "Unknown Farmer"}</h2>
                            <p>
                                {products.length > 0
                                    ? "Fresh listings from this store are ready to explore."
                                    : "This farmer has not listed any products yet."}
                            </p>
                        </div>
                    </div>
                </section>

                {error ? (
                    <div className="store-message error">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <div>
                            <h3>Could not load store</h3>
                            <p>{error}</p>
                        </div>
                    </div>
                ) : null}

                <section className="store-products-section">
                    <div className="section-heading">
                        <div>
                            <span className="section-kicker">Products</span>
                            <h2>Available listings</h2>
                        </div>
                    </div>

                    {loading ? (
                        <div className="store-message loading">
                            <div className="store-spinner"></div>
                            <div>
                                <h3>Loading store</h3>
                                <p>Fetching farmer details and product listings.</p>
                            </div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="store-empty-state">
                            <div className="store-empty-icon">
                                <i className="fa-solid fa-seedling"></i>
                            </div>
                            <h3>No products available</h3>
                            <p>
                                This store is live, but there are no products to show right now.
                            </p>
                        </div>
                    ) : (
                        <div className="store-products-grid">
                            {products.map((product) => (
                                <article
                                    key={product.id}
                                    className="store-product-card"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <div className="store-product-image-wrap">
                                        {product.images?.length > 0 ? (
                                            <img
                                                src={product.images[0].image_url}
                                                alt={product.name}
                                                className="store-product-image"
                                            />
                                        ) : (
                                            <div className="store-product-placeholder">
                                                <i className="fa-solid fa-image"></i>
                                            </div>
                                        )}

                                        {product.quality_grade ? (
                                            <span className="store-grade-badge">
                                                ⭐ {product.quality_grade}
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className="store-product-body">
                                        <h3>{product.name}</h3>

                                        <div className="store-product-price-row">
                                            <strong>
                                                ₹{product.price_per_unit}
                                                <span> / {product.unit_type}</span>
                                            </strong>
                                            <span>
                                                {product.available_quantity} {product.unit_type}
                                            </span>
                                        </div>

                                        <div className="store-product-meta">
                                            <span>
                                                <i className="fa-solid fa-location-dot"></i>
                                                {product.location || "Location not listed"}
                                            </span>
                                            <span>
                                                <i className="fa-solid fa-truck"></i>
                                                {product.delivery_option || "Delivery info unavailable"}
                                            </span>
                                        </div>

                                        {product.description ? (
                                            <p className="store-product-description">
                                                {product.description}
                                            </p>
                                        ) : null}

                                        <button
                                            className="store-view-btn"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleProductClick(product.id);
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

