import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProdt.css";
import { API_URL } from "../../config";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1);
  const steps = ["Images", "Product Info", "Details"];

  const [product, setProduct] = useState({
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

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // ================= LOAD =================
  useEffect(() => {
    fetch(`${API_URL}/api/farmer/myproduct/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(id));

        if (found) {
          setProduct({
            ...found,
            harvest_date: found.harvest_date
              ? found.harvest_date.split("T")[0]
              : "",
          });

          if (found.images) setExistingImages(found.images);
        }
      });
  }, [id, token]);

  // ================= INPUT =================
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ================= FILE =================
  const handleFileChange = (files) => {
    const fileArray = Array.from(files);

    if (fileArray.length > 5) {
      alert("Max 5 images allowed ❌");
      return;
    }

    setNewImages(fileArray);
    setPreviewImages(fileArray.map((file) => URL.createObjectURL(file)));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      if (product[key]) formData.append(key, product[key]);
    });

    newImages.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch(`${API_URL}/api/farmer/editproduct/${id}/`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        alert("Updated ✅");
        navigate("/farmerhome");
      } else {
        const data = await res.json();
        alert(JSON.stringify(data));
      }
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <section className="edit-section">
      <div className="edit-card">
        <h2>Edit Product</h2>

        {/* ===== STEPPER ===== */}
        <div className="stepper">
          {steps.map((label, index) => {
            const stepNum = index + 1;
            return (
              <div key={index} className="step-wrapper">
                <div className={`step-circle ${step >= stepNum ? "active" : ""}`}>
                  {stepNum}
                </div>
                <p className={`step-label ${step >= stepNum ? "active" : ""}`}>
                  {label}
                </p>
                {index !== steps.length - 1 && (
                  <div className={`step-line ${step > stepNum ? "active" : ""}`} />
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleUpdate} className="edit-form">

          {/* ===== STEP 1 ===== */}
          {step === 1 && (
            <>
              <div
                className="drop-zone"
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <p>Drag & Drop or Click</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => handleFileChange(e.target.files)}
                />
              </div>

              <h4>Current Images</h4>
              <div className="preview-grid">
                {existingImages.map((img) => (
                  <img key={img.id} src={img.image_url} alt="" />
                ))}
              </div>

              <h4>New Images</h4>
              <div className="preview-grid">
                {previewImages.map((img, i) => (
                  <img key={i} src={img} alt="" />
                ))}
              </div>
            </>
          )}

          {/* ===== STEP 2 ===== */}
          {step === 2 && (
            <>
              <input name="name" value={product.name} onChange={handleChange} />
              <input name="category" value={product.category} onChange={handleChange} />
              <input type="number" name="price_per_unit" value={product.price_per_unit} onChange={handleChange} />
              <input type="number" name="available_quantity" value={product.available_quantity} onChange={handleChange} />
              <input name="unit_type" value={product.unit_type} onChange={handleChange} />
            </>
          )}

          {/* ===== STEP 3 ===== */}
          {step === 3 && (
            <>
              <select name="quality_grade" value={product.quality_grade} onChange={handleChange}>
                <option value="">Quality</option>
                <option value="A">5</option>
                <option value="B">4</option>
                <option value="C">3</option>
                <option value="D">2</option>
                <option value="E">1</option>
              </select>

              <input type="date" name="harvest_date" value={product.harvest_date} onChange={handleChange} />
              <textarea name="description" value={product.description} onChange={handleChange} />
              <input name="location" value={product.location} onChange={handleChange} />
              <input name="delivery_option" value={product.delivery_option} onChange={handleChange} />
            </>
          )}

          {/* ===== BUTTONS ===== */}
          <div className="button-group">
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)}>
                Previous
              </button>
            )}

            {step < 3 ? (
              <button type="button" onClick={() => setStep(step + 1)}>
                Next
              </button>
            ) : (
              <button type="submit">Update</button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}