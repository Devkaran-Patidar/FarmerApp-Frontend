import { useEffect} from "react";
import "./Visitstore.css";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config";

export default function Visitstore() {
const { id } = useParams(); 
const token = localStorage.getItem("access_token");
useEffect(() => {
    fetch(`${API_URL}/api/buyer/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

    return (
        <div className="visit-store-page">
            <h1>Visit Store</h1>
            <p>This is the Visit Store page. Here you can view the seller's products and details.</p>
            <button className="back-btn" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left"></i> Back
            </button>
        </div>
    );
}

