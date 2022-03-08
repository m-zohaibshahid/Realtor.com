import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../config/baseUrl";
import { useHistory } from "react-router-dom";
import { updateProfile } from "../../reducers/authReducer";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const ProfileUpdate = (props) => {
  console.log("....props..........", props);
  const { history } = useHistory();
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edit, setEdit] = useState(false);
  const [ltitle, setLTitle] = useState("");
  const [ptitle, setPTitle] = useState(false);

  const [nameEdit, setNameEdit] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [labelTitle, setLabelTitle] = useState("");
  const [updateData, setUpdateData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [updateNewPassword, setUpdatePassword] = useState("");
  const [updateConfirmPassword, setUpdateConfirmPassword] = useState("");
  const { newEdit, data, handleClose, handleCloseEmail, reload, emailCheck } =
    props;

  useEffect(() => {
    if (data?.name !== "") {
      console.log("name============>");
      updateName();
    } else if (data?.password !== false) {
      console.log("pass============>");
      updatePassword();
    } else {
      console.log("email============>");
      updateEmail();
      setEditEmail(true);
      // setEmailCheck(true);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPassword({ updateConfirmPassword });
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };

    if (!updateData) {
      setTimeout(() => {
        toast.error("Full fill requirments", {
          autoClose: 1500,
        });
        setIsLoading(false);
      }, 1000);
    } else if (updateNewPassword !== updateConfirmPassword) {
      setTimeout(() => {
        toast.error("Password does not match", {
          autoClose: 1500,
        });
        setIsLoading(false);
      }, 1000);
    } else {
      try {
        const res = await fetch(`${baseUrl}/api/profile/${user?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email,
            fname,
            lname,
            password: updateNewPassword,
          }),
        });
        setIsLoading(false);
        console.log("responosd", res);
        if (res?.status === 200) {
          toast.success(`${labelTitle} updated successfully`, {
            autoClose: 2000,
          });

          handleCloseButton();
          handleCloseButtonEmail();
          reload();
          // dispatch(updateProfile({ data }));
          setIsLoading(false);
        } else {
          toast.error("Something went wrong", {
            autoClose: 2000,
          });
          setIsLoading(false);
        }
      } catch (error) {
        toast.error("Error", error, {
          autoClose: 2000,
        });
        setIsLoading(false);
      }
    }
  };
  const updateName = () => {
    setLabelTitle("Name");
    setTitle("name");
    setLTitle("LastName");
    setSubTitle("This is how we we'll address you");
    setEdit(true);
    setFName(data?.fname);
    setLName(data?.lname);
  };
  const updateEmail = () => {
    console.log("errrrrr");
    setEditEmail(true);
    setLabelTitle("Email");
    setTitle("email");
    setSubTitle("Make sure we can reach you at your new email");
    setEmail(data?.email);
  };
  const updatePassword = () => {
    setLabelTitle("Password");
    setEdit(true);
    setPTitle("Confirm Password");
    setTitle("password");
    setSubTitle("Changing  your  password ? Go for at least 6 characters");
  };
  const handleCloseButton = () => {
    handleClose();
    setEdit(false);
    setEditEmail(false);
    setLabelTitle("");
    setTitle("");
    setSubTitle("");
    setEmail("");
    setFName("");
    setLName("");
    // setEmailCheck(false);
  };
  const handleCloseButtonEmail = () => {
    handleCloseEmail();
    // setEmailCheck(false);
  };

  // const ProfiledataChange = (e) => {
  //   // console.log(e);
  //   // const value = e.target.value;
  //   // console.log(value);

  //   console.log("hello data");
  //   if (updateData?.name == data?.name) {
  //     console.log("hello name");
  //     setUpdateData({ name: e.target.value });
  //     setName(updateData.name);
  //   } else if (updateData?.email === data?.email) {
  //     setUpdateData({ email: e.target.value });
  //     setEmail(updateData.email);
  //   } else if (updateData?.password === data?.password) {
  //     setUpdateData({ password: e.target.value });
  //     setPassword(updateData.password);
  //   }
  //   // setUpdateData(value);
  // };
  return (
    <>
      <div>
        <Modal
          size="md"
          show={newEdit}
          onHide={handleCloseButton}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header>
            <span
              style={{
                right: "0",
                position: "absolute",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={handleCloseButton}
            >
              <i class="fas fa-times"></i>
            </span>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          <form
            onSubmit={handleSubmit}
            className="form form-label-right "
            encType="multipart/form-data"
          >
            <Modal.Body className="overlay overlay-block cursor-default pb-5  ">
              <div class="form-group row  mb-3">
                <div className="col-sm-12">
                  <p>{subTitle}</p>
                </div>
                <div className="col-sm-12 mt-2">
                  <div id="the-basics">
                    {edit ? (
                      <>
                        {/* <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                          <label className="single-input-inner style-bg-border">
                            {labelTitle}
                            <input
                              class="typeahead"
                              type="text"
                              value={fname !== "" ? fname : null}
                              onChange={
                                fname == ""
                                  ? (e) => setUpdatePassword(e.target.value)
                                  : password == ""
                                  ? (e) => setFName(e.target.value)
                                  : ""
                              }
                              placeholder={`New ${labelTitle}`}
                            />
                          </label>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                          <label className="single-input-inner style-bg-border">
                            {fname !== "" ? ltitle : ptitle}

                            <input
                              class="typeahead"
                              type="text"
                              value={lname !== "" ? lname : null}
                              onChange={
                                lname == ""
                                  ? (e) =>
                                      setUpdateConfirmPassword(e.target.value)
                                  : password == ""
                                  ? (e) => setLName(e.target.value)
                                  : ""
                              }
                              placeholder={`Confirm ${labelTitle}`}
                            />
                          </label>
                        </div> */}
                        {labelTitle === "Name" ? (
                          <>
                            <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                              <label className="single-input-inner style-bg-border">
                                <h6>First Name</h6>
                                <input
                                  class="typeahead"
                                  type="text"
                                  value={fname}
                                  onChange={(e) => setFName(e.target.value)}
                                  placeholder="First Name"
                                />
                              </label>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                              <label className="single-input-inner style-bg-border">
                                <h6>Last Name</h6>
                                <input
                                  class="typeahead"
                                  type="text"
                                  value={lname}
                                  onChange={(e) => setLName(e.target.value)}
                                  placeholder="Last Name"
                                />
                              </label>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {labelTitle === "Password" ? (
                          <>
                            <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                              <label className="single-input-inner style-bg-border">
                                <h6>Password</h6>
                                <input
                                  class="typeahead"
                                  type="text"
                                  value={updateNewPassword}
                                  onChange={(e) =>
                                    setUpdatePassword(e.target.value)
                                  }
                                  placeholder="password"
                                />
                              </label>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                              <label className="single-input-inner style-bg-border">
                                <h6>Confirm Password</h6>
                                <input
                                  class="typeahead"
                                  type="text"
                                  value={updateConfirmPassword}
                                  onChange={(e) =>
                                    setUpdateConfirmPassword(e.target.value)
                                  }
                                  placeholder="Confirm Password"
                                />
                              </label>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : // : nameEdit ? (
                    //   <>
                    //     <input
                    //       class="typeahead"
                    //       type="text"
                    //       // onChange={() => ProfiledataChange()}
                    //       onChange={
                    //         fname !== ""
                    //           ? (e) => setFName(e.target.value)
                    //           : null
                    //       }
                    //       placeholder={labelTitle}
                    //       // value={name}
                    //       // onChange={(e) => {
                    //       //   setName(e.target.value);
                    //       // }}
                    //     />
                    //     <br></br>
                    //     <label className="mt-2">Last Name</label>
                    //     <input
                    //       class="typeahead"
                    //       type="text"
                    //       value={lname !== "" ? lname : null}
                    //       onChange={
                    //         lname !== ""
                    //           ? (e) => setLName(e.target.value)
                    //           : null
                    //       }
                    //       placeholder={`Last ${labelTitle}`}
                    //     />
                    //   </>
                    // )
                    null}
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={handleCloseButton}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-elevate"
                disabled={isLoading ? "true" : null}
                style={{ width: "6rem" }}
              >
                {isLoading ? (
                  <i
                    className="fa fa-spinner fa-spin"
                    style={{ fontSize: "15px", marginRight: "5px" }}
                  ></i>
                ) : (
                  "Save"
                )}
              </button>
            </Modal.Footer>
          </form>
        </Modal>
        <Modal
          size="md"
          show={emailCheck}
          onHide={handleCloseButtonEmail}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header>
            <span
              style={{
                right: "0",
                position: "absolute",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={handleCloseButtonEmail}
            >
              <i class="fas fa-times"></i>
            </span>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <form
            onSubmit={handleSubmit}
            className="form form-label-right "
            encType="multipart/form-data"
          >
            <Modal.Body className="overlay overlay-block cursor-default pb-5 ">
              <div class="form-group row  mb-3">
                <div className="col-sm-12">
                  <p>{subTitle}</p>
                </div>
                <div className="col-sm-12 mt-2">
                  <div id="the-basics">
                    {/* ( emailCheck && ( */}
                    <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                      <label className="single-input-inner style-bg-border">
                        <input
                          class="typeahead"
                          type="text"
                          value={email}
                          // onChange={() => ProfiledataChange()}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter Email"
                          // value={name}
                          // onChange={(e) => {
                          //   setName(e.target.value);
                          // }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {/* )) */}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={handleCloseButtonEmail}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-elevate"
                disabled={isLoading ? "true" : null}
                style={{ width: "6rem" }}
              >
                {isLoading ? (
                  <i
                    className="fa fa-spinner fa-spin"
                    style={{ fontSize: "15px", marginRight: "5px" }}
                  ></i>
                ) : (
                  "Save"
                )}
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default ProfileUpdate;
