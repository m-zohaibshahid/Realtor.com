import React from "react";
import { useSelector } from "react-redux";
import PropertiesCard from "../PropertiesCard/PropertiesCard";
import { useHistory } from "react-router-dom";
const SearchResult = () => {
  const history = useHistory();
  const { result, loading } = useSelector((state) => state.filter);
  if (loading == true) {
    return (
      <div className="property-page-area pd-top-120 pd-bottom-90 ">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-md-12 col-12 pd-top-120 pd-bottom-90 text-center">
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
    <div className="product-area pd-top-118 ">
      <div className="container-fluid">
        <div className="section-title text-center main_headings_of_pages">
          {/* <h6>We are offering the best real estate</h6> */}
          <h2>Search Results For You</h2>
        </div>
        <div className="row">
          <div className="col-md-1 col-lg-1 col-sm-1"></div>
          <div className="col-md-10 col-lg-10 col-sm-12 col-12 ">
            <div className="product-search-inner bg-main">
              <div className="row custom-gutters-20">
                <div className="col-md-3 align-self-center">
                  <h5>{result?.length} Results Found</h5>
                </div>
                <div className="col-md-6 mt-2 mt-md-0"></div>
                <div className="col-md-3 mt-2 mt-md-0 align-self-center">
                  <div className="col-md-12 align-self-center">
                    <h5 onClick={history.goBack} style={{ cursor: "pointer" }}>
                      Go Back
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1 col-lg-1 col-sm-1"></div>
        </div>
        <div className="row">
          {result?.length > 0 ? (
            result?.map(
              (item, index) =>
                item.propertyStatus === "approved" && (
                  <PropertiesCard property={item} key={index} />
                )
            )
          ) : (
            <div className="col-sm-12 col-md-12 col-lg-12 col-12">
              <h6 className="pt-4 pb-4 text-center">No property found!</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
