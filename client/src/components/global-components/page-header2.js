import React, { Component } from "react";
import { Link } from "react-router-dom";
// import NetworkError from "../../Hoc/NetworkError";
// import NetworkDetector from "../../Hoc/NetworkDetector";

const Page_header = (props) => {
  let HeaderTitle = props.headertitle;
  let HeaderImg = props.headerimg;
  let publicUrl = process.env.PUBLIC_URL + "/";
  let Subheader = props.subheader ? props.subheader : HeaderTitle;

  return (
    <>
      <div
        className="breadcrumb-area bg-overlay-2"
        style={{
          // backgroundImage: 'url("' + publicUrl + 'assets/img/home3.png")',
          backgroundImage: 'url("' + publicUrl + HeaderImg + '")',
          height: "500px",
        }}
      >
        <div className="container ">
          <div className="breadcrumb-inner ">
            <div className="section-title text-center">
              <h2
                className="page-title mt-4"
                style={{ textTransform: "capitalize" }}
              >
                {HeaderTitle}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page_header;
