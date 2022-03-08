import React from "react";

const SplashScreen = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          overflow: "show",
          margin: "auto",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: "50px",
          height: "50px",
        }}
      >
        <div class="spinner-border text-primary"></div>
      </div>
    </>
  );
};

export default SplashScreen;
