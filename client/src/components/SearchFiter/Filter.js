import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchFilters } from "../../reducers/filterReducer";
import Select from "react-select";
import "./filter.css";
import { baseUrl } from "../../config/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Filter = () => {
  const [priceOfProperty, setPriceOfProperty] = useState("");
  const [city, setCity] = useState("");
  const [houseType, setHouseType] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const forHouseType = [
    { value: "Bungalow", label: "Bungalow" },
    { value: "Town House", label: "Town House" },
    { value: "Apartment", label: "Apartment" },
    { value: "Semi-Detach", label: "Semi-Detach" },
    { value: "Single Family", label: "Single Family" },
  ];
  const cityValue = [
    { value: "", label: "Search by city" },
    { value: "Alberta", label: "Alberta" },
    { value: "British Columbia", label: "British Columbia" },
    { value: "Manitoba", label: "Manitoba" },
    { value: "New Brunswick", label: "New Brunswick" },
    { value: "Newfoundland and Labrador", label: "Newfoundland and Labrador" },
    { value: "Nova Scotia", label: "Nova Scotia" },
    { value: "Northwest Territories", label: "Northwest Territories" },
    { value: "Nunavut", label: "Nunavut" },
    { value: "Ontario", label: "Ontario" },
    { value: "Prince Edward Island", label: "Prince Edward Island" },
    { value: "Quebec", label: "Quebec" },
    { value: "Saskatchewan", label: "Saskatchewan" },
    { value: "Yukon", label: "Yukon" },
  ];
  const priceValue = [
    { value: "", label: "Search by price" },
    { value: "40000 - 1000000", label: "From 40,000 To 10m" },
    { value: "60000 - 2000000", label: "From 60,000 To 20m" },
    { value: "70000 - 3000000", label: "From 70,000 To 30m" },
    { value: "80000 - 4000000", label: "From 80,000 To 40m" },
    { value: "90000 - 5000000", label: "From 90,000 To 50m" },
    { value: "Nova Scotia", label: "Nova Scotia" },
    { value: "Northwest Territories", label: "Northwest Territories" },
    { value: "Nunavut", label: "Nunavut" },
    { value: "Ontario", label: "Ontario" },
    { value: "Prince Edward Island", label: "Prince Edward Island" },
    { value: "Quebec", label: "Quebec" },
    { value: "Saskatchewan", label: "Saskatchewan" },
    { value: "Yukon", label: "Yukon" },
  ];

  const buildingTypeValue = [
    { value: "", label: "Search by type" },
    { value: "Rent", label: "Rent" },
    { value: "Sale", label: "Sale" },
  ];

  const handleCity = (e) => {
    console.log("city value", e.value);
    setCity(e.value);
  };

  const handleBuildingType = (e) => {
    console.log("building value", e.value);
    setBuildingType(e.value);
  };

  const handlePrice = (e) => {
    console.log("price value", e.value);
    setPriceOfProperty(e.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("submit main city", city);
    // var array = priceOfProperty.split(" ");
    // const startPrice = array[0];
    // const endPrice = array[2];

    // if (!startPrice || !endPrice || !city) {
    //   toast.error("All fields are required!");
    // } else {
    let body = {
      city,
      startPrice,
      endPrice,
      houseType,
    };

    console.log("search formdata", body);
    if (body) {
      dispatch(searchFilters({ startPrice, endPrice, city, houseType }));
      history.push("/search/filter");
    }
    // }
  };
  const HandleHouseType = (e) => {
    setHouseType(e.value);
  };
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
      {/* <div
				className="single-property-grid"
				style={{ borderRadius: " 100px", height: "40px", padding: "13px" }}
			> */}
      <div className="search-bar mt-5 p-3 p-lg-1 ps-lg-4">
        <form action="#">
          <div
            className="row "
            // style={{ paddingTop: "3px", paddingBottom: "3px" }}
          >
            <div
              className="col-md-12 col-lg-3 col-sm-12 col-12"
              style={{
                borderRight: "1px solid #bbbbbb",
                paddingLeft: "15px",
                borderBottomLeftRadius: "10px",
                borderTopLeftRadius: "10px",
              }}
            >
              {/* <div className="single-select-inner">
                <Select
                  styles={customStyles}
                  options={cityValue}
                  onChange={handleCity}
                  defaultValue={cityValue[0]}
                />
              </div> */}
              <div className="single-input-inner-home search-responsive">
                <input
                  type="text"
                  placeholder="Search by City/Community"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
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
              <div className="single-input-inner-home search-responsive ">
                <input
                  type="text"
                  placeholder="Starting Price"
                  value={startPrice}
                  onChange={(e) => {
                    setStartPrice(e.target.value);
                  }}
                  // style={{ borderRight: "1px solid #bbbbbb" }}
                />
              </div>
            </div>

            {/* <div
              className="col-md-2 col-lg-1 col-sm-2 col-2"
              style={{ lineHeight: "50px", color: "#BBBBBB" }}
            >
              {" "}
              To
            </div> */}
            <div
              className="col-md-5 col-lg-2 col-sm-5 col-12"
              style={{
                borderRight: "1px solid #bbbbbb",
              }}
            >
              <div className="single-input-inner-home search-responsive">
                <input
                  type="text"
                  placeholder="Ending Price"
                  value={endPrice}
                  onChange={(e) => {
                    setEndPrice(e.target.value);
                  }}
                />
              </div>
            </div>
            <div
              className="col-md-12 col-lg-3 col-sm-12 col-12"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="single-input-inner-inner search-responsive ">
                <Select
                  styles={customStyles}
                  options={forHouseType}
                  onChange={HandleHouseType}
                  // defaultValue={buildingTypeValue[0]}
                />
              </div>
            </div>
            <div
              className="col-md-12 col-lg-2 col-sm-12 col-12 streching"
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
            {/*  <div className="col-lg-4 d-flex align-items-center form-group">
              <input
                className="form-control border-0 shadow-0"
                type="text"
                name="search"
                placeholder="What are you searching for?"
              />
            </div>
            <div className="col-lg-3 d-flex align-items-center form-group">
              <div className="input-label-absolute input-label-absolute-right w-100">
                <label className="label-absolute" for="location">
                  <i className="fa fa-crosshairs"></i>
                </label>
                <input
                  className="form-control border-0 shadow-0"
                  type="text"
                  name="location"
                  placeholder="Location"
                  id="location"
                />
              </div>
            </div>
            <div className="col-lg-3 d-flex align-items-center form-group no-divider">
              <div className="dropdown bootstrap-select">
                <select
                  className="selectpicker"
                  title="Categories"
                  data-style="btn-form-control"
                  tabindex="null"
                >
                  <option className="bs-title-option" value=""></option>
                  <option value="small">Restaurants</option>
                  <option value="medium">Hotels</option>
                  <option value="large">Cafes</option>
                  <option value="x-large">Garages</option>
                </select>
                <button
                  type="button"
                  tabindex="-1"
                  className="btn dropdown-toggle bs-placeholder btn-form-control"
                  data-bs-toggle="dropdown"
                  role="combobox"
                  aria-owns="bs-select-1"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  title="Categories"
                >
                  <div className="filter-option">
                    <div className="filter-option-inner">
                      <div className="filter-option-inner-inner">
                        Categories
                      </div>
                    </div>{" "}
                  </div>
                </button>
                <div
                  className="dropdown-menu "
                  style={{
                    maxheight: "159.6px",
                    overflow: "hiodden",
                    minHeight: "154px",
                  }}
                >
                  <div
                    className="inner show"
                    role="listbox"
                    id="bs-select-1"
                    tabindex="-1"
                    style={{
                      maxheight: "143.6",
                      overflowY: "auto",
                      minHeight: "138px",
                    }}
                  >
                    <ul
                      className="dropdown-menu inner show"
                      role="presentation"
                      style={{
                        marginTop: "0px",
                        marginBottom: "0px",
                      }}
                    ></ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 d-grid">
              <button className="btn btn-primary rounded-pill" type="submit">
                Search{" "}
              </button>
            </div>*/}
          </div>
        </form>
      </div>
      {/* <div className="row custom-gutters-10">
				<div className="col-md-3" style={{ backgroundColor: "transparent" }}>
					<div className="single-select-inner">
						<Select
							options={cityValue}
							onChange={handleCity}
							defaultValue={cityValue[0]}
						/>
					</div>
				</div>
				<div className="col-md-3" style={{ backgroundColor: "transparent" }}>
					<div className="single-select-inner">
						<Select
							options={buildingTypeValue}
							onChange={handleBuildingType}
							defaultValue={buildingTypeValue[0]}
						/>
					</div>
				</div>
				<div className="col-md-3" style={{ backgroundColor: "transparent" }}>
					<div className="single-select-inner">
						<Select
							options={priceValue}
							onChange={handlePrice}
							defaultValue={priceValue[0]}
						/>
					</div>
				</div>
				<div className="col-md-3">
					<button
						type="submit"
						className="btn btn-base w-100"
						onClick={handleSubmit}
						style={{
							height: "44px",
							alignItems: "center",
							lineHeight: "10px",
						}}
						// to="/property-grid"
					>
						<i className="fa fa-search mr-1" /> Search
					</button>
				</div>
			</div> */}{" "}
    </div>
  );
};

export default Filter;
