import React from "react";
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header2";
import Faq from "./faq-components/faq";
import Footer from "./global-components/footer-v2";

const FaqPage = () => {
  return (
    <div>
      <Navbar />
      <PageHeader headerimg="assets/img/faq.jpeg" />
      <Faq />
      <Footer />
    </div>
  );
};

export default FaqPage;
