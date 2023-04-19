import React from "react";
import useLoading from "../hooks/useLoading";

const Loading = ({ children }) => {
  const { loading } = useLoading();
  if (!loading) return children;
  return (
    <div className="container-fluid d-flex justify-content-center  align-items-center vh-100">
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Loading;
