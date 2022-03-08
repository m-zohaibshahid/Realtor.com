import React, { useEffect, useState } from "react";
import "./Login.css";
import {
  RESET_PASSWORD,
  UPDATE_PASSWORD,
} from "../../../reducers/forgotPasswordReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  console.log("tokkkennn reset page", token);
  const { loading, error, message, updated } = useSelector(
    (state) => state.forgotPassword
  );
  const [password, setPassword] = useState();
  useEffect(() => {
    dispatch(RESET_PASSWORD({ token }));
  }, [token]);

  const updatePassword = (e) => {
    e.preventDefault();
    dispatch(UPDATE_PASSWORD({ password, token }));
  };
  if (error) {
    return (
        <div className="signin-page-area pd-top-100 ">
			  <div className="container">
			    <div className="row justify-content-center">
			      <div className="col-xl-6 col-lg-7">
			        <form className="signin-inner" >
			          <div className="row">
          <p className="sign" align="center">
            Password Reset?
          </p>
          <h5
            style={{
              color: "#cf352e",
              width: "13em",
              margin: "auto",
              textAlign: "center",
            }}
          >
            Problem resetting password. Please send another reset link.
          </h5>
          <Link to="/">
            <button
              className="submit"
              align="center"
              style={{
                marginLeft: "10em",
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              Go Home
            </button>
          </Link>
          <p className="forgot" align="center">
            <Link to="/reset/forgotPassword/1/step">
              <p>Forgot Password?</p>
            </Link>
          </p>
        </div>
      </form>
    </div>
</div>
</div>
</div>
    );
  } else if (loading) {
    return <div>Loading user data...</div>;
  } else if (updated === "password updated") {
    return (
      <div className="login">
        <div className="main" style={{ height: "275px" }}>
          <p className="sign" align="center">
            Password Reset?
          </p>
          <p
            class="forgot"
            style={{
              color: "#228B22",
              width: "17em",
              margin: "auto",
              textAlign: "center",
            }}
          >
            Your password has been successfully reset, please try loggin in
            again.
          </p>
          <Link to="/login">
            <button
              className="submit"
              align="center"
              style={{
                marginLeft: "10.5em",
                marginTop: "25px",
                textAlign: "center",
              }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="login">
        <div className="main" style={{ height: "320px" }}>
          <p className="sign" align="center">
            Password Reset?
          </p>
          {error && (
            <h6 align="center" style={{ color: "red" }}>
              {error}
            </h6>
          )}
          <form className="form1">
            <input
              className="pass"
              type="password"
              align="center"
              placeholder="update password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="submit"
              align="center"
              onClick={(e) => updatePassword(e)}
              style={{
                marginLeft: "3.7em",
                textAlign: "center",
                width: "302px",
              }}
            >
              {loading && (
                <i
                  className="fa fa-spinner fa-spin"
                  style={{
                    fontSize: "15px",
                  }}
                ></i>
              )}
              Update Password
            </button>
          </form>
          <Link to="/login">
            <p
              className="forgot"
              align="center"
              style={{
                marginLeft: "3em",
                textAlign: "center",
                width: "302px",
              }}
            >
              Go Home
            </p>
          </Link>
        </div>
      </div>
    );
  }
};

export default ResetPassword;
