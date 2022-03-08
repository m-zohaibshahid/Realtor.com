import React, { useState } from "react";

const ProfilePage = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div className="blog-page-area pd-top-120 ">
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <div className="card p-3 py-4">
              <div className="text-center">
                {" "}
                <img
                  src="https://i.imgur.com/bDLhJiP.jpg"
                  width="100"
                  className="rounded-circle"
                />{" "}
              </div>
              <div className="text-center mt-3">
                {" "}
                <span className="bg-secondary p-1 px-4 rounded text-white">
                  Pro
                </span>
                <h5 className="mt-2 mb-0">Alexender Schidmt</h5>{" "}
                {/* <span>UI/UX Designer</span> */}
                <div className="px-4 mt-1">
                  <p className="fonts">
                    Consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.{" "}
                  </p>
                </div>
                {/* <ul className="detail">
                  <li>
                    <i className="fa fa-facebook"></i>
                  </li>
                  <li>
                    <i className="fa fa-dribbble"></i>
                  </li>
                  <li>
                    <i className="fa fa-instagram"></i>
                  </li>
                  <li>
                    <i className="fa fa-linkedin"></i>
                  </li>
                  <li>
                    <i className="fa fa-google"></i>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/solverwp/">
                      <i className="fab fa-facebook-f" aria-hidden="true" />
                    </a>
                  </li>
                  <li style={{ paddingLeft: "120px" }}>
                    <a href="https://www.twitter.com/solverwp/">
                      <i className="fab fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li style={{ paddingLeft: "120px" }}>
                    <a href="https://www.instagram.com/solverwp/">
                      <i className="fab fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                </ul>  */}{" "}
                <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={fname}
                      required
                      style={{ height: "60px" }}
                      onChange={(e) => {
                        setFname(e.target.value);
                      }}
                    />
                  </label>
                </div>{" "}
                <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lname}
                      required
                      style={{ height: "60px" }}
                      onChange={(e) => {
                        setLname(e.target.value);
                      }}
                    />
                  </label>
                </div>{" "}
                <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="Enter Email Address"
                      value={email}
                      required
                      style={{ height: "60px" }}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </label>
                </div>{" "}
                <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="number"
                      placeholder="Enter Phone Number`"
                      value={phoneNumber}
                      required
                      style={{ height: "60px" }}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </label>
                </div>{" "}
                <div className="buttons">
                  {" "}
                  <button className="btn btn-outline-primary px-4">
                    Message
                  </button>{" "}
                  <button className="btn btn-primary px-4 ms-3">Contact</button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
