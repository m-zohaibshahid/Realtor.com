import React, { useState, useEffect, Fragment, useRef } from "react";
import { baseUrl } from "../../config/baseUrl";
// import Table from "../../modules/Partials/DataTables";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import "./profile.css";

import ProfileUpdate from "./ProfileUpdate";
import { Link } from "react-router-dom";
import { isMeAuth } from "../../reducers/authReducer";
import { me } from "../../helpers/auth";
toast.configure();

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getLoggedInUserData();
  }, []);
  const getLoggedInUserData = () => {
    setLoading(true);
    try {
      me().then((data) => {
        if (data) {
          console.log("asdfasdfasdf", data);
          dispatch(isMeAuth({ data }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [emailCheck, setEmailCheck] = useState(false);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: false,
  });
  const fileInputRef = useRef();
  const { singleProperty } = useSelector((state) => state.property);

  const [newEdit, setNewEdit] = useState(false);
  const handleClose = () => setNewEdit(false);
  const handleCloseEmail = () => setEmailCheck(false);
  const handleShowName = () => {
    setData({
      fname: user?.fname,
      lname: user?.lname,
      email: "",
      password: false,
    });
    setNewEdit(true);
    console.log("user data in redux", user);
    console.log("data in prodile", data);
  };

  const handleShowEmail = () => {
    setData({ name: "", email: user?.email, password: false });
    setEmailCheck(true);
  };
  const handleShowPassword = () => {
    setNewEdit(true);
    setData({ name: "", email: "", password: true });
  };
  const imageUploadHandler = (e) => {
    console.log("ewwww", ...e.target.files);
    console.log("file inpur ref", fileInputRef);
    let dumpMedia = [...images];
    console.log("object", ...e.target.files);
    if (images.length < 25) {
      dumpMedia.push(...e.target.files);
      setImages(dumpMedia);
      // setImageCheck(true);
    }
  };
  if (loading) {
    return (
      <div className="property-page-area pd-top-120 pd-bottom-90 ">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-md-12 col-12 text-center pd-top-120 pd-bottom-90">
              <i
                className="fa fa-spinner fa-spin"
                style={{
                  fontSize: "15px",
                  marginRight: "5px",
                  color: "black",
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="content-wrapper pd-top-118">
      {/*<div className="row" style={{ marginTop: "10px" }}>
          <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0 ">
            <h3 className="font-weight-bold">Profile</h3>
            <h6 className="font-weight-normal mb-0">Profile Change Easily</h6>
          </div>
        </div>*/}

      <div className="card">
        <div className="card-body">
          <div
            className="row "
            style={{
              border: "2px solid #ffff",
              borderRadius: "10px",
            }}
          >
            <div className="col-md-4 border-right ">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                {/* <div className="col-sm-12 col-md-12 col-lg-12 col-12 mt-4">
                  <div className="avatar-upload-input text-center col-sm-12 col-md-12 col-lg-12 col-12 mt-4"> */}
                {/* <h2>Update your photo</h2> */}
                {/* <p style={{ color: "red" }}>Image Dimensions 412X290</p> */}
                {/* <div className="avatar-edit-input col-sm-12 col-md-12 col-lg-12 col-12 mt-4">
                      <input
                        className="btn btn-base"
                        type="file"
                        id="imageUpload"
                        // multiple
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                          imageUploadHandler(e);
                        }}
                        ref={fileInputRef}
                      />
                      <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                        <label htmlFor="imageUpload">
                          <img
                            className="rounded-circle "
                            htmlFor="imageUpload"
                            width="150px"
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                          />
                        </label>
                      </div> */}
                {/* <label htmlFor="imageUpload"> */}
                <img
                  className="rounded-circle "
                  htmlFor="imageUpload"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                {/* </label> */}
                {/* </div>
                    {images?.length === 0
                      ? ""
                      : images?.map((singleProperty, i) => (
                          <Fragment key={i}>
                            <img
                              className="rounded-circle "
                              style={{
                                marginLeft: "10px",
                                marginTop: "20px",
                                borderRadius: "10px",
                                border: "1px solid #5ba600",
                                padding: "2px",
                              }}
                              src={
                                singleProperty.hasOwnProperty("path")
                                  ? `${baseUrl}/${singleProperty.path}`
                                  : URL.createObjectURL(singleProperty)
                              }
                              width={180}
                              height={140}
                              alt=""
                            />
                          </Fragment>
                        ))}
                  </div>
                </div>{" "} */}
                <span className="font-weight-bold">{user?.name}</span>
                <span className="text-black-50">{user?.email}</span>
                <span> </span>
              </div>
            </div>

            <div className="col-md-8  grid-margin stretch-card mt-4  ">
              <div className="p-3 " style={{ width: "100%" }}>
                <div
                  className="d-flex  mb-4 text-center"
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h4
                    className="card-title text-center"
                    style={{ fontWeight: "bolder", fontSize: "2rem" }}
                  >
                    {" "}
                    Profile Setting{" "}
                  </h4>
                </div>
                <div
                  className="card border px-4 pb-3  mt-3"
                  style={{
                    boxShadow: "4px 4px 4px 4px white",
                  }}
                >
                  <div
                    className="row"
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    <div className="col-md-11 col-sm-11 col-10">
                      <label className="labels mt-3">Name</label>
                      <h4>
                        {user?.fname} {user?.lname}
                      </h4>
                    </div>
                    <div className="col-md-1 col-sm-1 col-2 mt-1">
                      <i
                        className="fas fa-pencil-alt update"
                        onClick={() => handleShowName()}
                      ></i>{" "}
                    </div>
                  </div>
                </div>
                <div
                  className="card border px-4 pb-3  mt-3"
                  style={{
                    boxShadow: "4px 4px 4px 4px white",
                  }}
                >
                  <div
                    className="row"
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    <div className="col-md-11 col-sm-11 col-10">
                      <label className="labels mt-3">Email</label>
                      <h4>{user?.email}</h4>
                    </div>
                    <div className="col-md-1 col-sm-1 col-2 mt-1">
                      <i
                        className="fas fa-pencil-alt update"
                        onClick={() => handleShowEmail()}
                      ></i>
                    </div>
                  </div>
                </div>
                <div
                  className="card border px-4 pb-3  mt-3"
                  style={{
                    boxShadow: "4px 4px 4px 4px white",
                  }}
                >
                  <div
                    className="row"
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    <div className="col-md-11 col-sm-11 col-10">
                      <label className="labels mt-3">Password</label>
                      <h4>********</h4>
                    </div>
                    <div className="col-md-1 col-sm-1 col-2 mt-1">
                      {/* <i className="fas fa-pencil-alt"></i> */}
                      <i
                        className="fas fa-pencil-alt update"
                        onClick={() => handleShowPassword()}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileUpdate
        data={data}
        newEdit={newEdit}
        emailCheck={emailCheck}
        handleClose={handleClose}
        handleCloseEmail={handleCloseEmail}
        reload={getLoggedInUserData}
      />
    </div>
  );
};

export default ProfilePage;
