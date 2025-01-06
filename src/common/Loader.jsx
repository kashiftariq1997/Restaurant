import React from "react";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <style>{`
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.8);
          z-index: 1000;
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #ff006b;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
