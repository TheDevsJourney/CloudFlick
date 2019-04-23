import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "92vh"
      }}
    >
      <h1>Page Not Found</h1>
      <Link to="/">Return Home</Link>
    </div>
  );
}

export default NotFound;
