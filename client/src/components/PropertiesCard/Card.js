import React from "react";

import { Link } from "react-router-dom";
const Card = (props) => {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const { property } = props;
  console.log("properties......data", property);
  return (
    <div className="row">
      <div className="col-lg-4 col-md-6">
        <div className="single-product-wrap style-bottom">
          <div className="thumb">
            <img src={publicUrl + "assets/img/project/2.png"} alt="img" />
            <div className="product-wrap-details">
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
            </div>
          </div>
          <div className="product-details-inner">
            <h4>
              <Link to="/property-details">{property.houseType}</Link>
            </h4>
            <ul className="meta-inner">
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
            </ul>
            <p>{property.des}</p>
          </div>
          <div className="product-meta-bottom">
            <span className="price">$ {property.priceOfProperty}</span>
            <span>For {property.buildingType}</span>
            <span>1 year ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
