import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { me } from "../../helpers/auth";
import { useDispatch, useSelector } from "react-redux";
import { isMeAuth, logoutMe } from "../../reducers/authReducer";
import { searchFilter } from "../../reducers/filterReducer";

import NetworkError from "../../Hoc/NetworkError";
import "./nav.css";
import { LocalGasStation } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";

const NavbarV2 = () => {
  const location = useLocation();
  const { user, isAuth } = useSelector((state) => state.user);
  const history = useHistory();
  let publicUrl = process.env.PUBLIC_URL + "/";
  let imgattr = "logo";
  let anchor = "#";
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    setToken(localStorage.getItem("token"));

    handleMe();
  }, [token]);

  const Logout = () => {
    dispatch(logoutMe());
    window.location.reload(false);
    history.push("/");
  };
  const handleMe = () => {
    setLoading(true);
    try {
      me().then((data) => {
        if (data) {
          console.log("asdfasdfasdf", data);
          dispatch(isMeAuth({ data }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
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
  return (
    <div className="navbar-area navbar-area-3 ">
      <NetworkError />
      <nav className="navbar navbar-expand-lg">
        <div className="container nav-container">
          <div className="responsive-mobile-menu">
            <button
              className="menu toggle-btn d-block d-lg-none"
              data-target="#dkt_main_menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-left" />
              <span className="icon-right" />
            </button>
          </div>

          <div className="logo">
            {/* <Link to="/"><img src={publicUrl+"assets/img/logo.png"} alt="img" /></Link>*/}
            <Link to="/">
              <img
                src={publicUrl + "assets/img/mainImg.png"}
                alt=" image "
                // height={230}
                width={200}
              />
            </Link>
          </div>
          {/* <div className="nav-right-part nav-right-part-mobile">
            <Link className="btn btn-base" to="/add-property/Add/null">
              Submit <i className="fa fa-plus" />
            </Link>
          </div> */}
          <div className="collapse navbar-collapse" id="dkt_main_menu">
            <ul className="navbar-nav menu-open text-center">
              <li>
                <Link
                  className={`${
                    location.pathname == "/house-timing" ? "active" : ""
                  }`}
                  to="/house-timing"
                  style={{ fontSize: "13px" }}
                >
                  OPEN HOUSE
                </Link>
              </li>
              {/* <li>
                <Link
                  className={`${
                    location.pathname == "/properties/rent" ? "active" : ""
                  }`}
                  to="/properties/rent"
                  style={{ fontSize: "13px" }}
                >
                  RENT
                </Link>
              </li>

              <li>
                <Link
                  className={`${
                    location.pathname == "/properties/sale" ? "active" : ""
                  }`}
                  to="/properties/sale"
                  style={{ fontSize: "13px" }}
                >
                  SALE
                </Link>
              </li> */}
              <li>
                <Link
                  className={`${location.pathname == "/about" ? "active" : ""}`}
                  to="/about"
                  style={{ fontSize: "13px" }}
                >
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname == "/services" ? "active" : ""
                  }`}
                  to="/services"
                  style={{ fontSize: "13px" }}
                >
                  SERVICES
                </Link>
              </li>
              {token !== null ? (
                <li>
                  <Link
                    className={`${
                      location.pathname == "/chat" ? "active" : ""
                    }`}
                    to="/chat"
                    style={{ fontSize: "13px" }}
                  >
                    INBOX
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  className={`${location.pathname == "/faq" ? "active" : ""}`}
                  to="/faq"
                  style={{ fontSize: "13px" }}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  className={`${location.pathname == "/blog" ? "active" : ""}`}
                  to="/blog"
                  style={{ fontSize: "13px" }}
                >
                  BLOG
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname == "/contact" ? "active" : ""
                  }`}
                  to="/contact"
                  style={{ fontSize: "13px" }}
                >
                  CONTACT US
                </Link>
              </li>
              {token ? null : (
                <>
                  <li>
                    <Link
                      className={`${
                        location.pathname == "/sign-in" ? "active" : ""
                      }`}
                      to="/sign-in"
                      style={{ fontSize: "13px" }}
                    >
                      SIGNIN
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        location.pathname == "/sign-up" ? "active" : ""
                      }`}
                      to="/sign-up"
                      style={{ fontSize: "13px" }}
                    >
                      SIGNUP
                    </Link>
                  </li>
                </>
              )}
              {token && (
                <>
                  <li className="menu-item-has-children current-menu-item ">
                    <Link to="#">
                      <img
                        // className="rounded-circle "
                        htmlFor="imageUpload"
                        width="45px"
                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        style={{
                          height: "45px",
                          objectFit: "cover",
                          borderRadius: "50px",
                        }}
                      />
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link
                          to="#"
                          style={{
                            fontSize: "13px",
                            textTransform: "uppercase",
                          }}
                        >
                          {user.fname == null ? null : (
                            <b> Hi. {user?.fname}</b>
                          )}
                        </Link>
                      </li>
                      <li
                        className={`${
                          location.pathname == "/profile" ? "active" : ""
                        }`}
                      >
                        <Link
                          to="/profile"
                          style={{
                            fontSize: "13px",
                            textTransform: "uppercase",
                          }}
                        >
                          my Profile
                        </Link>
                      </li>
                      <li
                        className={`${
                          location.pathname == "/my/properties/sale"
                            ? "active"
                            : ""
                        }`}
                      >
                        <Link
                          to="/my/properties/sale"
                          style={{ fontSize: "13px" }}
                        >
                          SALE LIST
                        </Link>
                      </li>
                      <li
                        className={`${
                          location.pathname == "/my/properties/rent"
                            ? "active"
                            : ""
                        }`}
                      >
                        <Link
                          to="/my/properties/rent"
                          style={{ fontSize: "13px" }}
                        >
                          RENT LIST
                        </Link>
                      </li>{" "}
                      <li>
                        <Link
                          to="#"
                          style={{ fontSize: "13px" }}
                          onClick={Logout}
                        >
                          LOGOUT
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li>
                <div className="row">
                  <div
                    className="col-md-12 col-lg-12 col-sm-12 col-12 "
                    style={{
                      borderBottomLeftRadius: "5px",
                      borderTopLeftRadius: "5px",
                      textAlign: "center",
                      display: "flex",
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
                    <button
                      type="submit"
                      // className="btn btn-primary"
                      onClick={handleSubmit}
                      style={{
                        border: "none",
                        background: "#FFFFFF",
                        borderBottomRightRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    >
                      <i className="fa fa-search mr-1" />
                    </button>
                  </div>
                  {/* <div className="col-lg-2 col-2"> */}

                  {/* </div> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarV2;
