import React from "react";
import { useNavigate } from "react-router-dom";

const ClosePage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-end">
      <button
        onClick={() => navigate(-1)}
        style={{ border: "none", background: "none" }}
      >
        <i className="bi bi-x-lg" style={{ fontSize: "20px" }}></i>
      </button>
    </div>
  );
};

export default ClosePage;
