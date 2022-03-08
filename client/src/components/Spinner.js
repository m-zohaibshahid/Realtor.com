import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
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
        color: "black",
      }}
    >
      {/* <LoaderGif /> */}
      <div class="loader"></div>
      {/* <div class="spinner-border text-primary"></div> */}
    </div>
  );
};

export default Spinner;
