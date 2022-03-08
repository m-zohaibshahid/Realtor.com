import React, { useState, useEffect, Fragment, useRef } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { GET_PROPERTY_BY_ID } from "../../reducers/propertyReducer";
import { baseUrl } from "../../config/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import Checkout from "../payment/checkout";

import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Date from "./add-property-date";
// import "bootstrap/dist/css/bootstrap.css";
// import Tabs from "react-bootstrap/Tabs";
// import Tab from "react-bootstrap/Tab";
// import { Tabs, Tab } from "react-bootstrap-tabs";
// import Checkout from "../payment/checkout";
import * as yup from "yup";
// import parse from 'html-react-parser';
import { mixed } from "yup";
import { JsonWebTokenError } from "jsonwebtoken";
// import { StepContent } from "@material-ui/core";
const steps = [
  "Interior",
  "Exterior",
  "Utility Information",
  "Financial Information",
  "Room Dimensions",
  "Uploading Image",
  "Description",
];
const AddPropertyRent = (props) => {
  // const { singleProperty, userId } = props;
  const history = useHistory();
  const locations = useLocation();
  const { listingType, id } = useParams();
  const { singleProperty } = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const [item, setItem] = useState([]);
  const fileInputRef = useRef();
  console.log("listing type ==========>>,,", listingType);

  // useEffect(() => {
  //   setPaymentSuccess();
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("tokennnnn", token);
    if (token == null) {
      history.push("/");
    }
  }, []);
  useEffect(() => {
    dispatch(GET_PROPERTY_BY_ID(id));
  }, [dispatch, id]);

  useEffect(() => {
    setItem(singleProperty);
    console.log("Property=======>", singleProperty);
  }, [singleProperty]);

  useEffect(() => {
    console.log("id", id);
    console.log("params", listingType);
    if (listingType === "Add") {
      console.log("hello brother", listingType);
      setType("POST");
    } else if (listingType === "Edit") {
      console.log("singlePropertymmmmmmmmmm", item);
      setType("PUT");
      setLocation(singleProperty?.location);
      setPropertyTax(singleProperty?.propertyTax);
      setPropertyTaxYear(singleProperty?.propertyTaxYear);
      setAssociationPOTLFee(singleProperty?.associationPOTLFee);
      setAssessmentAmount(singleProperty?.assessmentAmount);
      setAssessmentYear(singleProperty?.assessmentYear);
      setCity(singleProperty?.city);
      setFirePlaces(singleProperty?.firePlaces);
      setFirePlaceFuel(singleProperty?.firePlacesFuel);
      setYearBuild(singleProperty?.yearBuild);
      setParkingSpots(singleProperty?.parkingSpots);
      setBedrooms(singleProperty?.bedrooms);
      setFloors(singleProperty?.floors);
      setBathrooms(singleProperty?.bathrooms);
      setCoolingType(singleProperty?.coolingType);
      setWaterType(singleProperty?.waterType);
      setSewerType(singleProperty?.sewerType);
      setHeatingType(singleProperty?.heatingType);
      setHouseType(singleProperty?.houseType);
      setFrontType(singleProperty?.frontType);
      setViewType(singleProperty?.viewType);
      setRoofingType(singleProperty?.roofingType);
      setBuildingType(singleProperty?.buildingType);
      setHeatingFuel(singleProperty?.heatingFuel);
      setDes(singleProperty?.des);
      setPriceOfProperty(singleProperty?.priceOfProperty);
      setImages(singleProperty?.images ? singleProperty?.images : []);
      setExtraImages(singleProperty?.images ? singleProperty?.images : []);
      setSiteAmenities(singleProperty?.siteAmenities);
      setConstructionMaterial(singleProperty?.constructionMaterial);
      setBasement(singleProperty?.basement);
      //setRoomDimensions(singleProperty?.roomDimension);
      RoomDimensionFunc(singleProperty?.roomDimension);
      setFlooring(singleProperty?.flooring);
      // setTiming(singleProperty?.houseTiming);
      HouseTimingFunc(singleProperty?.houseTiming);
      setHomeAmenities(singleProperty?.homeAmenities);
      setAppliances(singleProperty?.appliances);
      setRoomAmenities(singleProperty?.roomAmenities);
      setKitchenAmenities(singleProperty?.kitchenAmenities);
      BathAmenitiesFunc(singleProperty?.bathAmenities);
      // setBathAmenities(singleProperty?.bathAmenities);
      setNeighbouringAmenities(singleProperty?.neighbouringAmenities);
      setExteriorConstruction(singleProperty?.exteriorConstruction);
      setOwnershipDoc(singleProperty?.ownershipDoc);
      setDriverLicence(singleProperty?.driverLicence);
      setSquareFeet(singleProperty?.squareFeet);
      setID(singleProperty?._id);
    }
  }, [singleProperty]);
  const RoomDimensionFunc = (dataxx) => {
    let newData = [];
    for (var i = 0; i < dataxx?.length; i++) {
      let newObj = {
        roomId: dataxx[i].roomId,
        attachBathRoom: dataxx[i].attachBathRoom,
        dimensions: dataxx[i].dimensions,
        levels: dataxx[i].levels,
      };
      newData.push(newObj);
    }
    setRoomDimensions(newData);
  };
  const HouseTimingFunc = (datax) => {
    let newData = [];
    for (var i = 0; i < datax?.length; i++) {
      let newObj = {
        timeId: datax[i].timeId,
        day: datax[i].day,
        closing: datax[i].closing,
        opening: datax[i].opening,
        date: datax[i].date,
      };
      newData.push(newObj);
    }
    setTiming(newData);
    console.log("hloooooooooool", newData);
  };
  const BathAmenitiesFunc = (datax) => {
    let newData = [];
    for (var i = 0; i < datax?.length; i++) {
      let newObj = {
        label: datax[i].label,
        value: datax[i].value,
      };
      newData.push(newObj);
    }
    setBathAmenities(newData);
  };
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [extraImages, setExtraImages] = useState([]);
  const [des, setDes] = useState("");
  const [priceOfProperty, setPriceOfProperty] = useState("");
  const [location, setLocation] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [propertyTaxYear, setPropertyTaxYear] = useState("");
  const [associationPOTLFee, setAssociationPOTLFee] = useState("");
  const [assessmentAmount, setAssessmentAmount] = useState("");
  const [assessmentYear, setAssessmentYear] = useState("");
  const [city, setCity] = useState("");
  const [firePlaces, setFirePlaces] = useState("");
  const [firePlaceFuel, setFirePlaceFuel] = useState("");
  const [yearBuild, setYearBuild] = useState("");
  const [parkingSpots, setParkingSpots] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [floors, setFloors] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [viewType, setViewType] = useState("");
  const [coolingType, setCoolingType] = useState("");
  const [waterType, setWaterType] = useState("");
  const [sewerType, setSewerType] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [houseType, setHouseType] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [frontType, setFrontType] = useState("");
  const [roofingType, setRoofingType] = useState("");
  const [roomDimensions, setRoomDimensions] = useState([]);
  const [timing, setTiming] = useState([
    {
      timeId: 1,
      day: "",
      closing: "",
      opening: "",
      date: "",
    },
  ]);
  const [siteAmenities, setSiteAmenities] = useState([]);
  const [constructionMaterial, setConstructionMaterial] = useState([]);
  const [basement, setBasement] = useState([]);
  const [flooring, setFlooring] = useState([]);
  const [homeAmenities, setHomeAmenities] = useState([]);
  const [appliances, setAppliances] = useState([]);
  const [roomAmenities, setRoomAmenities] = useState([]);
  const [kitchenAmenities, setKitchenAmenities] = useState([]);
  const [bathAmenities, setBathAmenities] = useState([]);
  const [neighbouringAmenities, setNeighbouringAmenities] = useState([]);
  const [exteriorConstruction, setExteriorConstruction] = useState([]);
  const [buildingType, setBuildingType] = useState("");
  const [listingByType, setListingByType] = useState("");
  const [heatingFuel, setHeatingFuel] = useState("");
  const [ownershipDoc, setOwnershipDoc] = useState("");
  const [driverLicence, setDriverLicence] = useState("");
  const [imageCheck, setImageCheck] = useState(false);
  const [_id, setID] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [newStatus, setNewStatus] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("");
  // const [monthly, PriceOfProperty] = useState("");
  const handleClose = () => setNewStatus(false);
  const [propertyId, setPropertyId] = useState("");
  const [payPrice, setPayPrice] = useState(0);
  const [file, setFile] = useState([]);
  const [getPropertyByID, setPropertyById] = useState(0);
  const [transaction, setTransaction] = useState({});

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [key, setKey] = useState("home");
  const { user } = useSelector((state) => state.user);

  const { property, userId, reload, update } = props;

  const forBuildingType = [
    { value: "Rent", label: "Rent" },
    { value: "Sale", label: "Sale" },
  ];
  const forHeatingFuel = [{ value: "Natural Gas", label: "Natural Gas" }];
  const forHouseType = [
    { value: "Bungalow", label: "Bungalow" },
    { value: "Town House", label: "Town House" },
    { value: "Apartment", label: "Apartment" },
    { value: "Semi-Detach", label: "Semi-Detach" },
    { value: "Single Family", label: "Single Family" },
  ];
  const forViewType = [
    { value: "Stone", label: "Stone" },
    { value: "Brick", label: "Brick" },
    { value: "Metal", label: "Metal" },
    { value: "Sheeting", label: "Sheeting" },
  ];
  const forCoolingType = [
    { value: "Central Air", label: "Central Air" },
    // { value: "Natural Gas", label: "Natural Gas" },
  ];
  const forWaterType = [
    { value: "Municipal Water", label: "Municipal Water" },
    { value: "Well", label: "Well" },
  ];
  const forFirePlaceFuel = [
    { value: "Gas", label: "Gas" },
    { value: "Wood", label: "Wood" },
  ];
  const forSewerType = [{ value: "Sewer Connected", label: "Sewer Connected" }];
  const forHeatingType = [
    { value: "Forced Air", label: "Forced Air" },
    { value: "Air", label: "Air" },
    { value: "Furnace", label: "Furnace" },
  ];
  const forDate = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];
  const forRoofingType = [
    { value: "Metal Roof,", label: "Metal Roof," },
    { value: "Clay Tile", label: "Clay Tile" },
    { value: "Slate", label: "Slate" },
  ];
  const forFrontType = [
    { value: "River", label: "River" },
    { value: "Asphalt Shingle", label: "Asphalt Shingle" },
    { value: "Ocean", label: "Ocean" },
    { value: "Lake Front", label: "Lake Front" },
  ];
  const SiteAmenities = [
    { label: "Greenbelt", value: "Greenbelt" },
    { label: "Golf course", value: "Golf course" },
    { label: "Suburban", value: "Suburban" },
    { label: "Mountains", value: "Mountains" },
    { label: "Cul-de-sac", value: "Cul-de-sac" },
    { label: "Dead-end street", value: "Dead-end street" },
    { label: "Gated Community", value: "Gated Community" },
  ];
  const HomeConstruction = [
    { label: "Adobe", value: "Adobe" },
    { label: "Brick", value: "Brick" },
    { label: "Concrete Block", value: "Concrete Block" },
    { label: "Log", value: "Log" },
    { label: "Metal", value: "Metal" },
    { label: "Stone", value: "Stone" },
    { label: "Straw", value: "Straw" },
    { label: "Wood", value: "Wood" },
  ];
  const HomeAmenities = [
    { label: "Fridge", value: "Fridge" },
    { label: "Stove", value: "Stove" },
    { label: "Washer", value: "Washer" },
    { label: "Dyer", value: "Dyer" },
  ];
  const Appliances = [
    { label: "Cooktop", value: "Cooktop" },
    { label: "Dishwasher", value: "Dishwasher" },
    { label: "Dryer", value: "Dryer" },
    { label: " Microwave", value: " Microwave" },
    { label: " Refrigerator", value: " Refrigerator" },
    { label: "Stove", value: "Stove" },
    { label: "Washer", value: "Washer" },
    { label: " wall Oven", value: "wall Oven" },
  ];
  const Basement = [
    { label: "Finished", value: "Finished" },
    { label: "Unfinished", value: "Unfinished" },
    { label: "N/A", value: "N/A" },
  ];
  const AttachBathRoom = [
    { label: "Yes", value: "Yes" },
    { label: "NO", value: "No" },
  ];
  const Flooring = [
    { label: "Hardwood", value: "Hardwood" },
    { label: "Tile", value: "Tile" },
    { label: "Carpet", value: "Carpet" },
  ];
  const RoomAmenities = [
    { label: "Adobe", value: "Adobe" },
    { label: "Brick", value: "Brick" },
    { label: "Concrete Block", value: "Concrete Block" },
    { label: "Log", value: "Log" },
    { label: "Metal", value: "Metal" },
    { label: "Stone", value: "Stone" },
    { label: "Straw", value: "Straw" },
    { label: "Wood", value: "Wood" },
  ];
  const KitchenAmenities = [
    { value: "Adobe", label: "Adobe" },
    { value: "Brick", label: "Brick" },
    { value: "Concrete Block", label: "Concrete Block" },
    { value: "Log", label: "Log" },
    { value: "Metal", label: "Metal" },
    { value: "Stone", label: "Stone" },
    { value: "Straw", label: "Straw" },
    { value: "Wood", label: "Wood" },
  ];
  const BathRoomAmenities = [
    { label: "Adobe", value: "Adobe" },
    { label: "Brick", value: "Brick" },
    { label: "Concrete Block", value: "Concrete Block" },
    { label: "Log", value: "Log" },
    { label: "Metal", value: "Metal" },
    { label: "Stone", value: "Stone" },
    { label: "Straw", value: "Straw" },
    { label: "Wood", value: "Wood" },
  ];
  const NeighbouringAmenities = [
    { label: "Playground Nearby", value: "Playground Nearby" },
    { label: " Public Transit Nearby", value: " Public Transit Nearby" },
    { label: " Recreation Nearby", value: " Recreation Nearby" },
    { label: "Shopping Nearby", value: "Shopping Nearby" },
    { label: "Trail", value: "Trail" },
  ];
  const ExteriorConstruction = [
    { label: "Brick", value: "Brick" },
    { label: " Siding", value: "Siding" },
    { label: "Vinyl", value: "Vinyl" },
  ];
  // -----Site Select Method----
  const handleBuildingType = (e) => {
    setBuildingType(e.value);
  };
  const handleHeatingFuel = (e) => {
    setHeatingFuel(e.value);
  };
  const handleHouseType = (e) => {
    setHouseType(e.value);
  };
  const handleViewType = (e) => {
    setViewType(e.value);
  };
  const handleCoolingType = (e) => {
    setCoolingType(e.value);
  };
  const handleWaterType = (e) => {
    setWaterType(e.value);
  };
  const handleSewerType = (e) => {
    setSewerType(e.value);
  };
  const handleHeatingType = (e) => {
    setHeatingType(e.value);
  };
  const handleFirePlaceFuel = (e) => {
    setFirePlaceFuel(e.value);
  };
  const handleFrontType = (e) => {
    setFrontType(e.value);
  };
  const handleRoofingType = (e) => {
    setRoofingType(e.value);
  };
  // -----Site Amenities Method----
  const handleSiteAmenities = (val) => {
    setSiteAmenities(val);
  };
  // -----Home Construction Material Method----
  const handleHomeConstruction = (val) => {
    setConstructionMaterial(val);
  };
  const handleBasement = (val) => {
    setBasement(val);
  };

  const handleFlooring = (val) => {
    setFlooring(val);
  };

  // -----Site Amenities Method----
  const handleHomeAmenities = (val) => {
    setHomeAmenities(val);
  };
  const handleAppliances = (val) => {
    setAppliances(val);
  };

  // -----Home Construction Material Method----
  const handleRoomAmenities = (val) => {
    setRoomAmenities(val);
  };

  // -----Site Amenities Method----
  const handleKitchenAmenities = (val) => {
    setKitchenAmenities(val);
  };
  // -----Home Construction Material Method----//
  const handleBathRoomAmenities = (val) => {
    setBathAmenities(val);
  };
  const handleNeighbouringAmenities = (val) => {
    setNeighbouringAmenities(val);
  };
  const handleExteriorConstruction = (val) => {
    setExteriorConstruction(val);
  };
  // -----Image Input Method----//
  const imageUploadHandler = (e) => {
    console.log("ewwww", ...e.target.files);
    console.log("file inpur ref", fileInputRef);
    let dumpMedia = [...images];
    console.log("object", ...e.target.files);
    if (images.length < 25) {
      dumpMedia.push(...e.target.files);
      setImages(dumpMedia);
      setImageCheck(true);
    }
  }; // -----Image Input Method----//
  const imageUploadOwnershipDoc = (e) => {
    console.log("ewwww", ...e.target.files);
    console.log("file inpur ref", fileInputRef);
    let dumpMedia = [...ownershipDoc];
    console.log("object", ...e.target.files);
    if (ownershipDoc.length < 25) {
      dumpMedia.push(...e.target.files);
      setOwnershipDoc(dumpMedia);
      // setImageCheck(true);
    }
  };
  const imageUploadDriverLicence = (e) => {
    console.log("ewwww", ...e.target.files);
    console.log("file inpur ref", fileInputRef);
    let dumpMedia = [...driverLicence];
    console.log("object", ...e.target.files);
    if (driverLicence.length < 25) {
      dumpMedia.push(...e.target.files);
      setDriverLicence(dumpMedia);
      // setImageCheck(true);
    }
  };
  const ClearData = () => {
    setImageCheck(false);
    // setImages(false);
  };
  useEffect(() => {
    var abc = [
      {
        roomId: 1,
        attachBathRoom: "",
        dimensions: "",
        levels: "",
      },
    ];
    setRoomDimensions(abc);
    const token = localStorage.getItem("token");
    console.log("tokennnnn", token);
    if (token == null) {
      history.push("/");
    }
  }, []);

  // -----BEGIN: Property Add API Call-----//-

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const yes = {
      images,
      priceOfProperty,
      location,
      city,
      yearBuild,
      bedrooms,
      floors,
      bathrooms,
      ownershipDoc,
      driverLicence,
      squareFeet,
      buildingType,
      heatingFuel,
      houseType,
      viewType,
      coolingType,
      kitchenAmenities,
      timing,
      roomDimensions,
      firePlaces,
      roofingType,
      neighbouringAmenities,
      exteriorConstruction,
      propertyTax,
      propertyTaxYear,
      firePlaceFuel,
      associationPOTLFee,
      assessmentAmount,
      assessmentYear,
      appliances,
      sewerType,
      bathAmenities,
      siteAmenities,
      basement,
      // roomDimensions,
      // timing,
    };
    console.log("all fields", yes);
    if (
      !images
      // !priceOfProperty ||
      // !location ||
      // !city ||
      // !yearBuild ||
      // !bedrooms ||
      // !floors ||
      // !bathrooms ||
      // !squareFeet ||
      // !ownershipDoc ||
      // !driverLicence
    ) {
      toast.error("All fields are required!", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        pauseOnFocusLoss: false,
        hideProgressBar: false,
      });
      setLoading(false);
    } else {
      const roomDimension = JSON.stringify(roomDimensions);
      const houseTiming = JSON.stringify(timing);
      var formData = new FormData();
      formData.append("des", des);
      formData.append("priceOfProperty", priceOfProperty);
      formData.append("location", location);
      formData.append("propertyTax", propertyTax);
      formData.append("propertyTaxYear", propertyTaxYear);

      formData.append("city", city);
      formData.append("roomDimension", roomDimension);
      formData.append("houseTiming", houseTiming);
      formData.append("firePlaces", firePlaces);
      formData.append("firePlacesFuel", firePlaceFuel);

      formData.append("yearBuild", yearBuild);
      formData.append("parkingSpots", parkingSpots);
      formData.append("bedrooms", bedrooms);
      formData.append("floors", floors);
      formData.append("bathrooms", bathrooms);
      formData.append("houseType", houseType);
      formData.append("viewType", viewType);
      formData.append("frontType", frontType);
      formData.append("roofingType", roofingType);
      formData.append("siteAmenities", JSON.stringify(siteAmenities));
      formData.append(
        "neighbouringAmenities",
        JSON.stringify(neighbouringAmenities)
      );
      formData.append(
        "exteriorConstruction",
        JSON.stringify(exteriorConstruction)
      );
      formData.append(
        "constructionMaterial",
        JSON.stringify(constructionMaterial)
      );
      formData.append("homeAmenities", JSON.stringify(homeAmenities));
      formData.append("appliances", JSON.stringify(appliances));
      formData.append("roomAmenities", JSON.stringify(roomAmenities));
      formData.append("kitchenAmenities", JSON.stringify(kitchenAmenities));
      formData.append("bathAmenities", JSON.stringify(bathAmenities));
      formData.append("flooring", JSON.stringify(flooring));
      formData.append("buildingType", buildingType);
      formData.append("squareFeet", squareFeet);
      formData.append("heatingFuel", heatingFuel);
      formData.append("basement", JSON.stringify(basement));
      formData.append("extraImages", JSON.stringify(extraImages));
      formData.append("coolingType", coolingType);
      formData.append("heatingType", heatingType);
      formData.append("waterType", waterType);
      formData.append("sewerType", sewerType);

      formData.append("associationPOTLFee", associationPOTLFee);
      formData.append("assessmentAmount", assessmentAmount);
      formData.append("assessmentYear", assessmentYear);
      // OwnerShip Document
      formData.append("ownershipDoc", ownershipDoc);

      // Driver License
      formData.append("driverLicence", driverLicence);

      // Multiple Images Upload
      if (imageCheck) {
        for (var x = 0; x < images.length; x++) {
          formData.append("images", images[x]);
        }
        // for (var x = 0; x < images.length; x++) {
        //   formData.append("extraImages", images[x]);
        // }
      }
      for (var value of formData.values()) {
        console.log("FoRmData=>value=====>>>", value);
      }
      console.log("FoRmData", formData);
      let res;
      let headers;
      try {
        headers = {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        };

        if (type === "POST") {
          res = await axios.post(`${baseUrl}/createProperty`, formData, {
            headers,
          });
        } else if (type === "PUT") {
          console.log("this is PUT method");
          res = await axios.put(`${baseUrl}/updateProperty/${_id}`, formData, {
            headers,
          });
        }
        // return result;
        console.log("result", res);
        if (res?.data.message === "success") {
          if (listingType == "Add") {
            toast.success("Property Saved! Pay Now", {
              autoClose: 3000,
            });
            handlePay(res?.data?.data?._id, res?.data?.data?.buildingType);
            setPropertyId(res?.data?.data?._id);
            setListingByType(res?.data?.data?.buildingType);
          } else {
            console.log("hello bro upadate fo ho gya mer a =>");
            toast.success("Updated Successfully", {
              autoClose: 3000,
            });
            setLoading(false);
            history.goBack();
          }
          resetAllStates();
          setLoading(false);
        } else {
          toast.error("Error", {
            autoClose: 3000,
            position: "top-center",
          });
          setLoading(false);
        }
      } catch (error) {
        console.log("catch wala error", error);
        toast.error("Error", error, {
          autoClose: 3000,
          position: "top-center",
        });
        setLoading(false);
      }
    }
  };

  const resetAllStates = () => {
    setLocation("");
    setPropertyTax("");
    setPropertyTaxYear("");
    setAssociationPOTLFee("");
    setAssessmentAmount("");
    setAssessmentYear("");
    setCity("");
    setRoomDimensions([]);
    setTiming([]);
    setFirePlaces("");
    setFirePlaceFuel("");
    setYearBuild("");
    setParkingSpots("");
    setBedrooms("");
    setFloors("");
    setBathrooms("");
    setViewType("");
    setCoolingType("");
    setWaterType("");
    setSewerType("");
    setHeatingType("");
    setHouseType("");
    setFrontType("");
    setRoofingType("");
    setDes("");
    setPriceOfProperty("");
    setBuildingType("");
    setHeatingFuel("");
    setImages("");
    setSiteAmenities("");
    setConstructionMaterial("");
    setBasement("");
    setHomeAmenities("");
    setAppliances("");
    setRoomAmenities("");
    setKitchenAmenities("");
    setBathAmenities("");
    setNeighbouringAmenities("");
    setOwnershipDoc("");
    setDriverLicence("");
    setSquareFeet("");
  };

  // Download pdf file
  const handleDownloadPDF = (file) => {
    window.location.href = `${baseUrl}/${file?.[0]?.path}`;
  };
  const handlePay = (id, listingType) => {
    console.log("idddddddofProperty", id);
    console.log("listeningTypeofProperty", listingType);
    setBuildingType(listingType);
    setPropertyById(id);
    setNewStatus(true);
    setError(false);
    if (listingType === "Sale") {
      // setPayPrice(78.74);
      setPayPrice(2);
    } else if (listingType === "Rent") {
      // setPayPrice(39.37);
      setPayPrice(1);
    }
  };

  const setPaymentSuccess = async () => {
    try {
      await fetch(`${baseUrl}/api/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("reseessss========================>", data);
          console.log("transactions====================>", data.result);
          if (data?.length > 0) {
            setTransaction(data?.result?.[0]);
            setTransactionId(data?._id);
          } else if (data?.error === "result not found") {
            setError("result not found");
            setTransaction({});
          }
        });
      // history.goBack();

      // const res = result.json();
      // console.log("reseessss========================>", result);
      // console.log("transactions====================>", result);
    } catch (error) {
      console.log(error);
    }
  };
  // const handlePay = (pid, listingType) => {
  //   setBuildingType(listingType);
  //   setNewStatus(true);
  //   setPropertyId(pid);
  //   if (listingType === "Sale") {
  //     // setPayPrice(78.74);
  //     setPayPrice(2);
  //   } else if (listingType === "Rent") {
  //     // setPayPrice(39.37);
  //     setPayPrice(1);
  //   }
  // };

  // -----END: Property Add API Call--------
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      // width: 400,
      padding: 20,
      backgroundColor: "#FBFBFB",

      // background: blue,
    }),
    control: (base, state, provided) => ({
      ...base,
      ...provided,

      border: state.isFocused ? 0 : 0,
      backgroundColor: "#FBFBFB",
      height: "60px",
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? 0 : 0,
        // height: 50,
      },
    }),
  };
  const customStyles_ = {
    menu: (provided, state) => ({
      ...provided,
      // width: 400,
      padding: 20,
      backgroundColor: "#FBFBFB",

      // background: blue,
    }),
    control: (base, state, provided) => ({
      ...base,
      ...provided,

      border: state.isFocused ? 0 : 0,
      backgroundColor: "#FBFBFB",
      height: "53px",
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? 0 : 0,
        // height: 50,
      },
    }),
  };
  let isStepOptional = (step) => {
    return step === 2, 3, 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);

      return newSkipped;
    });
  };

  // BEGIN: room dimension code snippet
  const addRoomDimensions = (e) => {
    e.preventDefault();
    let oldDimensions = [...roomDimensions];
    let newDimensions = {
      roomId: roomDimensions.length + 1,
      attachBathRoom: "",
      dimensions: "",
      levels: "",
    };

    oldDimensions.push(newDimensions);
    setRoomDimensions(oldDimensions);
  };
  // attach bath room
  const upAttachBath = (index, value) => {
    console.log("room dimensionss.......................value", value);
    let oldDimensions = [...roomDimensions];
    oldDimensions[index].attachBathRoom = value;
    console.log("olddimesnsdfss========================>", oldDimensions);
    setRoomDimensions(oldDimensions);
  };
  // update dimension
  const upDimensions = (index, value) => {
    let oldDimensions = [...roomDimensions];
    console.log("here is array oldDimensions => ", oldDimensions);
    console.log(
      "here is dimension value on index - before => ",
      oldDimensions[index].dimensions
    );
    oldDimensions[index].dimensions = value;
    console.log(
      "here is dimension value on index - after => ",
      oldDimensions[index].dimensions
    );
    setRoomDimensions(oldDimensions);
  };
  // update levels
  const upLevels = (index, value) => {
    let oldDimensions = [...roomDimensions];
    oldDimensions[index].levels = value;
    setRoomDimensions(oldDimensions);
  };
  // Delete room dimensions
  const delRoomDimensions = (id) => {
    let oldDimensions = [...roomDimensions];
    var NewDataForDb = oldDimensions.filter((task) => task.roomId !== id);
    setRoomDimensions(NewDataForDb);
  };
  // END: room dimension code snippet
  //.......................... Update date...............................//
  const addTiming = (e) => {
    e.preventDefault();
    let oldTiming = [...timing];
    let newTiming = {
      timeId: timing.length + 1,
      day: "",
      opening: "",
      closing: "",
      date: "",
    };
    oldTiming.push(newTiming);
    setTiming(oldTiming);
  };
  //.......................... Update date (Day)...............................//
  const upDay = (index, value) => {
    let oldTiming = [...timing];
    oldTiming[index].day = value;
    setTiming(oldTiming);
  }; //.......................... Update date...............................//
  const upDate = (index, value) => {
    let oldTiming = [...timing];
    oldTiming[index].date = value;
    setTiming(oldTiming);
  };
  //.......................... Update Starting Time...............................//
  const upStarting = (index, value) => {
    let oldTiming = [...timing];
    oldTiming[index].opening = value;
    setTiming(oldTiming);
  };
  //.......................... Update Closing Time...............................//
  const upClosing = (index, value) => {
    let oldTiming = [...timing];
    oldTiming[index].closing = value;
    setTiming(oldTiming);
  };
  //.......................... Delete Items...............................//
  const delTiming = (id) => {
    let oldTiming = [...timing];
    var NewDataForDb = oldTiming.filter((task) => task.timeId !== id);
    setTiming(NewDataForDb);
  };
  //..........................Ending-Update date...............................//
  const handleReset = () => {
    setActiveStep(0);
  };
  //..........................Delete Image...............................//
  function uploadSingleFile(e) {
    console.log("e.target fiels", e.target.files);
    console.log("e===========>", e);

    let ImagesArray = Object.entries(e.target.files).map(
      (e) => console.log("e.target fiels", e),
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setFile([...file, ...ImagesArray]);
    console.log("file", file);
  }

  function upload(e) {
    e.preventDefault();
    console.log(file);
  }

  function deleteFile(e) {
    const s = images.filter((item, index) => index !== e);
    setImages(s);
    setExtraImages(s);
    console.log(s);
  }
  function getStepContent(activeStep) {
    switch (activeStep) {
      // .............................................Interior Case...............................................//

      case 0:
        return (
          <div className="row ">
            <div className="col-lg-12 col-12 mt-4 mb-4">
              <h4>Interior</h4>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  No of Bedrooms
                  <span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="number"
                  placeholder="Enter number of Bedrooms"
                  value={bedrooms}
                  required
                  style={{ height: "60px" }}
                  onChange={(e) => {
                    setBedrooms(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  No of Bathrooms
                  <span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="number"
                  placeholder=" Enter Numbers of Bathrooms"
                  value={bathrooms}
                  required
                  style={{ height: "60px" }}
                  onChange={(e) => {
                    setBathrooms(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Monthly payment<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="number"
                  placeholder="Monthly payment"
                  value={priceOfProperty}
                  required
                  style={{ height: "60px" }}
                  onChange={(e) => {
                    setPriceOfProperty(e.target.value);
                  }}
                />
              </label>
            </div>
            {/* </div> */}{" "}
            <div className="col-sm-6 col-md-6 col-lg-6 col-12 ">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Appliances
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  isMulti
                  styles={customStyles}
                  onChange={handleAppliances}
                  options={Appliances}
                  defaultValue={appliances}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </label>
            </div>
          </div>
        );
      // ............................................Exterior Case...............................................//
      case 1:
        return (
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-12 mt-4 mb-4">
              <h4>Exterior</h4>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  No of Garage Spaces
                  <span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="number"
                  placeholder="Enter number of Parking Spot"
                  value={parkingSpots}
                  style={{ height: "60px" }}
                  onChange={(e) => {
                    setParkingSpots(e.target.value);
                  }}
                />
              </label>
            </div>
            {/* </label> */}
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  City<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="text"
                  placeholder="City"
                  style={{ height: "60px" }}
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Write Year Build
                  <span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="text"
                  placeholder="Year Build"
                  style={{ height: "60px" }}
                  value={yearBuild}
                  onChange={(e) => setYearBuild(e.target.value)}
                />
              </label>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Area(sq ft.)<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="text"
                  placeholder="Area(sq ft.)"
                  value={squareFeet}
                  style={{ height: "60px" }}
                  onChange={(e) => {
                    setSquareFeet(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Property Address
                  <span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="text"
                  placeholder="Proparty Address"
                  value={location}
                  style={{ height: "60px" }}
                  required
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </label>
            </div>
            {/* <div className="col-md-6 col-12">
          <label className="single-input-inner style-bg-border">
            <h5 className="label">Property Taxes</h5>
            <input
              type="text"
              placeholder="Proparty Taxes"
              value={propertyTax}
              onChange={(e) => {
                setPropertyTax(e.target.value);
              }}
            />
          </label>
        </div> */}
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              {/* <div className="single-select-inner style-bg-border"> */}
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Building For
                  <span style={{ color: "red" }}>*</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forBuildingType}
                  onChange={handleBuildingType}
                  // defaultValue={forBuildingType?.map(
                  // 	(item, i) => item === buildingType && item
                  // )}
                  defaultValue={forBuildingType.filter(
                    ({ value }) => value === buildingType
                  )}
                />
              </label>
            </div>
            {/* </div>{" "} */}
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  House Type<span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forHouseType}
                  onChange={handleHouseType}
                  defaultValue={forHouseType.filter(
                    ({ value }) => value === houseType
                  )}
                />
              </label>
            </div>
            {/* <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  View Type<span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forViewType}
                  onChange={handleViewType}
                  defaultValue={forViewType.filter(
                    ({ value }) => value === viewType
                  )}
                />
              </label>
            </div>
        */}

            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Home Construction Material
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  isMulti
                  styles={customStyles}
                  onChange={handleHomeConstruction}
                  options={HomeConstruction}
                  defaultValue={constructionMaterial}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </label>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Roofing Type
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forRoofingType}
                  onChange={handleRoofingType}
                  defaultValue={forRoofingType.filter(
                    ({ value }) => value === roofingType
                  )}
                />
              </label>
            </div>
          </div>
        );
      // ...........................................Utility Infromation..............................................//
      case 2:
        return (
          <div className="row">
            <div className="col-sm-6 col-md-12 col-lg-12 col-12 mt-4 mb-4">
              <h4>Heating Cooling Sewer information</h4>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Fireplace Fuel
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                {/* <input
									type="number"
									placeholder="Enter number of FirePlaces"
									value={firePlaceFuel}
									style={{ height: "60px" }}
									onChange={(e) => {
										setFirePlaceFuel(e.target.value);
									}}
								/> */}
                <Select
                  styles={customStyles}
                  options={forFirePlaceFuel}
                  onChange={handleFirePlaceFuel}
                  defaultValue={forFirePlaceFuel.filter(
                    ({ value }) => value === firePlaceFuel
                  )}
                />
              </label>
            </div>{" "}
            {/* <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Number of Fireplaces
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <input
                  type="number"
                  placeholder="Enter number of FirePlaces"
                  value={firePlaces}
                  style={{ height: "60px" }}
                  onChange={(e) => {
                    setFirePlaces(e.target.value);
                  }}
                />
              </label>
            </div> */}
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Heating Fuel
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forHeatingFuel}
                  onChange={handleHeatingFuel}
                  defaultValue={forHeatingFuel.filter(
                    ({ value }) => value === heatingFuel
                  )}
                />
              </label>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              {/* <div className="single-select-inner style-bg-border"> */}
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Heat Description
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forHeatingType}
                  onChange={handleHeatingType}
                  defaultValue={forHeatingType.filter(
                    ({ value }) => value === heatingType
                  )}
                />
              </label>
              {/* </div> */}
            </div>{" "}
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Air Conditioning Description
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forCoolingType}
                  onChange={handleCoolingType}
                  defaultValue={forCoolingType.filter(
                    ({ value }) => value === coolingType
                  )}
                />
              </label>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Water Supply
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forWaterType}
                  onChange={handleWaterType}
                  defaultValue={forWaterType.filter(
                    ({ value }) => value === waterType
                  )}
                />
              </label>
            </div>{" "}
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Sewer Type<span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forSewerType}
                  onChange={handleSewerType}
                  defaultValue={forSewerType.filter(
                    ({ value }) => value === sewerType
                  )}
                />
              </label>
            </div>
          </div>
        );
      // ...........................................Utility Infromation..............................................//
      case 3:
        return (
          <div className="row">
            <div className="col-sm-6 col-md-12 col-lg-12 col-12 mt-4 mb-4">
              <h4>Utility information</h4>
            </div>
            {/* <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Heating Fuel
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forHeatingFuel}
                  onChange={handleHeatingFuel}
                  defaultValue={forHeatingFuel.filter(
                    ({ value }) => value === heatingFuel
                  )}
                />
              </label>
            </div> */}
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Cooloing Type
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forCoolingType}
                  onChange={handleCoolingType}
                  defaultValue={forCoolingType.filter(
                    ({ value }) => value === coolingType
                  )}
                />
              </label>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-12">
              <label className="single-input-inner style-bg-border">
                <h5 className="label">
                  Water Supply
                  <span style={{ color: " #dad6d6" }}>-optional</span>
                </h5>
                <Select
                  styles={customStyles}
                  options={forWaterType}
                  onChange={handleWaterType}
                  defaultValue={forWaterType.filter(
                    ({ value }) => value === waterType
                  )}
                />
              </label>
            </div>{" "}
          </div>
        );
      // ............................................Room Dimensions...............................................//
      case 4:
        return (
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-12 mt-4 mb-4">
              <h4>
                Room Dimensions{" "}
                {/* <span style={{ color: " #dad6d6", fontSize: "16px" }}>
                  -optional
                </span> */}
              </h4>{" "}
            </div>
            {/* room dimensions map function */}

            {roomDimensions.map((data, index) => (
              <Fragment key={index}>
                {/* <div className="col-sm-12 col-md-3 col-lg-3 col-12 ">
                  <label className="single-input-inner style-bg-border">
                    <h5 className="label">AttachBathRoom</h5>
                    <Select
                      styles={customStyles}
                      options={AttachBathRoom}
                      onChange={(e) => upAttachBath(index, e.value)}
                      defaultValue={AttachBathRoom.filter(
                        ({ value }) => value === data?.attachBathRoom
                      )}
                    />
                  </label>
                </div> */}
                <div className="col-sm-12 col-md-3 col-lg-3 col-12">
                  <label className="single-input-inner style-bg-border">
                    <h5 className="label">
                      Room name
                      <span style={{ color: " #dad6d6", fontSize: "16px" }}>
                        -optional
                      </span>
                    </h5>
                    <input
                      type="text"
                      placeholder="Room name"
                      value={data?.attachBathRoom}
                      onChange={(e) => upAttachBath(index, e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3 col-12">
                  <label className="single-input-inner style-bg-border">
                    <h5 className="label">
                      {/* Dimensions<span style={{ color: "red" }}>*</span> */}
                      Dimensions
                      <span style={{ color: " #dad6d6", fontSize: "16px" }}>
                        -optional
                      </span>
                    </h5>
                    <input
                      type="text"
                      placeholder="Dimensions"
                      value={data?.dimensions}
                      onChange={(e) => upDimensions(index, e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3 col-12">
                  <label className="single-input-inner style-bg-border">
                    <h5 className="label">
                      Levels
                      <span style={{ color: " #dad6d6", fontSize: "16px" }}>
                        -optional
                      </span>
                    </h5>
                    <input
                      type="text"
                      placeholder="levels"
                      value={data?.levels}
                      onChange={(e) => upLevels(index, e.target.value)}
                    />
                  </label>
                </div>
                <div className="col-sm-12 col-md-3 col-lg-3 col-12">
                  <label className="single-input-inner style-bg-border">
                    <button
                      style={{
                        height: "46px",
                        width: "40px",
                        borderRadius: "4px",
                        marginTop: "25px",
                        // borderRadius: "50px",
                        backgroundColor: "transparent",
                        objectFit: "cover",
                        border: "1px solid #5ba600",
                      }}
                      onClick={addRoomDimensions}
                    >
                      +
                    </button>
                    {data?.roomId == 1 ? null : (
                      <button
                        style={{
                          height: "46px",
                          width: "40px",
                          marginLeft: "5px",
                          marginTop: "25px",

                          borderRadius: "4px",
                          backgroundColor: "transparent",
                          objectFit: "cover",
                          border: "1px solid red",
                        }}
                        onClick={() => delRoomDimensions(data?.roomId)}
                      >
                        -
                      </button>
                    )}
                  </label>
                </div>
              </Fragment>
            ))}
          </div>
        );
      // ............................................Uploading Image...............................................//
      case 5:
        return (
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-12 mt-4 mb-4">
              <h4>Uploading Image</h4>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-12 mt-4">
              <div className="avatar-upload-input text-center">
                {/* <img
              src={publicUrl + "assets/img/icon/upload.png"}
              alt="img"
            /> */}
                <h2>Upload your photo</h2>
                <p style={{ color: "red" }}>Image Dimensions 412X290</p>
                <div className="avatar-edit-input">
                  <input
                    className="btn btn-base"
                    type="file"
                    id="imageUpload"
                    multiple
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      imageUploadHandler(e);
                    }}
                    ref={fileInputRef}
                    // disabled={file.length === 5}
                    // onChange={uploadSingleFile}
                  />
                </div>
                {/* {file.length > 0 &&
                  file.map((item, index) => {
                    return (
                      <div key={item}>
                        <img
                          src={item}
                          alt=""
                          style={{
                            marginLeft: "10px",
                            marginTop: "20px",
                            borderRadius: "10px",
                            // border: "1px solid #5ba600",
                            // padding: "2px",
                          }}
                          // src={
                          //   singleProperty.hasOwnProperty("path")
                          //     ? `${baseUrl}/${singleProperty.path}`
                          //     : URL.createObjectURL(singleProperty)
                          // }
                        />
                        <button type="button" onClick={() => deleteFile(index)}>
                          delete
                        </button>
                      </div>
                    );
                  })} */}
                <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                  <label className="btn btn-base" htmlFor="imageUpload">
                    Click here to Upload
                  </label>
                </div>
                *{" "}
                {images?.length === 0
                  ? ""
                  : images?.map((singleProperty, i) => {
                      return (
                        <Fragment key={singleProperty}>
                          <img
                            style={{
                              marginLeft: "10px",
                              marginTop: "20px",
                              borderRadius: "10px",
                              // border: "1px solid #5ba600",
                              // padding: "2px",
                            }}
                            src={
                              singleProperty.hasOwnProperty("path")
                                ? `${baseUrl}/${singleProperty.path}`
                                : URL.createObjectURL(singleProperty)
                            }
                            width={220}
                            height={140}
                            alt=""
                          />
                          {/* <button
                            style={{s
                              // position: "absolute",
                              display: "flex",
                              // top: "1px",
                              right: "300px",
                              bottom: "220px",
                              backgroundColor: "#0069D9",
                              color: "white",
                              padding: "13px",
                              borderBottomLeftRadius: "20px",
                              borderTopRightRadius: "4px",
                            }}
                          >
                            <i class="fas fa-times" onClick={ClearData}></i>
                          </button> */}
                          <span
                            // type="button"
                            style={{
                              // right: "27px",
                              bottom: "103px",

                              top: "70px",
                              backgroundColor: "#0069D9",
                              color: "white",
                              padding: "10px",
                              // paddingTop: "7px",
                              // paddingBottom: "6px",
                              height: "45px",
                              width: "45px",
                              borderRadius: "50px",
                              objectFit: "cover",
                              // borderBottomLeftRadius: "20px",
                              // position: "sticky",
                              // borderTopRightRadius: "4px",
                            }}
                            onClick={() => deleteFile(i)}
                          >
                            <i class="fas fa-times"></i>
                          </span>
                        </Fragment>
                      );
                    })}
              </div>
            </div>{" "}
            {/* <input
              type="file"
              disabled={file.length === 5}
              className="form-control"
              onChange={uploadSingleFile}
              multiple
            /> */}
            <div className="col-sm-12 col-md-12 col-lg-12 col-12">
              <div className="single-input-inner style-bg-border">
                <label htmlFor="imageUpload">
                  Ownership Documents
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  // type="file"
                  // className="form-control"
                  // onChange={(e) => {
                  //   setOwnershipDoc(e.target.files[0]);
                  // }}
                  className="btn btn-base"
                  type="file"
                  id="imageUpload"
                  onChange={(e) => {
                    imageUploadOwnershipDoc(e);
                  }}
                  ref={fileInputRef}
                />
                {ownershipDoc?.length === 0
                  ? ""
                  : ownershipDoc?.map((singleProperty, i) => {
                      return (
                        <Fragment key={singleProperty}>
                          <img
                            style={{
                              marginLeft: "10px",
                              marginTop: "20px",
                              borderRadius: "10px",
                              // border: "1px solid #5ba600",
                              // padding: "2px",
                            }}
                            src={
                              singleProperty.hasOwnProperty("path")
                                ? `${baseUrl}/${singleProperty.path}`
                                : URL.createObjectURL(singleProperty)
                            }
                            width={220}
                            height={140}
                            alt=""
                          />
                        </Fragment>
                      );
                    })}
              </div>
            </div>
            {listingType === "Edit" && ownershipDoc != "NA" && (
              <>
                <div className="col-lg-12 col-12 my-3">
                  <h6 className="label">Download Ownership Document and see</h6>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDownloadPDF(ownershipDoc)}
                  >
                    Download
                  </button>
                </div>
              </>
            )}
            <div className="col-sm-12 col-md-12 col-lg-12 col-12">
              <div className="single-input-inner style-bg-border">
                <label htmlFor="imageUpload">
                  Upload Driver License
                  <span style={{ color: "red" }}>*</span>
                </label>
                {/* <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setDriverLicence(e.target.files[0]);
                  }}
                /> */}
                <input
                  className="btn btn-base"
                  type="file"
                  id="imageUpload"
                  onChange={(e) => {
                    imageUploadDriverLicence(e);
                  }}
                  ref={fileInputRef}
                />
                {driverLicence?.length === 0
                  ? ""
                  : driverLicence?.map((singleProperty, i) => {
                      return (
                        <Fragment key={singleProperty}>
                          <img
                            style={{
                              marginLeft: "10px",
                              marginTop: "20px",
                              borderRadius: "10px",
                              // border: "1px solid #5ba600",
                              // padding: "2px",
                            }}
                            src={
                              singleProperty.hasOwnProperty("path")
                                ? `${baseUrl}/${singleProperty.path}`
                                : URL.createObjectURL(singleProperty)
                            }
                            width={220}
                            height={140}
                            alt=""
                          />
                        </Fragment>
                      );
                    })}
              </div>
            </div>
            {listingType === "Edit" && driverLicence != "NA" && (
              <>
                <div className="col-lg-12 col-12 my-3">
                  <h6>Download Driver License file and see</h6>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDownloadPDF(driverLicence)}
                  >
                    Download
                  </button>
                </div>
              </>
            )}
          </div>
        );
      // ....................................DES & HOUSE-TIMING & PAY-NOW(functionality)........................................//
      case 6:
        return (
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-12 mt-4 mb-4">
              <h4>Description</h4>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-12 ">
              <label className="single-input-inner style-bg-border">
                <textarea
                  value={des}
                  placeholder="Description"
                  onChange={(e) => {
                    setDes(e.target.value);
                  }}
                />
              </label>
            </div>
            <>
              {" "}
              {timing.map((data, index) => (
                <Fragment key={index}>
                  <div className="col-sm-12 col-md-12 col-lg-2 col-12 ">
                    <label className="single-input-inner style-bg-border">
                      <h5 className="label">
                        Selecting Date
                        <span style={{ color: " #dad6d6" }}>-optional</span>
                      </h5>
                      <input
                        type="date"
                        placeholder="Selecting Date"
                        value={data?.date}
                        onChange={(e) => upDate(index, e.target.value)}
                      />
                    </label>
                  </div>{" "}
                  <div className="col-sm-12 col-md-12 col-lg-2 col-12">
                    <div className="single-select-inner style-bg-border">
                      <h5 className="label">
                        Selecting Day
                        <span style={{ color: " #dad6d6" }}>-optional</span>
                      </h5>
                      <Select
                        styles={customStyles_}
                        options={forDate}
                        onChange={(e) => upDay(index, e.value)}
                        defaultValue={forDate.filter(
                          ({ value }) => value === data?.day
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-2 col-12 ">
                    <label className="single-input-inner style-bg-border">
                      <h5 className="label">
                        Starting Time
                        <span style={{ color: " #dad6d6" }}>-optional</span>
                      </h5>
                      <input
                        type="time"
                        placeholder="Starting Time"
                        value={data?.opening}
                        onChange={(e) => upStarting(index, e.target.value)}
                      />
                    </label>
                  </div>{" "}
                  <div className="col-sm-12 col-md-12 col-lg-2 col-12 ">
                    <label className="single-input-inner style-bg-border">
                      <h5 className="label">
                        Closing Time
                        <span style={{ color: " #dad6d6" }}>-optional</span>
                      </h5>
                      <input
                        type="time"
                        placeholder="Closing Time"
                        value={data?.closing}
                        onChange={(e) => upClosing(index, e.target.value)}
                      />
                    </label>
                  </div>{" "}
                  <div className="col-sm-3 col-md-12 col-lg-3 col-12 ">
                    <label className="single-input-inner style-bg-border">
                      <h5 className="label"></h5>
                      <button
                        style={{
                          height: "46px",
                          width: "40px",
                          borderRadius: "4px",
                          marginTop: "17px",
                          // borderRadius: "50px",
                          backgroundColor: "transparent",
                          objectFit: "cover",
                          border: "1px solid #5ba600",
                        }}
                        onClick={addTiming}
                      >
                        +
                      </button>
                      {data?.timeId == 1 ? (
                        ""
                      ) : (
                        <button
                          style={{
                            height: "46px",
                            width: "40px",
                            marginLeft: "5px",
                            marginTop: "17px",

                            borderRadius: "4px",
                            backgroundColor: "transparent",
                            objectFit: "cover",
                            border: "1px solid red",
                          }}
                          onClick={() => delTiming(data?.timeId)}
                        >
                          -
                        </button>
                      )}
                    </label>
                  </div>
                </Fragment>
              ))}
            </>

            <div className="col-md-6 col-12">
              <div className="mb-4 float-left"></div>
            </div>

            <Checkout
              propertyId={propertyId}
              buildingType={listingByType}
              newStatus={newStatus}
              setNewStatus={setNewStatus}
              handleClose={handleClose}
              payPrice={payPrice}
              reload={reload}
            />
          </div>
        );
      default:
        throw new Error("Unknown step");
    }
  }
  return (
    <>
      <div className="add-property-area pd-top-120">
        <div className="container">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <h2 style={{ textAlign: "center" }}>
              {" "}
              {locations.pathname == "/add-property/rent"
                ? "Add Property"
                : "Update Property"}
            </h2>
          </div>

          <form encType="multipart/form-data">
            <div className="property-form-grid">
              <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                {/* <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = (
                        <Typography variant="caption"></Typography>
                      );
                    }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    // return (

                    //   // <Step key={label} {...stepProps}>
                    //   //   <StepLabel {...labelProps}>{label}</StepLabel>
                    //   // </Step>
                    // );
                  })}
                </Stepper> */}
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      {/* {locations.pathname == "/add-property/Add/null"
                        ? "Property is created"
                        : "property is Updated"} */}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      {getStepContent(activeStep)}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      {isStepOptional(activeStep) && (
                        <Button
                          color="inherit"
                          onClick={handleSkip}
                          sx={{ mr: 1 }}
                        >
                          Skip
                        </Button>
                      )}
                      {activeStep === steps.length - 1 ? (
                        <button
                          className="btn btn-danger"
                          onClick={(e) => handleSubmit(e)}
                        >
                          {loading ? (
                            <i
                              className="fa fa-spinner fa-spin"
                              style={{ fontSize: "15px", marginRight: "5px" }}
                            ></i>
                          ) : locations.pathname == "/add-property/rent" ? (
                            "Pay now"
                          ) : (
                            "Updated"
                          )}
                        </button>
                      ) : (
                        <Button onClick={handleNext}>Next</Button>
                      )}

                      {/* <button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </button> */}
                    </Box>
                  </React.Fragment>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPropertyRent;
