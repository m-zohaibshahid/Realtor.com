import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchFilter } from "../../reducers/filterReducer";

const Filter = () => {
  const { loading, error, result } = useSelector((state) => state.filter);
  const [priceOfProperty, setPriceOfProperty] = useState("");
  const [city, setCity] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var array = priceOfProperty.split(" ");
    const startPrice = array[0];
    const endPrice = array[2];

    var formData = new FormData();
    formData.append("city", city);
    formData.append("startPrice", startPrice);
    formData.append("endPrice", endPrice);
    formData.append("buildingType", buildingType);
    if (formData) {
      dispatch(searchFilter({ startPrice, endPrice, city, buildingType }));
      history.push("/search/filter");
    }
  };
  return (
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-11 col-md-12">
        <div class="full_search_box nexio_search lightanic_search hero_search-radius modern">
          <div class="search_hero_wrapping" data-select2-id="8">
            <div class="row">
              {/* <form> */}
              <div class="col-lg-4 col-md-3 col-sm-12">
                <div class="form-group">
                  <label>City</label>
                  <div class="input-with-icon">
                    <select
                      id="location"
                      class="form-control select2-hidden-accessible"
                      data-select2-id="location"
                      tabindex="-1"
                      aria-hidden="true"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    >
                      {/* <option value="" data-select2-id="2">
                        &nbsp;
                      </option> */}
                      <option value="">Select City</option>
                      <option value="Alberta">Alberta</option>
                      <option value="British Columbia">British Columbia</option>
                      <option value="Manitoba">Manitoba</option>
                      <option value="New Brunswick">New Brunswick</option>
                      <option value="Newfoundland and Labrador">
                        Newfoundland and Labrador
                      </option>
                      <option value="Nova Scotia">Nova Scotia</option>
                      <option value="Northwest Territories">
                        Northwest Territories
                      </option>
                      <option value="Nunavut">Nunavut</option>
                      <option value="Ontario">Ontario</option>
                      <option value="Prince Edward Island">
                        Prince Edward Island
                      </option>
                      <option value="Quebec">Quebec</option>
                      <option value="Saskatchewan">Saskatchewan</option>
                      <option value="Yukon">Yukon</option>
                    </select>
                    <span
                      class="select2 select2-container select2-container--default"
                      dir="ltr"
                      data-select2-id="5"
                      style={{ width: "288.984px" }}
                    >
                      <span class="selection">
                        <span
                          class="select2-selection select2-selection--single"
                          role="combobox"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabindex="0"
                          aria-labelledby="select2-location-container"
                        >
                          {/* <span
                            class="select2-selection__rendered"
                            id="select2-location-container"
                            role="textbox"
                            aria-readonly="true"
                          >
                            <span class="select2-selection__placeholder">
                              Location
                            </span>
                          </span> */}
                          <span
                            class="select2-selection__arrow"
                            role="presentation"
                          >
                            <b role="presentation"></b>
                          </span>
                        </span>
                      </span>
                      <span class="dropdown-wrapper" aria-hidden="true"></span>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-3 col-sm-12">
                <div class="form-group">
                  <label>Property Type</label>
                  <div class="input-with-icon">
                    <select
                      id="ptypes"
                      class="form-control select2-hidden-accessible"
                      data-select2-id="ptypes"
                      tabindex="-1"
                      aria-hidden="true"
                      onChange={(e) => {
                        setBuildingType(e.target.value);
                      }}
                    >
                      {/* <option value="" data-select2-id="2">
                        &nbsp;
                      </option> */}
                      <option value="1" data-select2-id="10">
                        Select Property Type
                      </option>
                      <option value="Sale" data-select2-id="11">
                        Sale
                      </option>
                      <option value="Rent" data-select2-id="12">
                        Rent
                      </option>
                    </select>
                    <span
                      class="select2 select2-container select2-container--default select2-container--below"
                      dir="ltr"
                      data-select2-id="1"
                      style={{ width: "209px" }}
                    >
                      <span class="selection">
                        <span
                          class="select2-selection select2-selection--single"
                          role="combobox"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabindex="0"
                          aria-labelledby="select2-ptypes-container"
                        >
                          {/* <span
                            class="select2-selection__rendered"
                            id="select2-ptypes-container"
                            role="textbox"
                            aria-readonly="true"
                          >
                            <span class="select2-selection__placeholder">
                              Property Types
                            </span>
                          </span> */}
                          <span
                            class="select2-selection__arrow"
                            role="presentation"
                          >
                            <b role="presentation"></b>
                          </span>
                        </span>
                      </span>
                      <span class="dropdown-wrapper" aria-hidden="true"></span>
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-4 col-sm-12">
                <div class="form-group none">
                  <label>Price Range</label>
                  <div class="input-with-icon">
                    <select
                      id="price"
                      class="form-control select2-hidden-accessible"
                      data-select2-id="price"
                      tabindex="-1"
                      aria-hidden="true"
                      onChange={(e) => {
                        setPriceOfProperty(e.target.value);
                      }}
                    >
                      <option value="" data-select2-id="4">
                        Choose Price
                      </option>
                      <option value="40000 - 1000000">
                        From 40,000 To 10m
                      </option>
                      <option value="60000 - 2000000">
                        From 60,000 To 20m
                      </option>
                      <option value="70000 - 3000000">
                        From 70,000 To 30m
                      </option>
                      <option value="80000 - 4000000">
                        From 80,000 To 40m
                      </option>
                      <option value="90000 - 5000000">
                        From 90,000 To 50m
                      </option>
                    </select>

                    <span
                      class="select2 select2-container select2-container--default"
                      dir="ltr"
                      data-select2-id="3"
                      style={{ width: "289.984px" }}
                    >
                      <span class="selection">
                        <span
                          class="select2-selection select2-selection--single"
                          role="combobox"
                          aria-haspopup="true"
                          aria-expanded="false"
                          tabindex="0"
                          aria-labelledby="select2-price-container"
                        >
                          {/* <span
                            class="select2-selection__rendered"
                            id="select2-price-container"
                            role="textbox"
                            aria-readonly="true"
                          >
                            <span class="select2-selection__placeholder">
                              Price Range
                            </span>
                          </span> */}
                          {/* <span
                            class="select2-selection__arrow"
                            role="presentation"
                          >
                            <b role="presentation"></b>
                          </span> */}
                        </span>
                      </span>
                      <span class="dropdown-wrapper" aria-hidden="true"></span>
                    </span>
                  </div>
                </div>
              </div>
              {/* -----------------Bedroom and Bathroom dropdown--------------------- */}
              {/* <div class="col-lg-2 col-md-3 col-sm-12">
                <div class="form-group none">
                  <label>Select Others</label>
                  <div class="dropdown">
                    <button class="dropbtn">Search Others</button>
                    <div class="dropdown-content" style={{ padding: "10px" }}>
                      <input
                        type="number"
                        className="input email w-input"
                        placeholder="no of bedrooms"
                        style={{ width: "100%", border: "1px solid #2f2f2f" }}
                      />
                      <a href="#">Link 2</a>
                      <a href="#">Link 3</a>
                    </div>
                  </div>
                </div>
              </div> */}

              <div class="col-lg-1 col-md-2 col-sm-12 small-padd">
                <div class="form-group none">
                  <a
                    href="#"
                    class="btn search-btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {/* <i class="fa fa-search"></i> */}
                    Submit
                  </a>
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
