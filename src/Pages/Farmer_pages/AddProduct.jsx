import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import { API_URL } from "../../config";
import { FiUploadCloud } from "react-icons/fi";

export default function AddProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("access_token");

  const [step, setStep] = useState(1);

  const steps = ["Images", "Basic Info", "Details"];

  const [formData, setFormData] = useState({
    product_img: [],
    name: "",
    category: "",
    price_per_unit: "",
    available_quantity: "",
    unit_type: "",
    quality_grade: "",
    harvest_date: "",
    description: "",
    location: "",
    delivery_option: "",
  });

  // ================= FILE =================
  const handleFileChange = (files) => {
    const fileArray = Array.from(files);

    if (fileArray.length > 5) {
      alert("Max 5 images allowed ❌");
      return;
    }

    setFormData({ ...formData, product_img: fileArray });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  };

  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "product_img") {
        formData.product_img.forEach((file) => {
          formDataToSend.append("product_img", file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`${API_URL}/api/farmer/addproduct/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product Added ✅");
        navigate("/farmerhome");
      } else {
        alert(data.message || "Error ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="farmer-page-container">
      <div className="farmer-add-product-container">
        
        <div className="farmer-form-header">
          <h2 className="farmer-page-title">Add New Product</h2>
          <p className="farmer-page-subtitle">Fill in the details to list your produce</p>
        </div>

        {/* ================= STEPPER ================= */}
        <div className="farmer-stepper">
          {steps.map((label, index) => {
            const stepNumber = index + 1;

            return (
              <div key={index} className="farmer-step-wrapper" style={{ flex: 1 }}>
                <div className={`farmer-step-circle ${step >= stepNumber ? "active" : ""}`}>
                  {stepNumber}
                </div>

                <p className={`farmer-step-label ${step >= stepNumber ? "active" : ""}`}>
                  {label}
                </p>

                {index !== steps.length - 1 && (
                  <div className={`farmer-step-line ${step > stepNumber ? "active" : ""}`}></div>
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="farmer-add-product-form">

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <>
              <div
                className="farmer-drop-zone"
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <FiUploadCloud className="farmer-drop-icon" />
                <h3>Upload Product Images</h3>
                <p>Drag & Drop or Click to browse (Max 5 images)</p>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files)}
                  hidden
                />
              </div>

              {formData.product_img.length > 0 && (
                <div className="farmer-preview-grid">
                  {formData.product_img.map((file, i) => (
                    <img key={i} src={URL.createObjectURL(file)} alt="preview" />
                  ))}
                </div>
              )}
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <div className="farmer-form-grid">
              <div className="farmer-form-group full-width">
                <label>Product Name</label>
                <input className="farmer-input" name="name" value={formData.name} placeholder="e.g., Organic Tomatoes" onChange={handleChange} required />
              </div>
              <div className="farmer-form-group">
                <label>Category</label>
                <input className="farmer-input" name="category" value={formData.category} placeholder="e.g., Vegetables" onChange={handleChange} required />
              </div>
              <div className="farmer-form-group">
                <label>Price Per Unit (₹)</label>
                <input className="farmer-input" type="number" name="price_per_unit" value={formData.price_per_unit} placeholder="0.00" onChange={handleChange} required />
              </div>
              <div className="farmer-form-group">
                <label>Available Quantity</label>
                <input className="farmer-input" type="number" name="available_quantity" value={formData.available_quantity} placeholder="0" onChange={handleChange} required />
              </div>
              <div className="farmer-form-group">
                <label>Unit Type</label>
                <input className="farmer-input" name="unit_type" value={formData.unit_type} placeholder="e.g., kg, ton, dozen" onChange={handleChange} required />
              </div>
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <div className="farmer-form-grid">
              <div className="farmer-form-group">
                <label>Quality Grade</label>
                <select className="farmer-input" name="quality_grade" value={formData.quality_grade} onChange={handleChange} required>
                  <option value="">Select Quality</option>
                  <option value="A">Grade A (Premium)</option>
                  <option value="B">Grade B (Standard)</option>
                  <option value="C">Grade C (Processing)</option>
                </select>
              </div>

              <div className="farmer-form-group">
                <label>Harvest Date</label>
                <input className="farmer-input" type="date" name="harvest_date" value={formData.harvest_date} onChange={handleChange} required />
              </div>
              
              <div className="farmer-form-group">
                <label>Location (Farm)</label>
                <input className="farmer-input" name="location" value={formData.location} placeholder="e.g., Nashik, Maharashtra" onChange={handleChange} required />
              </div>

              <div className="farmer-form-group">
                <label>Delivery Options</label>
                <input className="farmer-input" name="delivery_option" value={formData.delivery_option} placeholder="e.g., Pickup, Delivery within 50km" onChange={handleChange} required />
              </div>

              <div className="farmer-form-group full-width">
                <label>Product Description</label>
                <textarea className="farmer-input" name="description" value={formData.description} placeholder="Describe the farming methods, origin, and freshness..." onChange={handleChange} required />
              </div>
            </div>
          )}

          {/* ================= BUTTONS ================= */}
          <div className="farmer-form-actions">
            {step > 1 && (
              <button className="farmer-btn-outline" type="button" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}

            {step < 3 ? (
              <button className="farmer-btn-submit" type="button" onClick={() => setStep(step + 1)}>
                Next Step
              </button>
            ) : (
              <button className="farmer-btn-submit" type="submit">
                Publish Product
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}