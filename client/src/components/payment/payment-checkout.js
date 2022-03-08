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

const PaymentCheckout = (props) => {
  const {
    buildingType,
    newStatus,
    setNewStatus,
    handleClose,
    payPrice,
    reload,
  } = props;
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  console.log("checkout page", props);
  console.log("price for ", buildingType, "is", payPrice);

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
        setOrderID(details.id);
        setPaymentSuccess();
        reload();
      }
      console.log("payer", payer);
      console.log("details", details);
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  const setPaymentSuccess = async () => {
    const body = {
      orderId: orderID,
      userId: user?._id,
      paymentVerified,
      buildingType,
      price: payPrice,
    };
    try {
      //   const res = await axios.post(`${baseUrl}/api/payment/checkout`, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: localStorage.getItem("token"),
      //     },
      //   });
      const res = await fetch(`${baseUrl}/api/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });
      console.log("resees========================>", res);
      console.log("result====================>", res.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
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

export default PaymentCheckout;
