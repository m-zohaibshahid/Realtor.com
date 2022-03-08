import React, { useState } from "react";
import "./Login.css";
import { FORGOT_PASSWORD } from "../../../reducers/forgotPasswordReducer";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../../../helpers/forgotPassword";
import { useHistory } from "react-router-dom";

const SendEmail = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { error, message } = useSelector((state) => state.forgotPassword);
  const [email, setEmail] = useState();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(false);
    setLoading(true);

    try {
      sendEmail({ email }).then((data) => {
        if (data?.error) {
          setErrorMsg(data?.error);
          setLoading(false);
        } else {
          setLoading(false);
        }
        console.log("data", data);
      });
    } catch (error) {
      console.log("login page catch error", error);
    }

    // console.log("this is message", message);
    // if (email) {
    //   dispatch(FORGOT_PASSWORD({ email }));
    //   console.log("Error", error);
    //   if (error) {
    //     console.log(error);
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //   }
    // } else {
    //   setErrorMsg(true);
    //   setLoading(false);
    // }
  };
  return (
    <div className="signin-page-area pd-top-100 ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <form className="signin-inner">
              <div className="row">
                <div className="col-12 mb-2">
                  <h3 align="">Forgot Your password?</h3>
                </div>
                <div className="col-12">
                  <p className="" align="">
                    You'll get an email with a reset link
                  </p>
                </div>
                {errorMsg && (
                  <div className="col-12">
                    <p className="error" align="">
                      {errorMsg}
                    </p>
                  </div>
                )}

                <div className="col-12">
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      placeholder="your-email@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-base w-100"
                    onClick={(e) => handleSubmit(e)}
                    disabled={loading ? "true" : null}
                  >
                    {loading ? (
                      <i
                        className="fa fa-spinner fa-spin"
                        style={{ fontSize: "15px", marginRight: "5px" }}
                      ></i>
                    ) : (
                      "Request Reset"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
