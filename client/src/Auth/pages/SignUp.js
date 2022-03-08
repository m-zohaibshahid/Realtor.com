import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  registerPending,
  registerFail,
  registerSuccess,
} from "../../reducers/authReducer";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../config/baseUrl";
import "./Sign-in.css";
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import parse from 'html-react-parser';
toast.configure();

const SignUp = () => {
  const invalid = {
    border: "1px solid red !important",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const authenticate = async (e) => {
    // e.preventDefault();
    dispatch(registerPending());

    const body = {
      lname,
      fname,
      email,
      password,
    };
    console.log("My data", body);
    try {
      const res = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("i am the super", res);
      const result = await res.json();
      console.log("register page wala result", result);
      if (result.error) {
        const error = result.error;
        dispatch(registerFail({ error }));
        toast.error(error, {
          autoClose: 3000,
        });
      } else if (result.message) {
        const success = result.message;
        dispatch(registerSuccess({ success }));
        toast.success("Registered Successfully! redirecting to login...", {
          autoClose: 3000,
        });

        setTimeout(() => {
          history.push("/sign-in");
        }, 3000);
      }
    } catch (error) {
      dispatch(registerFail({ error }));
      toast.error(error, {
        autoClose: 3000,
      });
    }
  };
  const onSubmit = () => {
    authenticate();
  };

  let publicUrl = process.env.PUBLIC_URL + "/";

  useEffect(() => {
    const $ = window.$;

    $("body").addClass("bg-gray");
  }, []);

  return (
    <div className="signup-page-area pd-top-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            {/* <form
              className="signin-inner "
              authenticate={handleSubmit(authenticate)}
            > */}
            <form className="signin-inner" onSubmit={handleSubmit(onSubmit)}>
              <h3 align="center">SignUp</h3>
              <div className="row mt-4">
                <div className="col-12">
                  <label className="single-input-inner style-bg-border">
                    <input
                      type="text"
                      className={`form-control ${errors.name && { invalid }}`}
                      {...register("name", { required: "Name is Required" })}
                      onKeyUp={() => {
                        trigger("name");
                      }}
                      placeholder="First Name"
                      onChange={(e) => setFname(e.target.value)}
                    />
                    {errors.name && (
                      <small className="text-danger">
                        {errors.name.message}
                      </small>
                    )}
                  </label>
                </div>
                <div className="col-12">
                  <label className="single-input-inner style-bg-border">
                    <input
                      {...register("LastName", {
                        required: "lastname is required",

                        message: "Enter Last name required",
                      })}
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => setLname(e.target.value)}
                    />
                    {errors.LastName && (
                      <span
                        role="alert"
                        style={{ color: "red", font: "200", fontSize: "small" }}
                      >
                        {errors.LastName.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="col-12">
                  <label className="single-input-inner style-bg-border">
                    <input
                      {...register("email", {
                        required: "email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered valid email format",
                        },
                      })}
                      type="text"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <span
                        role="alert"
                        style={{ color: "red", font: "200", fontSize: "small" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Tooltip on top"
                      >
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="col-12">
                  <label className="single-input-inner style-bg-border">
                    <input
                      {...register("password", {
                        required: "password is required",
                        minLength: {
                          value: 6,
                          message: "min length is 6",
                        },
                      })}
                      id="password-field"
                      className="form-control "
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    {passwordShown ? (
                      <span
                        toggle="#password-field"
                        class="fa fa-fw fa-eye field-icon toggle-password mx-4"
                        aria-hidden="false"
                        onClick={togglePassword}
                      ></span>
                    ) : (
                      <span
                        toggle="#password-field"
                        class="fa fa-eye-slash field-icon toggle-password mx-4"
                        aria-hidden="true"
                        onClick={togglePassword}
                      ></span>
                    )}
                    {errors.password && (
                      <span
                        role="alert"
                        style={{ color: "red", font: "200", fontSize: "small" }}
                      >
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                </div>
                {/*<div className="col-12">
			              <label className="single-input-inner style-bg-border">
			                <input type="text" placeholder="Confirm Password" />
			              </label>
	</div>*/}
                <div className="col-12 mb-4">
                  <button
                    type="submit"
                    // onClick={(e) => authenticate(e)}
                    className="btn btn-base w-100"
                    disabled={loading ? "true" : null}
                  >
                    {loading ? (
                      <i
                        className="fa fa-spinner fa-spin"
                        style={{ fontSize: "15px", marginRight: "5px" }}
                      ></i>
                    ) : (
                      "SignUp"
                    )}
                  </button>
                </div>
                <div className="col-12">
                  <span>Already have an acount </span> &nbsp;
                  <Link to="/sign-in">
                    <strong>Signin</strong>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
