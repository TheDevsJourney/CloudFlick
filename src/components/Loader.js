import React from "react";

function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "15",
        position: "fixed",
        left: "0",
        bottom: "0",
        background: "white"
      }}
    >
      <div className="loader" />
    </div>
  );
}

export default Loader;
