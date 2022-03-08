import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROPERTY } from "../../reducers/propertyReducer";
import Spinner from "../Spinner";
import { baseUrl } from "../../config/baseUrl";
import PropertiesCard from "../PropertiesCard/PropertiesCard";
const Product = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";

  const dispatch = useDispatch();
  const [sale, setSale] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { property, loading } = useSelector((state) => state.property);

  console.log("property.....", property);
  useEffect(() => {
    // setLoading(true);
    getData();
  }, [dispatch]);

  const getData = async () => {
    dispatch(GET_PROPERTY());
    // setLoading(false);
  };

  useEffect(() => {
    setData();
  }, [property]);

  const setData = async () => {
    setAllProperties(property);
    // setLoading(false);
  };
  // if (loading) {
  //   return <p>loading....</p>;
  // }
  return (
    <div className="blog-page-area pd-top-120 ">
      <div className="container-fluid mx-2">
        {/* <div className="col-lg-12 col-md-6  text-center ">
          <h2 style={{ color: "transparent" }}>..</h2>
        </div> */}
        <div className="row">
          {loading ? (
            <div className="col-md-12 col-12 text-center  pd-top-120  pd-bottom-150 ">
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
          ) : allProperties?.length > 0 ? (
            allProperties?.map(
              (item, index) =>
                item?.houseTiming == [] ? (
                  ""
                ) : item.propertyStatus == "approved" ? (
                  <PropertiesCard property={item} key={index} />
                ) : (
                  ""
                )
              // <PropertiesCard property={item} key={index} />
            )
          ) : (
            <div className="col-md-12 col-12 text-center pd-bottom-120 pd-top-120">
              No property found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
