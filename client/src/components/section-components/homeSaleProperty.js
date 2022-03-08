import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_RENT_PROPERTY,
  GET_SALE_PROPERTY,
} from "../../reducers/propertyReducer";
import PropertiesCard from "../PropertiesCard/PropertiesCard";
import Spinner from "../Spinner";
// import PropertiesCard from "../PropertiesCard/PropertiesCard";
// import { GET_RENT_PROPERTY } from "../../reducers/propertyReducer";
const Property = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const dispatch = useDispatch();
  const [sale, setSale] = useState([]);
  const [rent, setRent] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [newStatus, setNewStatus] = useState(false);
  const [click, setClick] = useState(false);
  const { RentProperty, SaleProperty, loading } = useSelector(
    (state) => state.property
  );
  console.log("Rent.....", RentProperty);
  console.log("Sale.....", SaleProperty);
  useEffect(() => {
    getDataRent();
    getData();
  }, [dispatch]);

  const getDataRent = async () => {
    dispatch(GET_RENT_PROPERTY());
  };
  const getData = async () => {
    dispatch(GET_SALE_PROPERTY());
  };
  useEffect(() => {
    setDataRent();
    setData();
  }, [RentProperty, SaleProperty]);
  const setDataRent = async () => {
    setRent(RentProperty);
  };

  const setData = async () => {
    setSale(SaleProperty);
  };
  // if (loading) {
  //   return (
  //     <>
  //       <Spinner />;<p>Loading...</p>;
  //     </>
  //   );
  // }
  return (
    <div className="properties-area pt-4">
      <div className="container-fluid">
        <div className="section-title text-center">
          {/* <h6>Our Properties</h6> */}
          {/* <h2>Sale Properties </h2> */}
        </div>
        {/* <div className="mgd-tab-inner text-center">
					<ul className="nav nav-tabs" id="myTab" role="tablist">
						<li className="nav-item">
							<a
								className="nav-link active"
								id="rent1-tab"
								data-toggle="tab"
								href="#rent1"
								role="tab"
								aria-controls="rent1"
								aria-selected="true"
							>
								Rent
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								id="sell1-tab"
								data-toggle="tab"
								href="#sell1"
								role="tab"
								aria-controls="sell1"
								aria-selected="false"
							>
								Sale
							</a>
						</li>
					</ul>
				</div> */}
        {/* <div className="tab-content" id="myTabContent"> */}
        {/* <div
          className="tab-pane fade show active"
          id="rent1"
          role="tabpanel"
          aria-labelledby="rent1-tab"
        >
          <div className="row">
            {loading ? (
              <div className="col-md-12 col-12 text-center">
                <span className="text-center">Loading...</span>
              </div>
            ) : rent?.length > 0 ? (
              rent?.map(
                (item, index) =>
                  item.propertyStatus == "approved" && (
                    <PropertiesCard property={item} key={index} />
                  )
                // <PropertiesCard property={item} key={index} />
              )
            ) : (
              "No items Found!"
            )}
          </div>
        </div> */}
        {/* <div
          className="tab-pane fade"
          id="sell1"
          role="tabpanel"
          aria-labelledby="sell1-tab"
        > */}
        <div className="row">
          {loading ? (
            <div className="col-md-12 col-12 text-center p-4">
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
          ) : sale?.length > 0 ? (
            sale?.map(
              (item, index) =>
                item.propertyStatus == "approved" && (
                  <PropertiesCard property={item} key={index} />
                )
            )
          ) : (
            <div className="col-md-12 col-12 pd-top-120">
              <p>"No Property Found!"</p>
            </div>
          )}
          {/* </div> */}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Property;
