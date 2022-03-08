import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchFilter } from "../../../reducers/filterReducer";
import Select from "react-select";
import "../filter.css";
import { baseUrl } from "../../../config/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Filter = () => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  //   const forHouseType = [
  //     { value: "Bungalow", label: "Bungalow" },
  //     { value: "Town House", label: "Town House" },
  //     { value: "Apartment", label: "Apartment" },
  //     { value: "Semi-Detach", label: "Semi-Detach" },
  //     { value: "Single Family", label: "Single Family" },
  //   ];

  const handleSubmit = async (e) => {
    if (address == "") {
      history.push("/");
    } else {
      e.preventDefault();
      const body = {
        address,
      };
      console.log("search formdata", body);

      dispatch(searchFilter(body));
      history.push("/search/filter");
    }
  };
  //   const HandleHouseType = (e) => {
  //     setHouseType(e.value);
  //   };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      // width: 400,
      padding: 20,
      backgroundColor: "#FBFBFB",

      // background: blue,
    }),
    control: (base, state, provided) => ({
      ...base,
      ...provided,

      border: state.isFocused ? 0 : 0,
      backgroundColor: "transparent",
      height: 45,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? 0 : 0,
        // height: 50,
      },
    }),
  };
  return (
    <div>
      <div className="search-bar mt-5 p-3 p-lg-1 ps-lg-4">
        <form action="#">
          <div className="row ">
            <div
              className="col-md-12 col-lg-10 col-sm-12 col-12 "
              style={{
                borderRight: "1px solid #bbbbbb",
                paddingLeft: "15px",
                borderBottomLeftRadius: "10px",
                borderTopLeftRadius: "10px",
                textAlign: "center",
              }}
            >
              <div className="single-input-inner-home ">
                <input
                  type="text"
                  placeholder="Search by Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* <div className="col-md-5 col-lg-2 col-sm-5 col-12">
              <div className="single-input-inner-home ">
                <input
                  type="text"
                  placeholder="Starting Price"
                  value={startPrice}
                  onChange={(e) => {
                    setStartPrice(e.target.value);
                  }}
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
                  value={endPrice}
                  onChange={(e) => {
                    setEndPrice(e.target.value);
                  }}
                />
              </div>
            </div> */}
            {/* <div
              className="col-md-12 col-lg-3 col-sm-12 col-12  "
              style={{ backgroundColor: "transparent" }}
            >
              <div className="single-input-inner-inner ">
                <Select
                  styles={customStyles}
                  options={forHouseType}
                  onChange={HandleHouseType}
                  // defaultValue={buildingTypeValue[0]}
                />
              </div>
            </div> */}
            <div
              className="col-md-12 col-lg-2 col-sm-12 col-12"
              style={{ paddingLeft: "19px" }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
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
  );
};

export default Filter;
