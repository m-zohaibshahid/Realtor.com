import React from "react";
import "./Filter.css";
import Badge from "react-bootstrap/Badge";
import { baseUrl } from "../../config/baseUrl";

const SearchProperty = ({ search }) => {
  console.log("serach agadfasdfasdf;aj", search);
  return (
    <>
      {/* ----------------------------------------------------------------------- */}

      <div
        class="col-lg-4 col-md-4 col-sm-6"
        // style="background-color:red; border:1px solid black;"
      >
        <div className="card mb-4" style={{ width: "18rem" }}>
          <div
            style={{
              position: "absolute",
              width: "100%",
              display: "flex",
              margin: "6px",
              color: "white",
            }}
          >
            <div className="badge__status">
              <span
                className={
                  search?.buildingType === "Sale"
                    ? "listing__type__sale"
                    : "listing__type__rent"
                }
              >
                For {search?.buildingType}
              </span>
            </div>
            {search?.propertyStatus === "pending" ? (
              <Badge bg="warning">{search?.propertyStatus}</Badge>
            ) : search?.propertyStatus === "disapproved" ? (
              <Badge bg="danger">{search?.propertyStatus}</Badge>
            ) : (
              <Badge bg="success">{search?.propertyStatus}</Badge>
            )}
          </div>
          <img
            className="card-img-top"
            src={`${baseUrl}/${search?.images?.[0]?.path}`}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{search?.houseType}</h5>
            <div className="d-flex">
              <div className="d-flex mr-2">
                <div className="right-margin mr-2">
                  <img src="/assets/images/cama.svg" width="22" alt="" />
                </div>
                <div className="lisiting-text mr-2">{search?.bedrooms}</div>
                <div className="lisiting-text">Bedrooms</div>
              </div>
              <div className="d-flex">
                <div className="right-margin mr-2">
                  <img src="/assets/images/ducha.svg" width="18" alt="" />
                </div>
                <div className="lisiting-text mr-2">{search?.bathrooms}</div>
                <div className="lisiting-text">Bathrooms</div>
              </div>
            </div>
            {/* <p className="card-text">{property?.des}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProperty;
