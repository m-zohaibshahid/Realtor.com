import React, { useState } from "react";
import "./Filter.css";
const Filter = () => {
  return (
    <>
      <div>
        <div className="search-bar mt-5 p-3 p-lg-1 ps-lg-4">
          <form action="#">
            <div
              className="row "
              // style={{ paddingTop: "3px", paddingBottom: "3px" }}
            >
              <div
                className="col-md-12 col-lg-3 col-sm-12 col-12 "
                style={{
                  borderRight: "1px solid #bbbbbb",
                  paddingLeft: "15px",
                  borderBottomLeftRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                <div className="single-input-inner-home  ">
                  <input
                    type="text"
                    placeholder="Search by City"
                    // value={city}
                    // onChange={(e) => {
                    //   setCity(e.target.value);
                    // }}
                  />
                </div>
              </div>
              <div className="col-md-5 col-lg-2 col-sm-5 col-12">
                {/* <div className="single-select-inner">
                <Select
                  styles={customStyles}
                  options={priceValue}
                  onChange={handlePrice}
                  defaultValue={priceValue[0]}
                />
              </div> */}
                <div className="single-input-inner-home ">
                  <input
                    type="text"
                    // placeholder="Starting Price"
                    // value={startPrice}
                    // onChange={(e) => {
                    //   setStartPrice(e.target.value);
                    // }}
                    // style={{ borderRight: "1px solid #bbbbbb" }}
                  />
                </div>
              </div>
              <div
                className="col-md-5 col-lg-2 col-sm-5 col-12"
                style={{
                  borderRight: "1px solid #bbbbbb",
                }}
              >
                <div className="single-input-inner-home ">
                  <input
                    type="text"
                    placeholder="Ending Price"
                    // value={endPrice}
                    // onChange={(e) => {
                    //   setEndPrice(e.target.value);
                    // }}
                  />
                </div>
              </div>
              <div className="col-md-12 col-lg-2 col-sm-12 col-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  //   onClick={handleSubmit}
                  style={{
                    borderRadius: "30px",
                    alignItems: "center",
                    lineHeight: "5px",
                  }}
                  // to="/property-grid"
                >
                  <i className="fa fa-search mr-1" />
                  search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Filter;
