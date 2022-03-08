import React, { useState } from "react";
// import "react-confirm-alert/src/react-confirm-alert.css";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/baseUrl";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const UpdateStatus = (props) => {
  const { property } = props;
  // const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [soldStatus, setSoldStatus] = useState("");
  const forSaleBuildingType = [{ value: "Sold", label: "Sold" }];
  const forRentBuildingType = [{ value: "Rented", label: "Rented" }];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      // width: 400,
      padding: 20,
      backgroundColor: "#FBFBFB",

      // background: blue,
    }),
    control: (base, state, provided) => ({
      ...base,
      ...provided,

      border: state.isFocused ? 0 : 0,
      backgroundColor: "#FBFBFB",
      height: "60px",
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? 0 : 0,
        // height: 50,
      },
    }),
  };
  // ...........................................fetching API...........................................//
  const Submit = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/api/edit/soldStatus/${property?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            soldStatus,
          }),
        }
      );
      setIsLoading(false);
      console.log("responosd", res);
      if (res?.status === 200) {
        toast.success(`Status updated successfully`, {
          autoClose: 2000,
        });

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
  };
  // ........................................end fetching API....................................//
  // handleBuildingType =======>
  const handleBuildingType = (e) => {
    setSoldStatus(e.value);
  };
  //   if (loading) {
  //     return <SplashScreen />;
  //   }
  return (
    <>
      <button
        className="btn btn-base btn-elevate"
        variant="primary"
        style={{
          padding: "10px",
          borderRadius: "3px",
          backgroundColor: "#0069D9",
          color: "white",
          border: "none",
        }}
        onClick={handleShow}
      >
        Update Status
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ backgroundColor: "#F5F6F7" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Your Property Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {property?.buildingType == "Rent" ? (
            <div className="col-sm-12 col-md-12 col-lg-12 col-12">
              {/* <div className="single-select-inner style-bg-border"> */}
              <label className="single-input-inner style-bg-border">
                <h5 className="label">Update Status</h5>
                <Select
                  styles={customStyles}
                  options={forRentBuildingType}
                  onChange={handleBuildingType}
                  // defaultValue={forBuildingType?.map(
                  // 	(item, i) => item === buildingType && item
                  // // )}
                  // defaultValue={forBuildingType.filter(
                  //   ({ value }) => value === buildingType
                  // )}
                />
              </label>
            </div>
          ) : (
            <div className="col-sm-12 col-md-12 col-lg-12 col-12">
              {/* <div className="single-select-inner style-bg-border"> */}
              <label className="single-input-inner style-bg-border">
                <h5 className="label">Update Status</h5>
                <Select
                  styles={customStyles}
                  options={forSaleBuildingType}
                  onChange={handleBuildingType}
                  // defaultValue={forBuildingType?.map(
                  // 	(item, i) => item === buildingType && item
                  // // )}
                  // defaultValue={forBuildingType.filter(
                  //   ({ value }) => value === buildingType
                  // )}
                />
              </label>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            variant="secondary"
            style={{
              padding: "10px",
              borderRadius: "3px",
              backgroundColor: "#0069D9",
              color: "white",
              border: "none",
            }}
            onClick={handleClose}
          >
            Close
          </button>
          <button
            variant="primary"
            style={{
              padding: "10px",
              borderRadius: "3px",
              backgroundColor: "#0069D9",
              color: "white",
              border: "none",
            }}
            onClick={() => Submit()}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateStatus;
