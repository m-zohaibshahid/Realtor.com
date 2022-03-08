import React from "react";
import "./paymentSuccess.css";
const paymentSuccess = () => {
  return (
    <div className="signin-page-area pd-top-100 ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7 main">
            <div class="payment_header">
              <div class="check">
                <i class="fa fa-check" aria-hidden="true"></i>
              </div>
            </div>
            <div class="content mt-4 pd-bottom-20">
              <h1>Payment Success !</h1>
              <p>Thank you! your payment is complete. </p>
              <a href="/">Go to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default paymentSuccess;
