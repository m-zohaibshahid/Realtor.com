import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";
import { useForm } from "react-hook-form";
import {
  loginPending,
  loginFail,
  loginSuccess,
} from "../../reducers/authReducer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sign-in.css";

toast.configure();
// import parse from 'html-react-parser';

const SignIn = ({ login }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  let publicUrl = process.env.PUBLIC_URL + "/";
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const onSubmit = async () => {
    // e.preventDefault();
    dispatch(loginPending());

    const body = {
      email,
      password,
    };

    try {
      const res = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      console.log("conosle.", result);
      if (result.error) {
        const error = result.error;
        dispatch(loginFail({ error }));
        toast.error(error, {
          autoClose: 3000,
        });
      } else if (result.token) {
        dispatch(loginSuccess({ result }));
        toast.success("Login Successfully!", {
          autoClose: 3000,
        });

        setTimeout(() => {
          history.push("/");
        }, 3000);
        reset();
      }
    } catch (error) {
      dispatch(loginFail({ error }));
      toast.error(error, {
        autoClose: 3000,
      });
      reset();
    }
  };

  useEffect(() => {
    const $ = window.$;

    $("body").addClass("bg-gray");
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // const onSubmit = async (data) => {
  //   await login(data.email, data.password);
  //   reset();
  // };

  return (
    <div className="signin-page-area pd-top-100 ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <form className="signin-inner" onSubmit={handleSubmit(onSubmit)}>
              <h3 align="center">SignIn</h3>
              <div className="row mt-4">
                <div className="col-12">
                  <label
                    htmlFor="email"
                    className="single-input-inner style-bg-border"
                  >
                    <a>
                      <input
                        data-toggle="tooltip"
                        data-placement="top"
                        title="your email!"
                        id="email"
                        {...register("email", {
                          required: "required email",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Entered valid email format",
                          },
                        })}
                        type="text"
                        // type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </a>
                    {errors.email && (
                      <span
                        role="alert"
                        style={{ color: "red", font: "200", fontSize: "small" }}
                      >
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="col-12">
                  <label
                    htmlFor="password"
                    className="single-input-inner style-bg-border"
                  >
                    <input
                      {...register("password", {
                        required: "required password",
                        minLength: {
                          value: 6,
                          message: "min length is 6",
                        },
                      })}
                      id="password"
                      class="form-control"
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <span
                        role="alert"
                        style={{ color: "red", font: "200", fontSize: "small" }}
                      >
                        {errors.password.message}
                      </span>
                    )}
                    {passwordShown ? (
                      <span
                        toggle="#password"
                        class="fa fa-fw fa-eye field-icon toggle-password mx-4 mb-4"
                        aria-hidden="false"
                        onClick={togglePassword}
                      ></span>
                    ) : (
                      <span
                        toggle="#password"
                        class="fa fa-eye-slash field-icon toggle-password mx-4 mb-4"
                        aria-hidden="true"
                        onClick={togglePassword}
                      ></span>
                    )}
                  </label>
                </div>
                <div className="col-12 mb-4">
                  <button
                    className="btn btn-base w-100"
                    type="submit"
                    // onClick={(e) => handleSubmit(e)}
                    disabled={loading ? "true" : null}
                  >
                    {loading ? (
                      <i
                        className="fa fa-spinner fa-spin"
                        style={{ fontSize: "15px", marginRight: "5px" }}
                      ></i>
                    ) : (
                      // <div class="spinner-border spinner-border-sm" role="status"></div>
                      "SignIn"
                      // <button type="submit" >Sign In</button>
                    )}
                  </button>
                </div>
                <div className="col-12">
                  <Link className="link" to="/reset/forgotPassword/1/step">
                    <a href="#">Forgotten Your Password</a>
                  </Link>
                  &nbsp;
                  <a href="signup.html">
                    <Link className="link" to="/sign-up">
                      <strong>Signup</strong>
                    </Link>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
