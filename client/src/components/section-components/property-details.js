import React, { useEffect, useState } from "react";

import moment from "moment";
import {
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import "../PropertiesCard/PropertiesCard.css";
import { baseUrl } from "../../config/baseUrl";
// import Checkout from "../payment/checkout";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import "./detail.css";
import UpdateStatus from "./updateStatus";
import Amenities from "./amenities";
import Feature from "./Feature";
import { Table } from "react-bootstrap";
import Description from "./Description";

// import CurrencyPoundIcon from "@material-ui/icons-material/CurrencyPound";
const PropertyDetails = (props) => {
  const { loading } = useSelector((state) => state.property);
  const { user } = useSelector((state) => state.user);
  const history = useHistory();

  const [buildingType, setBuildingType] = useState("");
  const [newStatus, setNewStatus] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const [payPrice, setPayPrice] = useState(0);
  const handleClose = () => setNewStatus(false);
  const [token, setToken] = useState(false);
  // const [updateStatusModal, setUpdateStatusModal] = useState(false);
  console.log("lodd", loading);
  const { property, userId, reload } = props;
  var nf = new Intl.NumberFormat();

  // console.log("propertiessssssssss................", property);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("tokennnnn", token);
    // if (token == null) {
    //   history.push("/");
    // }
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);
  // const handlePay = (pid, listingType) => {
  //   setBuildingType(listingType);
  //   setNewStatus(true);
  //   setPropertyId(pid);
  //   if (listingType === "Sale") {
  //     // setPayPrice(78.74);
  //     setPayPrice(2);
  //   } else if (listingType === "Rent") {
  //     // setPayPrice(39.37);
  //     setPayPrice(1);
  //   }
  // };
  let publicUrl = process.env.PUBLIC_URL + "/";
  useEffect(() => {
    const $ = window.$;
    $("body").addClass("body-bg");
  }, []);
  const handleDownloadPDF = (file) => {
    window.location.href = `${baseUrl}/${file?.[0]?.path}`;
  };
  // const UpdateStatusOfProperty = () => {
  //   setUpdateStatusModal(true);
  // };
  // const handleClosed = () => {
  //   setUpdateStatusModal(false);
  // };

  if (loading) {
    return (
      <div className="property-page-area pd-top-120 pd-bottom-150 ">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-md-12 col-12 text-center pd-top-120">
              {" "}
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
    <div className="property-page-area pd-top-120 p-4">
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 pd-top-100 main_headings_of_pages">
          <h2 style={{ textAlign: "center" }}>Poperty Details</h2>
        </div>
        <div className="row">
          {property?.soldStatus !== null ? (
            ""
          ) : user?._id !== property?.propertyBy ? (
            <>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="mb-4 float-right">
                  <Link
                    to={`/property/chat/${property?.propertyBy}/${property?.location}`}
                  >
                    <button className="btn btn-base btn-elevate">
                      Contact Seller
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="property-details-top pd-bottom-20 ">
              <div className="property-details-top-inner">
                <div className="row">
                  <div className="col-lg-7">
                    <h4>
                      <i class="fas fa-map-marker-alt"></i>
                      {property?.location}, {property?.city}
                    </h4>
                    <h4>
                      {" "}
                      ${nf.format(property?.priceOfProperty)}
                      {property?.buildingType == "Rent" ? "CND Per Month" : ""}
                    </h4>
                    {/* <h4> ${property?.priceOfProperty}</h4> */}
                    <ul>
                      <li>{property?.bedrooms} Bedroom</li>
                      <li>{property?.bathrooms} Bathroom</li>
                      <li>{property?.squareFeet} sqft</li>
                    </ul>
                  </div>
                  <div className="col-lg-5 text-lg-right">
                    {/* <h4> ${nf.format(property?.priceOfProperty)}</h4> */}

                    <div className="btn-wrap">
                      {token !== null && user?._id == property?.propertyBy ? (
                        <a
                          className="btn btn-base btn-sm"
                          href="#"
                          style={{ textTransform: "uppercase" }}
                        >
                          {property?.paymentVerified}
                        </a>
                      ) : null}
                      {token !== null && user?._id == property?.propertyBy ? (
                        <a
                          className="btn btn-blue btn-sm"
                          href="#"
                          style={{ textTransform: "uppercase" }}
                        >
                          {property?.propertyStatus}
                        </a>
                      ) : null}

                      <a
                        className="btn btn-blue btn-sm"
                        href="#"
                        style={{ textTransform: "uppercase" }}
                      >
                        {property?.buildingType}
                      </a>
                    </div>

                    <ul>
                      <li>
                        <img
                          src={publicUrl + "assets/img/icon/1.png"}
                          alt="img"
                        />
                        {moment(property?.createdAt).format("LL")}
                      </li>
                      <li>
                        <img
                          src={publicUrl + "assets/img/icon/2.png"}
                          alt="img"
                        />
                        {property?.propertyViewed}
                      </li>
                    </ul>
                    {/* {propertyPathExist && user?._id === property?.propertyBy && ( */}
                    {user?._id === property?.propertyBy && (
                      <div className="badge__status_update ">
                        {/* <button
                        style={{
                          padding: "10px",
                          backgroundColor: "#0069D9",
                          border: "none",
                          color: "white",
                        }}
                        onClick={() => UpdateStatusOfProperty()}
                      >
                        Update Status
                      </button> */}

                        <UpdateStatus property={property} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="product-thumbnail-wrapper">
                <Carousel>
                  {property?.images?.map((as) => (
                    <div>
                      <img
                        src={`${baseUrl}/${as?.path}`}
                        alt="img"
                        // height={500}
                        // width={500}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="single-property-details-inner">
                  <div className="single-property-grid">
                    <h4>Property Description</h4>

                    <p>
                      {
                        property?.des
                        //         ? property?.des
                        //         : `Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                        // consectetuLorem ipsum dolor sit amet, consectetur adipisicing
                        // elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        // aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        // ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                        // aute irure dolor in reprehenderit in voluptate velit esse cillum
                        // dolore.`
                      }
                    </p>
                  </div>
                  <div className="single-property-grid">
                    <h4>Interior Details</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <ul>
                          <li>
                            <div className="row">
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fas fa-bed"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Bedrooms:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.bedrooms ? property?.bedrooms : "NA"}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i
                                  class="fas fa-parking"
                                  // style={{ color: "green" }}
                                ></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Parking Spots:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.parkingSpots
                                  ? property?.parkingSpots
                                  : "NA"}
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="row">
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fas fa-house-damage"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Floors:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.floors ? property?.floors : "NA"}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i
                                  class="fas fa-parking"
                                  // style={{ color: "green" }}
                                ></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Pets:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.frontType
                                  ? property?.frontType
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                          {/* <li>
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fas fa-home"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                House Type:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.houseType
                                  ? property?.houseType
                                  : "NA"}
                              </div>
                            </div>
                          </li> */}
                        </ul>
                      </div>

                      <div className="col-md-6">
                        <ul>
                          <li>
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fas fa-toilet"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Bathrooms:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.bathrooms
                                  ? property?.bathrooms
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                          <li>
                            {" "}
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fas fa-layer-group"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Area:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.squareFeet
                                  ? property?.squareFeet
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                          <li>
                            {" "}
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fab fa-simplybuilt"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Year Built:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.yearBuild
                                  ? property?.yearBuild
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                          <li>
                            {" "}
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fab fa-simplybuilt"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Community:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.community
                                  ? property?.community
                                  : "NA"}
                              </div>
                            </div>
                          </li>

                          {/* <li>
                            {" "}
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fas fa-couch"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Livingroom:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                2
                              </div>
                            </div>
                          </li> */}
                        </ul>
                      </div>
                      {/* <div className="col-md-4">
                        <ul>
                          <li>
                            {" "}
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fas fa-bed"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Bedrooms:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                3
                              </div>
                            </div>
                          </li>
                          <li>
                            {" "}
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fas fa-couch"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                All Rooms:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                12
                              </div>
                            </div>
                          </li>
                          <li>
                            {" "}
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fas fa-utensils"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Kitchen:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                2
                              </div>
                            </div>
                          </li>
                          <li>
                            {" "}
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fas fa-home"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Type:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                Private House
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div> */}
                    </div>
                  </div>{" "}
                  <div className="single-property-grid">
                    <div className="Exterior">
                      <h4>Exterior/Construction</h4>{" "}
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <ul>
                          <li>
                            <div className="row">
                              {" "}
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i
                                  class="fas fa-parking"
                                  // style={{ color: "green" }}
                                ></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Parking Spots:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.parkingSpots
                                  ? property?.parkingSpots
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul>
                          <li>
                            {" "}
                            <div className="row">
                              <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fab fa-simplybuilt"></i>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Year Built:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.yearBuild
                                  ? property?.yearBuild
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {property?.buildingType == "Rent" ? (
                    ""
                  ) : (
                    <div className="single-property-grid">
                      <h4>Financial Details</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <ul>
                            <li>
                              <div className="row">
                                <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                  <i class="fas fa-dollar-sign"></i>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                  Property Taxes:
                                </div>
                                <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                  {property?.propertyTax ? (
                                    <div> ${property?.propertyTax} </div>
                                  ) : (
                                    "NA"
                                  )}
                                </div>
                              </div>
                            </li>
                            {/* <li>
														<div className="row">
															{" "}
															<div className="col-sm-1 col-md-1 col-lg-1 col-1">
																<i class="fas fa-level-up-alt"></i>
															</div>
															<div className="col-sm-6 col-md-6 col-lg-6 col-6">
																Levels:
															</div>
															<div className="col-sm-4 col-md-4 col-lg-4 col-4">
																2<subscript>nd</subscript>&;
															</div>
														</div>
													</li> */}
                            <li>
                              {" "}
                              <div className="row">
                                {" "}
                                <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                  <i class="fab fa-simplybuilt"></i>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                  Assessment Year:
                                </div>
                                <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                  {property?.assessmentYear
                                    ? property?.assessmentYear
                                    : "NA"}
                                </div>
                              </div>
                            </li>
                            {/* <li>
														{" "}
														<div className="row">
															{" "}
															<div className="col-sm-1 col-md-1 col-lg-1 col-1">
																<i class="fas fa-text-width"></i>
															</div>
															<div className="col-sm-6 col-md-6 col-lg-6 col-6">
																Dimensions
															</div>
															<div className="col-sm-4 col-md-4 col-lg-4 col-4">
																16/12
															</div>
														</div>
													</li> */}
                          </ul>
                        </div>

                        <div className="col-md-6">
                          <ul>
                            <li>
                              <div className="row">
                                {" "}
                                <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                  <i class="fas fa-comment-dollar"></i>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                  Property Tax Year:
                                </div>
                                <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                  {property?.propertyTaxYear ? (
                                    <div> {property?.propertyTaxYear} </div>
                                  ) : (
                                    "NA"
                                  )}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="row">
                                {" "}
                                <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                  <i class="fas fa-comments-dollar"></i>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                  POTL Fee:
                                </div>
                                <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                  {property?.associationPOTLFee ? (
                                    <div> ${property?.associationPOTLFee} </div>
                                  ) : (
                                    "NA"
                                  )}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="row">
                                <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                  <i class="fas fa-dollar-sign"></i>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                  Assessment Amount:
                                </div>
                                <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                  {property?.assessmentAmount ? (
                                    <div> ${property?.assessmentAmount} </div>
                                  ) : (
                                    "NA"
                                  )}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="single-property-grid">
                    <h4>Room Dimensions</h4>
                    {property?.roomDimension?.map((property, index) => (
                      <>
                        <div className="row p-2">
                          <div className="col-md-4 align-property-center">
                            <ul>
                              <li>
                                <div className="row ">
                                  <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                    <i class="fas fa-bath"></i>
                                  </div>
                                  <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                    Room name
                                  </div>
                                  <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                    {property?.attachBathRoom
                                      ? property?.attachBathRoom
                                      : "NA"}
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-4">
                            <ul>
                              <li>
                                <div className="row">
                                  <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                    <i class="fas fa-dollar-sign"></i>
                                  </div>
                                  <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                    Level
                                  </div>
                                  <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                    {property?.levels ? property?.levels : "NA"}
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div className="col-md-4">
                            <ul>
                              <li>
                                <div className="row">
                                  {/* <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                    <i class="fas fa-door-closed"></i>
                                  </div> */}
                                  <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                    <i class="fas fa-dollar-sign"></i>
                                  </div>
                                  <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                    Dimensions:
                                  </div>
                                  <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                    {property?.dimensions
                                      ? property?.dimensions
                                      : "NA"}
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="single-property-grid">
                    <h4>House Timing</h4>
                    <div className="row">
                      <div className="col-md-3 col-lg-3 col-sm-6 col-12 ">
                        <div className="col-md-12">
                          <ul>
                            <li>Day</li>
                          </ul>
                        </div>
                        <div className="responsive">
                          {property?.houseTiming?.map((property, index) => (
                            <div className="col-md-12 ">
                              {/* <i class="fas fa-calendar-check"></i> */}

                              {property?.day ? property?.day : "NA"}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3 col-sm-6 col-12 ">
                        <div className="col-md-12">
                          <ul>
                            <li>Date</li>
                          </ul>
                        </div>
                        <div className="responsive">
                          {property?.houseTiming?.map((property, index) => (
                            <div className="col-md-12 ">
                              {property?.date ? property?.date : "NA"}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3 col-sm-6 col-12 ">
                        <div className="col-md-12">
                          <ul>
                            <li>Opening Timing</li>
                          </ul>
                        </div>{" "}
                        <div className="responsive">
                          {property?.houseTiming?.map((property, index) => (
                            <div className="col-md-12 ">
                              {property?.opening ? property?.opening : "NA"}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3 col-sm-6 col-12 ">
                        <div className="col-md-12">
                          <ul>
                            <li>Closing Timing</li>
                          </ul>
                        </div>
                        <div className="responsive">
                          {property?.houseTiming?.map((property, index) => (
                            <div className="col-md-12 ">
                              {property?.closing ? property?.closing : "NA"}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="single-property-grid">
                    <h4>Date for Rent:</h4>

                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-lg-12 col-12 amenities_div ">
                        <ul>
                          <li>
                            {property?.dateForRent == ""
                              ? "NA"
                              : property?.dateForRent}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="single-property-grid">
                    <h4>Amenities</h4>
                    <div className="row">
                      <div className="col-md-3 col-lg-3 col-sm-6 col-12">
                        <div className="col-md-12">
                          <ul>
                            <li>Appliances</li>
                          </ul>
                        </div>
                        <div className="col-md-12 responsive">
                          {/* <i class="fas fa-calendar-check"></i> */}

                          {property?.appliances?.[0]
                            ? property?.appliances?.[0]
                            : "NA"}
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3 col-sm-6 col-12">
                        <div className="col-md-12">
                          <ul>
                            <li>Neighbouring</li>
                          </ul>
                        </div>
                        <div className="col-md-12 responsive">
                          {property?.neighbouringAmenities?.[0]
                            ? property?.neighbouringAmenities?.[0]
                            : "NA"}
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3 col-sm-6 col-12">
                        <div className="col-md-12">
                          <ul>
                            <li>Basement</li>
                          </ul>
                        </div>
                        <div className="col-md-12 responsive">
                          {property?.basement?.[0]
                            ? property?.basement?.[0]
                            : "NA"}
                        </div>
                      </div>
                      <div className="col-md-3 col-lg-3 col-sm-6 col-12">
                        <div className="col-md-12">
                          <ul>
                            <li>Flooring</li>
                          </ul>
                        </div>
                        <div className="col-md-12 responsive">
                          {/* <i class="fas fa-door-open"></i> */}

                          {property?.flooring?.[0]
                            ? property?.flooring?.[0]
                            : "NA"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="single-property-grid">
                    <h4>Amenities</h4>

                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-lg-12 col-12 amenities_div ">
                        {property?.appliances?.map((property, index) => (
                          <ul className="amenities">
                            <li className="flex ml-2">
                              {property?.value ? property?.value : "NA"}
                            </li>
                          </ul>
                        ))}
                      </div>
                      {/* <div className="col-md-3 col-sm-3 col-lg-3 col-3">
                        <h6>Flooring</h6>
                      </div>
                      <div className="col-md-9 col-sm-9 col-lg-9 col-9 amenities_div">
                        {property?.flooring?.map((property, index) => (
                          <ul className="amenities">
                            <li className="flex ml-2">
                              {property?.value ? property?.value : "-"}
                            </li>
                          </ul>
                        ))}
                      </div>{" "} */}
                    </div>
                  </div>
                  <div className="single-property-grid">
                    <h4>Utility Types</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <ul>
                          <li>
                            <div className="row">
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                House Type:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.houseType
                                  ? property?.houseType
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Water Type:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.waterType
                                  ? property?.waterType
                                  : "NA"}
                              </div>
                            </div>
                          </li>{" "}
                          <li>
                            <div className="row">
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Roofing Type:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.roofingType
                                  ? property?.roofingType
                                  : "NA"}
                              </div>
                            </div>
                          </li>{" "}
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul>
                          <li>
                            <div className="row">
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Cooling Type:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.coolingType
                                  ? property?.coolingType
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Heating Type:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.heatingType
                                  ? property?.heatingType
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Heating Fuel:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.heatingFuel
                                  ? property?.heatingFuel
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              {" "}
                              {/* <div className="col-sm-1 col-md-1 col-lg-1 col-1">
                                <i class="fab fa-gripfire"></i>
                              </div> */}
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Fire Places(Fuel):
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6 col-4">
                                {property?.firePlacesFuel
                                  ? property?.firePlacesFuel
                                  : "NA"}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              {" "}
                              <div className="col-sm-6 col-md-6 col-lg-6 col-6">
                                Hydro Gas:
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                                {property?.viewType ? property?.viewType : "NA"}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="single-property-grid">
                    <h4>Offers</h4>
                    <div className="single-property-grid property-bid">
                      <div className="row">
                        <div className="col-md-9 bid-date">
                          csjg &nbsp;&nbsp;
                          {moment(property?.createdAt).format("LL")}
                          <div className="pt-2">
                            <button className="left-bid-button ">Bid</button>
                          </div>
                        </div>
                        <div className="col-md-3 right-bid">
                          <span className="bid-button">Heighest Bid</span>
                          <span className="bid-amount ">
                            {" "}
                            ${nf.format(865000)}
                          </span>
                          {/* <span className="bid-text"> With autoBid</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="single-property-grid property-bid-next">
                      <div className="row">
                        <div className="col-md-9 bid-date-next">
                          <span>KK Tech Partner team</span>&nbsp; csjg
                          &nbsp;&nbsp;
                          {moment(property?.createdAt).format("LL")}
                          <div className="pt-2">
                            <button className="left-bid-button ">Bid</button>
                          </div>
                        </div>
                        <div className="col-md-3 right-bid-next">
                          <span className="bid-amount-next">
                            {" "}
                            ${nf.format(865000)}
                          </span>
                          {/* <span className="bid-text"> With autoBid</span> */}
                        </div>
                      </div>
                    </div>{" "}
                    <div className="single-property-grid property-bid-next">
                      <div className="row">
                        <div className="col-md-9 bid-date-next">
                          <span>KK Tech Partner team</span>&nbsp; csjg
                          &nbsp;&nbsp;
                          {moment(property?.createdAt).format("LL")}
                          <div className="pt-2">
                            <button className="left-bid-button ">Bid</button>
                          </div>
                        </div>
                        <div className="col-md-3 right-bid-next">
                          <span className="bid-amount-next">
                            {" "}
                            ${nf.format(865000)}
                          </span>
                          {/* <span className="bid-text"> With autoBid</span> */}
                        </div>
                      </div>
                    </div>{" "}
                    <div className="single-property-grid property-bid-next">
                      <div className="row">
                        <div className="col-md-9 bid-date-next">
                          <span>KK Tech Partner team</span>&nbsp; csjg
                          &nbsp;&nbsp;
                          {moment(property?.createdAt).format("LL")}
                          <div className="pt-2">
                            <button className="left-bid-button ">Bid</button>
                          </div>
                        </div>
                        <div className="col-md-3 right-bid-next">
                          <span className="bid-amount-next">
                            {" "}
                            ${nf.format(865000)}
                          </span>
                          {/* <span className="bid-text"> With autoBid</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Appliances</th>
                          <th>Kitchen</th>
                          <th>Bath</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>
                            {" "}
                            {property?.appliances?.map((property, index) => (
                              <ul className="amenities">
                                <li className="flex ml-2">
                                  {property?.value ? property?.value : ""}
                                </li>
                              </ul>
                            ))}
                          </td>
                          <td>
                            {" "}
                            {property?.kitchenAmenities?.map((property, index) => (
                              <ul className="amenities">
                                <li className="flex ml-2">
                                  {property?.value ? property?.value : "-"}
                                </li>
                              </ul>
                            ))}
                          </td>
                          <td>
                            {" "}
                            {property?.bathAmenities?.map((property, index) => (
                              <ul className="amenities">
                                <li className="flex ml-2">
                                  {property?.value ? property?.value : "-"}
                                </li>
                              </ul>
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </table> */}
                  {/* <Amenities /> */}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* <div className="col-md-4 col-12 top-4 sticky ">
          <div className="single-property-grid " style={{ padding: "17px" }}>
            <div className="float-right ">Activity</div>
            <h6
              style={{
                border: "1px solid #5ba600",
                width: "70px",
                borderRadius: "5px",
                backgroundColor: "#0d1741",
                color: "white",
                padding: "2px",
                flexDirection: "row",
              }}
            >
              <div className="property__viewed">
                <span className="viewed" style={{ color: "white" }}>
                  {property?.propertyViewed}
                </span>
                <span className="ml-2 mb-1">
                  <ViewIcon />
                </span>
              </div>
            </h6>

            <h6
              style={{
                border: "1px solid #5ba600",
                width: "170px",
                textAlign: "center",
                borderRadius: "5px",
                background:
                  "linear-gradient(to left,#068555,#0C7B70,#0C7B70,#10767F)", */}
          {/* color: "white",
                padding: "2px",
              }} */}
          {/* > */}
          {/* <CurrencyPoundIcon /> */}
          {/* <AttachMoney /> */}
          {/* Property Price */}
          {/* </h6>
            <h3>$ {property?.priceOfProperty}</h3>
            {user?._id !== property?.propertyBy ? (
              <div className="col-md-12 col-sm-12 col-lg-12 col-12">
                {" "}
                <Link
                  to={`/property/chat/${property?.propertyBy}/${property?.location}`}
                >
                  <h6
                    style={{
                      border: "1px solid #5ba600",
                      textAlign: "center",
                      borderRadius: "15px",
                      padding: "12px",
                      color: "#5ba600",
                      cursor: "pointer",
                    }}
                  >
                    Contact With Seler
                  </h6>
                </Link>
              </div>
            ) : (
              <div className="col-md-12 col-sm-12 col-lg-12 col-12">
                <h6
                  style={{
                    border: "1px solid #5ba600",
                    textAlign: "center",
                    borderRadius: "15px",
                    padding: "12px",
                    color: "#5ba600",
                  }}
                >
                  Your House Your Choice
                </h6>
              </div>
            )} */}
          {/* <div className="row mt-4">
              <div className="col-md-6 col-sm-6 col-lg-6 col-12 ">
                <div
                  className="single-property-grid "
                  style={{
                    backgroundColor: " #0d1741",
                    padding: "10px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <Chat />
                  <br />
                  Have a Question? <br />
                  Ask the Owner
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-lg-6 col-12">
                <div
                  className="single-property-grid "
                  style={{
                    backgroundColor: " #F6B551",
                    padding: "10px",
                    color: "white", */}
          {/* // paddingLeft: "14px", */}
          {/* cursor: "pointer", */}
          {/* }} */}
          {/* >
                  <CardGiftcard />
                  <br />
                  Book a<br />
                  Private Showing
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-lg-12 col-12">
                <p style={{ textAlign: "center" }}>
                  <Call /> Call us at (+92) 300 630 2263
                </p>
              </div> */}

          {/* <div className="col-md-12 col-sm-12 col-lg-12 col-12">
                <div
                  className="single-property-grid "
                  style={{
                    backgroundColor: "#dad6d6",
                    textAlign: "center",
                    padding: "16px",
                    paddingLeft: "14px",
                    cursor: "pointer",
                  }}
                > */}
          {/* <PriorityHigh /> */}
          {/* <Help />
                  <br />
                  We're committed to a better buying experience that creates an
                  equal opportunity for all buyers.
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
      {/* {updateStatusModal && (
        <UpdateStatus
          updateStatusModal={updateStatusModal}
          handleClose={handleClosed}
        />
      )} */}
    </div>
  );
};

export default PropertyDetails;
