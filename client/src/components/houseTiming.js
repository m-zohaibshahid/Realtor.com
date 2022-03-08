import React from "react";

import Navbar from "./global-components/navbar-v2";
// import PageHeader from "./global-components/page-header";
import Timing from "./section-components/houseTiming";
import Footer from "./global-components/footer-v2";
const HouseTiming = () => {
  return (
    <div>
      <Navbar />
      <Timing />
      <Footer />
    </div>
  );
};

export default HouseTiming;
