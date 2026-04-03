import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import { API_URL } from "../../config";

export default function AddProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("access_token");

  const [step, setStep] = useState(1);

  const steps = ["Images", "Product Info", "Details"];

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
    <div className="add-product-container">
      <h2>Add Product</h2>

      {/* ================= STEPPER ================= */}
      <div className="stepper">
        {steps.map((label, index) => {
          const stepNumber = index + 1;

          return (
            <div key={index} className="step-wrapper">
              <div className={`step-circle ${step >= stepNumber ? "active" : ""}`}>
                {stepNumber}
              </div>

              <p className={`step-label ${step >= stepNumber ? "active" : ""}`}>
                {label}
              </p>

              {index !== steps.length - 1 && (
                <div className={`step-line ${step > stepNumber ? "active" : ""}`}></div>
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="add-product-form">

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <div
              className="drop-zone"
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <p>Drag & Drop or Click to Upload Product Images</p>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files)}
                hidden
              />
            </div>

            <div className="preview-grid">
              {formData.product_img.map((file, i) => (
                <img key={i} src={URL.createObjectURL(file)} alt="preview" />
              ))}
            </div>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <input name="name" placeholder="Product Name" onChange={handleChange} required />
            <input name="category" placeholder="Category" onChange={handleChange} required />
            <input type="number" name="price_per_unit" placeholder="Price" onChange={handleChange} required />
            <input type="number" name="available_quantity" placeholder="Quantity" onChange={handleChange} required />
            <input name="unit_type" placeholder="Unit (kg, ton)" onChange={handleChange} required />
          </>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <>
            <select name="quality_grade" onChange={handleChange} required>
              <option value="">Quality</option>
              <option value="A">5</option>
              <option value="B">4</option>
              <option value="C">3</option>
              <option value="D">2</option>
              <option value="E">1</option>
            </select>

            <input type="date" name="harvest_date" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required />
            <input name="location" placeholder="Location" onChange={handleChange} required />
            <input name="delivery_option" placeholder="Delivery Option" onChange={handleChange} required />
          </>
        )}

        {/* ================= BUTTONS ================= */}
        <div className="button-group">
          {step > 1 && (
            <button className="buttons-group" type="button" onClick={() => setStep(step - 1)}>
              Previous
            </button>
          )}

          {step < 3 ? (
            <button className="buttons-group" type="button" onClick={() => setStep(step + 1)}>
              Next
            </button>
          ) : (
            <button className="buttons-group" type="submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}