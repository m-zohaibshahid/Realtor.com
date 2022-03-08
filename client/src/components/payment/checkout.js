import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./checkout.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { baseUrl } from "../../config/baseUrl";
const PayPalButton = window?.paypal?.Buttons?.driver("react", {
  React,
  ReactDOM,
});

const Checkout = (props) => {
  const {
    propertyId,
    buildingType,
    newStatus,
    setNewStatus,
    handleClose,
    payPrice,
  } = props;
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [details, setDetails] = useState({});
  const [orderID, setOrderID] = useState("");
  console.log("checkout page", props);
  console.log("propertyid===>>>>>>>>>>>>>>", propertyId);
  console.log("price for ", payPrice, "is", buildingType);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: `${payPrice}`,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;
      if (details.status === "COMPLETED") {
        setSuccess(true);
        setDetails(details);
        setPaymentSuccess(details);
      }
      console.log("payer", payer);
      console.log("details", details);
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  const setPaymentSuccess = async (d) => {
    const body = {
      details: d,
      paymentVerified: "paid",
      buildingType,
      price: payPrice,
    };

    console.log("body pay", body);
    console.log("order id pay swrILS", d);
    try {
      // const res = await axios.put(
      //   `${baseUrl}/api/updatePaymentStatus/${propertyId}`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: localStorage.getItem("token"),
      //     },
      //     body: JSON.stringify(body),
      //   }
      // );
      await fetch(`${baseUrl}/api/updatePaymentStatus/${propertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          details: d,
          paymentVerified: "paid",
          buildingType,
          price: payPrice,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("reseessss========================>", data);
          console.log("transactions====================>", data.data?.message);
          if (data?.length > 0) {
          } else if (data?.error === "result not found") {
            console.log("error catch wala");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      // alert("Payment successful!!");

      setNewStatus(false);
    }
  }, [success]);

  console.log(1, orderID);
  console.log(2, success);
  console.log(3, ErrorMessage);
  return (
    <Modal
      show={newStatus}
      onHide={handleClose}
      style={{ content: { top: "70%" } }}
    >
      <Modal.Body>
        {/* <div className="payment"> */}
        <div
          style={{ marginTop: "5px", marginBottom: "10px", fontWeight: 400 }}
        >
          <span>
            Pay: ${payPrice} CA for {buildingType} property
          </span>
        </div>
        <PayPalButton
          createOrder={createOrder}
          onApprove={onApprove}
          currency="CAD"
        />
        {/* </div> */}
      </Modal.Body>
    </Modal>
  );
};

export default Checkout;
