import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";
import { useSelector } from "react-redux";

import "./PropertiesCard.css";
import {
  ViewIcon,
  DeleteIcon,
  EditIcon,
  ArrowUpDownIcon,
} from "@chakra-ui/icons";
import Delete from "./Delete";
// import { handleInputChange } from "react-select/dist/declarations/src/utils";

const PropertiesCard = (props) => {
  const { property, reloadData } = props;
  const { listingType } = useParams();

  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const [deleteModal, setDeleteModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const propertyPath = location.pathname;
  const propertyPathExist = propertyPath.includes("my/properties");

  const Submit = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };
  const handleUpdate = (id) => {
    setUpdate(true);
  };

  var nf = new Intl.NumberFormat();
  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <>
      <div className="col-lg-4 col-md-6 ">
        <div className="single-product-wrap style-bottom">
          {/* <div className="single-product-wrap"> */}
          <Link to={`/property-details/${property?._id}`}>
            <div className="">
              <img
                className="product__img"
                src={`${baseUrl}/${property?.images?.[0]?.path}`}
                alt="img"
                height={300}
                width={570}
              />
              <div className="status__main">
                {/* Listing Status Sale or Rent */}
                <div className="badge__status">
                  <span
                    className={
                      property?.buildingType === "Sale"
                        ? "listing__type__sale"
                        : "listing__type__rent"
                    }
                  >
                    For {property?.buildingType}
                  </span>
                </div>{" "}
                <div className="badge__status_update">
                  {property?.soldStatus == null ? (
                    ""
                  ) : (
                    <span
                      className={
                        property?.buildingType === "Sale"
                          ? "listing__type__sale"
                          : "listing__type__rent"
                      }
                    >
                      {property?.soldStatus}
                    </span>
                  )}
                </div>
              </div>
              {/* <div className="product-wrap-details">
            <div className="media">
              <div className="author">
                <img src={publicUrl + "assets/img/author/2.png"} alt="img" />
              </div>
              <div className="media-body">
                <h6>
                  <Link to="/property">Owner Name</Link>
                </h6>
                <p>
                  <img
                    src={publicUrl + "assets/img/icon/location-alt.png"}
                    alt="img"
                  />
                  {property.city}
                </p>
              </div>
              <a className="fav-btn float-right" href="#">
                <i className="far fa-heart" />
              </a>
            </div>
          </div> */}
            </div>
          </Link>
          <div className="product-details-inner">
            <div className="property__details">
              {propertyPathExist && user?._id === property?.propertyBy && (
                <div className="badge__status">
                  <span
                    className={
                      property?.paymentVerified === "paid"
                        ? "teal"
                        : property?.paymentVerified === "unpaid"
                        ? "red"
                        : null
                    }
                  >
                    {property?.paymentVerified}
                  </span>
                  {/* Property Status Badge */}
                  <span
                    className={
                      property?.propertyStatus === "pending"
                        ? "purple"
                        : property?.propertyStatus === "disapproved"
                        ? "red"
                        : "teal"
                    }
                    style={{ marginLeft: "4px" }}
                  >
                    {property?.propertyStatus}
                  </span>
                  {/* {property?.paymentVerified === "unpaid" ? (
                  <button
                    className="pay__button"
                    onClick={() =>
                      handlePay(property?._id, property?.listingType)
                    }
                  >
                    Pay Now
                  </button>
                ) : property?.paymentVerified === "unpaid" ? (
                  <button
                    className="pay__button"
                    onClick={() =>
                      handlePay(property?._id, property?.listingType)
                    }
                  >
                    Pay Now
                  </button>
                ) : null} */}
                  {/* Bedroom and Bathroom section */}
                </div>
              )}
            </div>{" "}
            <h5 className="property__tilte">
              {/* {" "}
              <img
                src={publicUrl + "assets/img/icon/location2.png"}
                alt="img"
              />{" "} */}
              <i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;
              {property?.location}
            </h5>
            <h5
              style={{
                color: "#2871DF",
                fontWeight: "bold",
              }}
            >
              ${nf.format(property.priceOfProperty)}
              <span style={{ color: "grey" }}> CND</span>
            </h5>
            <h5 className="property__tilte">
              {/* {" "}
              <img
                src={publicUrl + "assets/img/icon/location2.png"}
                alt="img"
              />{" "} */}
              {/* <i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp; */}
              {property?.houseType == "" ? (
                ""
              ) : (
                <>
                  <i class="fas fa-home"></i>&nbsp;
                  {property?.houseType}
                </>
              )}
            </h5>
            <div
              className={
                propertyPathExist
                  ? `details__bed__bath`
                  : `details__bed__bath m-0`
              }
            >
              <i class="fas fa-bed" style={{ color: "#2871DF" }}></i>&nbsp;
              {property?.bedrooms} beds &bull;{" "}
              <i class="fas fa-toilet" style={{ color: "#2871DF" }}></i>
              &nbsp;{property?.bathrooms} baths
              <div
                className=" float-right "
                style={{
                  // border: "1px solid #5ba600",
                  width: "70px",
                  borderRadius: "5px",
                  // backgroundColor: "#0d1741",
                  // backgroundColor: "#2871DF",
                  color: "#2871DF",
                  flexDirection: "row",
                }}
              >
                <div className="property__viewed">
                  <span className="viewed" style={{ color: "#718096" }}>
                    {property?.propertyViewed}
                  </span>
                  <span className="ml-2 mb-1">
                    <ViewIcon />
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="property__viewed">
              <span className="viewed">{property?.propertyViewed}</span>
              <span className="ml-2 mb-1">
                <ViewIcon />
              </span>
            </div> */}
            {propertyPathExist && (
              <div className="property__card__bottom">
                <div className="property__icons">
                  <Link
                    to={`/add-property/${listingType}/Edit/${property?._id}`}
                  >
                    <div className="icons__box">
                      <span className="icon">
                        <EditIcon
                          onClick={() => handleUpdate(property?._id)}
                          update={update}
                        />
                      </span>
                    </div>
                  </Link>
                  <div className="icons__box">
                    <span className="icon">
                      <DeleteIcon onClick={() => Submit(property?._id)} />
                    </span>
                  </div>
                  <Link to={`/property-details/${property?._id}`}>
                    <div className="icons__box">
                      <span className="icon">
                        <ViewIcon />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {/* <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            Beautiful {property.houseType} With {property.frontType}
          </Box> */}
            {/* <ul className="meta-inner">
            <li>
              <img
                src={publicUrl + "assets/img/icon/location2.png"}
                alt="img"
              />
              {property.location}
            </li>
            <li>
              <Link to="/property"> For {property.buildingType}</Link>
            </li>
          </ul> */}
          </div>
          {/* <div className="product-meta-bottom">
          <span className="price">$ {property.priceOfProperty}</span>
          <span>For {property.buildingType}</span>
          <span>{moment(property.createdAt, "YYYYMMDD").fromNow()}</span>
        </div> */}
        </div>
        {deleteModal && (
          <Delete
            setDeleteModal={setDeleteModal}
            reloadData={reloadData}
            id={deleteId}
          />
        )}
      </div>
    </>
  );
};

export default PropertiesCard;
