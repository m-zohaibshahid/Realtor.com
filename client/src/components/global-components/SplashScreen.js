import React from "react";
// import Loader from "react-loader-spinner";

const SplashScreen = () => {
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
      }}
    >
      {/* <Loader
        type="TailSpin"
        color=" #282C35"
        height={50}
        width={50}
        timeout={3000} //3 secs
      /> */}
      <i
        className="fa fa-spinner fa-spin"
        style={{
          fontSize: "15px",
          marginRight: "5px",
          color: "black",
        }}
      ></i>
    </div>
  );
};

export default SplashScreen;
