import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Footer_v2 = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";
  let imgattr = "Footer logo";
  useEffect(() => {
    const minscript = document.createElement("script");
    minscript.async = true;
    minscript.src = publicUrl + "assets/js/main.js";

    document.body.appendChild(minscript);
  }, []);

  return (
    <footer
      className="footer-area style-two  mg-top-100"
      // style={{ background: "url(" + publicUrl + "assets/img/other/1.png)" }}
    >
      {/*<div className="footer-top">
		    <div className="container">
		      <div className="row">
		        <div className="col-lg-6 col-md-4">
		          <a href="index.html"><img src={publicUrl+"assets/img/logo.png"} alt="img" /></a>
		        </div>
		        <div className="col-lg-6 col-md-8 text-md-right mt-3 mt-md-0">
		          <ul className="social-area">
		            <li><a href="https://www.facebook.com/solverwp/"><i className="fab fa-facebook-f" aria-hidden="true" /></a></li>
		            <li><a href="https://www.twitter.com/solverwp/"><i className="fab fa-twitter" aria-hidden="true" /></a></li>
		            <li><a href="https://www.instagram.com/solverwp/"><i className="fab fa-instagram" aria-hidden="true" /></a></li>
		            <li><a href="https://www.skype.com/solverwp/"><i className="fab fa-skype" aria-hidden="true" /></a></li>
		            <li><a href="https://www.pinterest.com/solverwp/"><i className="fab fa-pinterest-p" aria-hidden="true" /></a></li>
		          </ul>
		        </div>
		      </div>
		    </div>
		  </div>*/}
      {/* <div className="footer-middle mt-0"> */}
      <div className="blog-page-area p-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="widget widget_about ">
                <div className="mb-4">
                  <img
                    src={publicUrl + "assets/img/mainImg.png"}
                    alt=" image "
                  />
                </div>

                <div className="details">
                  <div className="top-margin _20-pixels">
                    <p className="small-white">
                      Hedgesandbricks is Real estate property consisting of land
                      and the buildings on it, easy to customize and easy to
                      create your property listings.
                    </p>
                  </div>
                  <div
                    className="top-margin _15-pixels mt-4"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      listStyle: "none",
                      justifyContent: "space-between",
                    }}
                  >
                    <li>
                      <a href="https://www.facebook.com/solverwp/">
                        <i className="fab fa-facebook-f" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.twitter.com/solverwp/">
                        <i className="fab fa-twitter" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/solverwp/">
                        <i className="fab fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    {/* <li>
											<a href="https://www.skype.com/solverwp/">
												<i className="fab fa-skype" aria-hidden="true" />
											</a>
										</li>
										<li>
											<a href="https://www.pinterest.com/solverwp/">
												<i className="fab fa-pinterest-p" aria-hidden="true" />
											</a>
										</li> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="widget widget_nav_menu">
                <ul>
                  <li>
                    <Link to="/about">
                      <b>MENU</b>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/services">Services</Link>
                  </li>
                  <li>
                    <Link to="/faq">Faq</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-2 col-md-6 col-6">
              <div className="widget widget_nav_menu">
                <ul>
                  <li>
                    <Link to="/blog">
                      <b>Social</b>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog">Facebook</Link>
                  </li>
                  <li>
                    <Link to="/blog">Twitter</Link>
                  </li>
                  <li>
                    <Link to="/blog">Instagram</Link>
                  </li>
                  <li>
                    <Link to="/blog">Linkedin</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="widget widget_nav_menu">
                <ul>
                  <li>
                    <Link to="/blog">
                      <b>Contact</b>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog">Evergreen</Link>
                  </li>
                  <li>
                    <Link to="/blog">San Franciscoo, Cal</Link>
                  </li>
                  <li>
                    <Link to="/blog">800 123-456</Link>
                  </li>
                  <li>
                    <Link to="/blog">Hi@website.com</Link>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/*<div className="footer-bottom">
		    <div className="container">
		      <div className="row">
		        <div className="col-lg-6 align-self-center">
		          <p>©2021, Copy Right By Solverwp. All Rights Reserved</p>
		        </div>
		        <div className="col-lg-6 text-lg-right">
		          <ul>
		            <li>
		              <Link to="/">Home</Link>
		            </li>
		            <li>
		              <Link to="/about">About</Link>
		            </li>
		            <li>
		              <Link to="/blog">Blog</Link>
		            </li>
		            <li>
		              <Link to="/contact">Contact</Link>
		            </li>
		          </ul>
		        </div>
		      </div>
		    </div>
		</div>*/}
    </footer>
  );
};

export default Footer_v2;
