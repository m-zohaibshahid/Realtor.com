import React from "react";

const Services = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";
  return (
    <div className="contact-page-area pd-top-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-6">
            <h2 style={{ textAlign: "center" }}>Services</h2>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-product-wrap style-2">
              <div className="card">
                <img
                  className="card-img-top"
                  src={publicUrl + "assets/img/blog/1.png"}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Property Search</h5>
                  <hr />
                  <h6 className="card-text" style={{ fontSize: "14px" }}>
                    Proin feugiat justo vitae euismod fringilla nunc commodo,
                    elementum metus.
                  </h6>
                  {/* <a href="#" className="btn btn-primary">
          Go somewhere
        </a> */}
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="col-lg-4 col-md-6">
            <div className="single-product-wrap style-2">
              <div className="card">
                <img
                  className="card-img-top"
                  src={publicUrl + "assets/img/blog/1.png"}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Property Search</h5>
                  <hr />
                  <h6 className="card-text" style={{ fontSize: "14px" }}>
                    Proin feugiat justo vitae euismod fringilla nunc commodo,
                    elementum metus.
                  </h6>
                  {/* <a href="#" className="btn btn-primary">
          Go somewhere
        </a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-product-wrap style-2">
              <div className="card">
                <img
                  className="card-img-top"
                  src={publicUrl + "assets/img/blog/1.png"}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Property Search</h5>
                  <hr />
                  <h6 className="card-text" style={{ fontSize: "14px" }}>
                    Proin feugiat justo vitae euismod fringilla nunc commodo,
                    elementum metus.
                  </h6>
                  {/* <a href="#" className="btn btn-primary">
          Go somewhere
        </a> */}
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
export default Services;
