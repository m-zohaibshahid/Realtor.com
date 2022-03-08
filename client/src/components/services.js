import React from "react";
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header2";
import Services from "./section-components/services";
import Footer from "./global-components/footer2";
import NetworkError from "../Hoc/NetworkError";
// import NetworkDetector from "../Hoc/NetworkDetector";

const Faq = () => {
  return (
    <div>
      {/* <NetworkError /> */}
      <Navbar />
      {/* <PageHeader headertitle="Services" headerimg="assets/img/services.jpeg" /> */}
      <PageHeader headerimg="assets/img/services.jpeg" />
      {/* <Services /> */}
      <Footer />
    </div>
  );
};

export default Faq;
