import React, { Component } from "react";
// import parse from 'html-react-parser';
import Filter from "../SearchFiter/Filter";

class Banner extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";

    return (
      <div
        className="banner-area banner-area-1 banner-area-bg"
        style={{
          background: "url(" + publicUrl + "assets/img/banner/home.png)",
        }}
      >
        <div className="container">
          <div className="banner-area-inner">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="banner-inner text-center">
                  {/* <p>
                    Lorem ipsum dolor sit amet, consecteLorem ipsum dolor sit
                    amet,
                  </p>
                  <div className="line" /> */}
                  <h2>The Best Way To Find Your Perfect Home</h2>
                </div>
              </div>
              <div className="col-lg-12 mt-4">
                {/* search filter component */}
                <Filter />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
