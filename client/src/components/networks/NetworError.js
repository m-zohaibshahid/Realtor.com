import React from "react";
// import NetworkDetector from "./NetworkDetector";
import "./network.css";
const NetworError = () => {
  window.onload = function () {
    document.querySelector(".cont_principal").className =
      "cont_principal cont_error_active";
  };
  return (
    // <div className="mainbox">
    //   <div className="container">
    //     <div className="row text-center">
    //       <div className="col-sm-4 col-md-4 col-lg-4 col-4">
    //         <div className="err">4</div>
    //       </div>
    //       <div className="col-sm-4 col-md-4 col-lg-4 col-4">
    //         <i className="far fa-question-circle fa-spin pd-top-120"></i>
    //       </div>
    //       <div className="col-sm-4 col-md-4 col-lg-4 col-4">
    //         <div className="err2">4</div>
    //       </div>
    //     </div>

    //     <div className="msg" style={{ color: "white" }}>
    //       Maybe this page moved? Got deleted? Is hiding out in quarantine?
    //       <p style={{ color: "white" }}>
    //         Let's go{" "}
    //         <a href="/">
    //           <u>home</u>
    //         </a>{" "}
    //         and try from there.
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="msin">
      <div className="cont_principal">
        <div className="cont_error">
          <h1>Oops</h1>
          <p>Network connection is lost</p>
        </div>
        <div className="cont_aura_1"></div>
        <div className="cont_aura_2"></div>
      </div>
    </div>
  );
};

export default NetworError;
