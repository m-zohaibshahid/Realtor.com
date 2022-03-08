import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropertiesCard from "./PropertiesCard/PropertiesCard";
import { useHistory } from "react-router-dom";
import {
  GET_RENT_LOGGED_USER_PROPERTY,
  GET_SALE_LOGGED_USER_PROPERTY,
} from "../reducers/propertyReducer";
const SaleList = () => {
  const dispatch = useDispatch();
  // const [sale, setSale] = useState([]);
  const [rent, setRent] = useState([]);
  // const [allProperties, setAllProperties] = useState([]);
  // const [newStatus, setNewStatus] = useState(false);
  const [token, setToken] = useState(false);
  const history = useHistory();
  const { LoggedRentProperty, LoggedSaleProperty, loading } = useSelector(
    (state) => state.property
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("tokennnnn", token);
    if (token == null) {
      history.push("/");
    }
  }, []);
  // const { user } = useSelector((state) => state.user);
  const { listingType } = useParams();
  console.log("listing .............", listingType);
  // let publicUrl = process.env.PUBLIC_URL + "/";
  useEffect(() => {
    // const $ = window.$;
    // $("body").addClass("body-bg");

    listingType == "rent" ? getDataRent() : getDataSale();
  }, [listingType]);

  const getDataRent = async () => {
    dispatch(GET_RENT_LOGGED_USER_PROPERTY());
  };
  const getDataSale = async () => {
    dispatch(GET_SALE_LOGGED_USER_PROPERTY());
  };
  useEffect(() => {
    listingType == "rent" ? setDataRent() : setDataSale();
  }, [listingType, LoggedRentProperty, LoggedSaleProperty]);
  const setDataRent = async () => {
    setRent(LoggedRentProperty);
  };

  const setDataSale = async () => {
    setRent(LoggedSaleProperty);
  };

  const reloadData = () => {
    getDataSale();
    getDataRent();
  };
  // if (loading == true) {
  //   return <Spinner />;
  // }
  return (
    <div className="blog-page-area pt-5">
      <div className="container-fluid pl-4">
        <div className="row align-self-center">
          <div className="col-md-12 col-12">
            <div className="mb-4 float-right">
              <Link to={`/add-property/${listingType}/Add/null`}>
                <button className="btn btn-base">
                  Submit <i className="fa fa-plus" />
                </button>
              </Link>
            </div>
          </div>
          {loading ? (
            <div className="col-md-12 col-12 text-center pb-4">
              <span className="text-center">
                {" "}
                <i
                  className="fa fa-spinner fa-spin"
                  style={{
                    fontSize: "15px",
                    marginRight: "5px",
                    color: "black",
                  }}
                ></i>
              </span>
            </div>
          ) : rent?.length > 0 ? (
            rent?.map((item, index) => (
              <PropertiesCard
                property={item}
                reloadData={reloadData}
                key={index}
              />
            ))
          ) : (
            <div className="col-sm-12 col-md-12 col-lg-12 col-12">
              <h6 className=" pt-4 pb-4 text-center">No property found!</h6>
            </div>
          )}
          {/* {loading ? (
            <div className="spinner-border">
              <span>Loading...</span>
            </div>
          ) : rent?.length > 0 ? (
            rent?.map((item, index) => (
              <PropertiesCard
                property={item}
                reloadData={reloadData}
                key={index}
              />
            ))
          ) : (
            <div className="text-center mt-4">No property found!</div>
          )} */}
          {/* <div
            className="pagination-area text-center my-4"
            style={{ width: "100%" }}
          >
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="la la-angle-double-left" />
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="la la-angle-double-right" />
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SaleList;
