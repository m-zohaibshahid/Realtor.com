import React, { useState, useEffect } from "react";
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header";
import AddProperty from "./section-components/add-property";
import Footer from "./global-components/footer-v2";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROPERTY_BY_ID } from "../reducers/propertyReducer";
import { useParams } from "react-router-dom";

const AddPropertyPage = () => {
  //   const { singleProperty } = useSelector((state) => state.property);
  //   const { listingType, id } = useParams();
  //   const dispatch = useDispatch();
  //   const [data, setData] = useState({});

  //   useEffect(() => {
  //     dispatch(GET_PROPERTY_BY_ID(id));
  //   }, [dispatch, id]);

  //   useEffect(() => {
  //     setData(singleProperty);
  //   }, [singleProperty]);
  //   console.log("Property", singleProperty);
  return (
    <div>
      <Navbar />
      {/* <PageHeader headertitle="Add Property" /> */}
      <AddProperty />
      <Footer />
    </div>
  );
};

export default AddPropertyPage;
