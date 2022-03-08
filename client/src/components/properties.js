import React from "react";
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header";
import PropertyGrid from "./section-components/propertiesShow";
import Footer from "./global-components/footer-v2";
import { useParams } from "react-router-dom";

const PropertGridPage = () => {
  const { listingType } = useParams();
  return (
    <div>
      <Navbar />
      {/* <PageHeader
        headertitle={`For ${listingType}`}
        headerimg="assets/img/home3.png"
      /> */}
      <PropertyGrid />
      <Footer />
    </div>
  );
};

export default PropertGridPage;
