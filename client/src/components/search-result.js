import React from "react";
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header";
import SearchResult from "./section-components/search-result";
import Footer from "./global-components/footer-v2";

const SearchResultPage = () => {
  console.log("searach result page");
  return (
    <div>
      <Navbar />
      {/* <PageHeader headerimg="assets/img/home3.png" /> */}
      <SearchResult />
      <Footer />
    </div>
  );
};

export default SearchResultPage;
