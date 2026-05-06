import { Outlet, Navigate } from "react-router-dom";
import FarmerHeader from "../Components/farmer/FarmerHeader.jsx";
import "./FarmerLayout.css";

const FarmerLayout = ({ islogin, setIslogin }) => {
  const role = localStorage.getItem("role");
  
  if (!islogin || role !== "farmer") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="farmer-layout-container">
      <FarmerHeader islogin={islogin} setIslogin={setIslogin} />
      <main className="farmer-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default FarmerLayout;


  