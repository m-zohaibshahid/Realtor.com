import React, { useState, useEffect } from "react";
import Navbar from "./global-components/navbar-v2";
import AddPropertyRent from "./section-components/add-property-rent";
import Footer from "./global-components/footer-v2";

const AddPropertyPage = () => {
  return (
    <div>
      <Navbar />

      <AddPropertyRent />
      <Footer />
    </div>
  );
};

export default AddPropertyPage;
