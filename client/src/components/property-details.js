import React, { useState, useEffect } from "react";
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header";
import PropertyDetailsPage from "./section-components/property-details";
import Footer from "./global-components/footer-v2";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../reducers/authReducer";
import {
  GET_PROPERTY_BY_ID,
  GET_LOGGED_IN_USER_PROPERTY_BY_ID,
} from "../reducers/propertyReducer";

const PropertyDetails = () => {
  const { singleProperty } = useSelector((state) => state.property);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  console.log("iddddddddddddddddddd", id);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log("tokennnnn", token);
  //   if (token == null) {
  //     history.push("/");
  //   }
  // }, []);
  useEffect(() => {
    setData(singleProperty);
  }, [singleProperty]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(GET_LOGGED_IN_USER_PROPERTY_BY_ID(id));
    } else {
      dispatch(GET_PROPERTY_BY_ID(id));
    }

    dispatch(getUserId());
  }, [dispatch, id]);

  const reload = () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(GET_LOGGED_IN_USER_PROPERTY_BY_ID(id));
    } else {
      dispatch(GET_PROPERTY_BY_ID(id));
    }
  };

  console.log("Data", singleProperty);
  return (
    <div>
      <Navbar />
      {/* <PageHeader
        headertitle="Property Details"
        headerimg="assets/img/home3.png"
      /> */}
      <PropertyDetailsPage property={data} userId={id} reload={reload} />
      <Footer />
    </div>
  );
};

export default PropertyDetails;
