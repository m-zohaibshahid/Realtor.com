import React from "react";
import Footer_v2 from "./global-components/footer-v2";
import { useParams } from "react-router-dom";
import Navbar from "./global-components/navbar-v2";
import Page_header from "./global-components/page-header2";
import MyPropertyList from "./MyPropertyList";
const MyPropertyLists = () => {
  const { listingType } = useParams();
  return (
    <div>
      <Navbar />
      <Page_header headerimg="assets/img/home3.png" />
      <MyPropertyList />
      <Footer_v2 />
    </div>
  );
};

export default MyPropertyLists;
