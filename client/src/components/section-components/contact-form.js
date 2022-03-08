import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../config/baseUrl";
import { useSelector } from "react-redux";
import axios from "axios";
toast.configure();
const ContactForm = () => {
  const { user } = useSelector((state) => state.user);
  console.log("user..........", user);
  // useEffect(() => {
  //   var zul = user?.fname + " " + user?.lname;
  //   setName(zul);
  //   setEmail(user?.email);
  // }, [user]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const body = { email, name, phone, company, message };
    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setIsLoading(false);
      console.log("responosd", res);

      if (res?.status === 200) {
        toast.success(` message sent successfully`, {
          autoClose: 2000,
        });

        resetAllStates();
        setIsLoading(false);
      } else {
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong", error, {
        autoClose: 2000,
      });
      setIsLoading(false);
    }
  };
  const resetAllStates = () => {
    setName("");
    setEmail("");
    setPhone();
    setCompany("");
    setMessage("");
  };
  // if (isLoading) {
  //   return (
  //     <div className="property-page-area pd-top-120 pd-bottom-90 ">
  //       <div className="container ">
  //         <div className="row justify-content-center">
  //           <div className="col-md-12 col-12 text-center">
  //             {" "}
  //             <i
  //               className="fa fa-spinner fa-spin"
  //               style={{
  //                 fontSize: "15px",
  //                 marginRight: "5px",
  //                 color: "black",
  //               }}
  //             ></i>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="contact-page-area pd-top-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 mb-5 mb-lg-0">
            <div className="contact-details-inner mng-box-shadow">
              <h4>Adipisicing elit se tempor labore .</h4>
              <p>
                Lorem ipsum dolor consectetur aLorem ipsum consectetur
                adipisicing elit, eiusmod tempor incididunt labore et dolore
                magna aliqua.minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo
              </p>
              <div className="row">
                <div className="col-md-6">
                  <div className="contact-single-list">
                    <h5>PAK Office</h5>
                    <ul>
                      <li>
                        <i class="fas fa-map-marker-alt"></i>
                        420 Love Sreet 133/2 Mirpur Nevis, Caribbean Dhaka
                      </li>
                      <li>
                        <i class="fas fa-map-marker-alt"></i>
                        +(92) 190 50 80 628
                      </li>
                      <li>
                        <i class="fas fa-map-marker-alt"></i>
                        +(92) 300 50 80 628
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-single-list">
                    <h5>PAK Office</h5>
                    <ul>
                      <li>
                        <i class="fas fa-map-marker-alt"></i>
                        +(92) 300 50 80 628
                      </li>
                      <li>
                        <i class="fas fa-map-marker-alt"></i>
                        {/* <img
                            src={publicUrl + "assets/img/icon/location2.png"}
                            alt="img"
                          />{" "} */}
                        +(92) 300 50 80 628
                      </li>
                      <li>
                        {/* <img
                            src={publicUrl + "assets/img/icon/location2.png"}
                            alt="img"
                          />{" "} */}
                        <i class="fas fa-map-marker-alt"></i>
                        +(92) 300 50 80 628
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="contact-single-date">
                    <p>
                      <strong>Monday-Friday:</strong> 9am - 8pm
                    </p>
                    <p>
                      <strong>Saturday:</strong> 10 am to 3 pm
                    </p>
                    <p>
                      <strong>Sunday: </strong> Clossed
                    </p>
                  </div>
                </div>

                <div className="col-md-6 align-self-center text-md-right hover-area">
                  <ul className="social-area style-3">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f " aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-skype" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-5">
            <form>
              <div className="row">
                <div className="col-xl-6 col-md-6">
                  {/* <div className="single-select-inner style-bg-border">
                      <select>
                        <option value={1}>General Information</option>
                        <option value={2}>General Information</option>
                        <option value={3}>General Information</option>
                      </select>
                    </div> */}
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-lg-6 col-md-6">
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="number"
                      placeholder="Mobile"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-12">
                  <label className="single-input-inner style-bg-border">
                    <textarea
                      placeholder="Your Message"
                      // defaultValue={""}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-12 mb-4">
                  <button
                    className="btn btn-base btn-elevate"
                    disabled={isLoading ? "true" : null}
                    onClick={submit}
                  >
                    {isLoading ? (
                      <i
                        className="fa fa-spinner fa-spin"
                        style={{ fontSize: "15px", marginRight: "5px" }}
                      ></i>
                    ) : (
                      "Submit now"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="contact-page-map mg-top-100">
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d198059.49240377638!2d-84.68048827338674!3d39.13652252762691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1615660592820!5m2!1sen!2sbd" /> */}
      </div>
    </div>
  );
};

export default ContactForm;
