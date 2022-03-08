import { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-multiple-select-dropdown-lite/dist/index.css";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useColorModeValue,
  Select,
  Button,
  Drawer,
  Divider,
  Text,
  Grid,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Textarea,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Box,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import axios from "axios";
import { CloseIcon } from "@chakra-ui/icons";
import { baseUrl } from "../../config/baseUrl";
import { VscFilePdf } from "react-icons/vsc";
import { PropertyAPI } from "../../helpers/property";

toast.configure();

function Create(props) {
  const {
    reloadData,
    isOpen,
    onClose,
    btnRef,
    listingType,
    onButtonPress,
    item,
  } = props;
  console.log("props==========", props);
  const { singleProperty } = useSelector((state) => state.property);

  useEffect(() => {
    if (onButtonPress === "Add") {
      setType("POST");
      setBuildingType(listingType);
    } else if (onButtonPress === "Edit") {
      console.log("itemmmmmmmmmmm", item);
      console.log(
        "rooommmmmmmmmmm==================>",
        singleProperty?.roomDimension
      );
      console.log(
        "rooommmmmmmmmmm==================>",
        singleProperty?.houseTiming
      );
      setType("PUT");
      setLocation(item?.location);
      setCity(item?.city);
      setCommunity(item?.community);
      setDateForRent(item?.dateForRent);
      setYearBuild(item?.yearBuild);
      setParkingSpots(item?.parkingSpots);
      setBedrooms(item?.bedrooms);
      setFloors(item?.floors);
      setBathrooms(item?.bathrooms);
      setCoolingType(item?.coolingType);
      setRoofingType(item?.roofingType);
      setFirePlaces(item?.firePlaces);
      setFirePlaceFuel(item?.firePlacesFuel);
      setWaterType(item?.waterType);
      setHeatingType(item?.heatingType);
      setAppliances(item?.appliances);
      setExteriorConstruction(item?.exteriorConstruction);
      setHouseType(item?.houseType);
      setFrontType(item?.frontType);
      setBuildingType(item?.buildingType);
      setHeatingFuel(item?.heatingFuel);
      setDes(item?.des);
      setPriceOfProperty(item?.priceOfProperty);
      setImages(item?.images ? item?.images : []);
      setSiteAmenities(item?.siteAmenities);
      setConstructionMaterial(item?.constructionMaterial);
      setBasement(item?.basement);
      setFlooring(item?.flooring);
      setHomeAmenities(item?.homeAmenities);
      setRoomAmenities(item?.roomAmenities);
      setKitchenAmenities(item?.kitchenAmenities);
      setOwnershipDoc(item?.ownershipDoc);
      setDriverLicence(item?.driverLicence);
      setSquareFeet(item?.squareFeet);
      setID(item?._id);
      setNeighbouringAmenities(item?.neighbouringAmenities);
      setSewerType(item?.sewerType);
      setPropertyTax(item?.propertyTax);
      setPropertyTaxYear(item?.propertyTaxYear);
      setAssociationPOTLFee(item?.associationPOTLFee);
      setAssessmentAmount(item?.assessmentAmount);
      setAssessmentYear(item?.assessmentYear);
      RoomDimensionFunc(item?.roomDimension);
      HouseTimingFunc(item?.houseTiming);
      BathAmenitiesFunc(item?.bathAmenities);
      setExtraImages(item?.images ? item?.images : []);
    }
  }, [props?.isOpen]);
  const RoomDimensionFunc = (dataxx) => {
    console.log(" room sw==========>", dataxx);
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
    console.log(" house sw==========>", datax);
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
  const [des, setDes] = useState("");
  const [priceOfProperty, setPriceOfProperty] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [community, setCommunity] = useState("");
  const [dateForRent, setDateForRent] = useState("");
  const [yearBuild, setYearBuild] = useState("");
  const [parkingSpots, setParkingSpots] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [floors, setFloors] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [view, setView] = useState("");
  const [coolingType, setCoolingType] = useState("");
  const [roofingType, setRoofingType] = useState("");
  const [waterType, setWaterType] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [houseType, setHouseType] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [frontType, setFrontType] = useState("");
  const [siteAmenities, setSiteAmenities] = useState([]);
  const [constructionMaterial, setConstructionMaterial] = useState([]);
  const [basement, setBasement] = useState([]);
  const [flooring, setFlooring] = useState([]);
  const [homeAmenities, setHomeAmenities] = useState([]);
  const [roomAmenities, setRoomAmenities] = useState([]);
  const [kitchenAmenities, setKitchenAmenities] = useState([]);
  const [bathAmenities, setBathAmenities] = useState([]);
  const [buildingType, setBuildingType] = useState("");
  const [heatingFuel, setHeatingFuel] = useState("");
  const [ownershipDoc, setOwnershipDoc] = useState("");
  const [driverLicence, setDriverLicence] = useState("");
  const [imageCheck, setImageCheck] = useState(false);
  const [_id, setID] = useState("");
  const [newStatus, setNewStatus] = useState(false);
  const [type, setType] = useState("");
  const [appliances, setAppliances] = useState([]);
  const [exteriorConstruction, setExteriorConstruction] = useState([]);
  const [neighbouringAmenities, setNeighbouringAmenities] = useState([]);
  const [firePlaces, setFirePlaces] = useState("");
  const [firePlaceFuel, setFirePlaceFuel] = useState("");
  const [sewerType, setSewerType] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [propertyTaxYear, setPropertyTaxYear] = useState("");
  const [associationPOTLFee, setAssociationPOTLFee] = useState("");
  const [assessmentAmount, setAssessmentAmount] = useState("");
  const [assessmentYear, setAssessmentYear] = useState("");
  const [extraImages, setExtraImages] = useState([]);

  const [roomDimensions, setRoomDimensions] = useState([
    {
      roomId: 1,
      attachBathRoom: "",
      dimensions: "",
      levels: "",
    },
  ]);
  const [timing, setTiming] = useState([
    {
      timeId: 1,
      day: "",
      closing: "",
      opening: "",
      date: "",
    },
  ]);
  console.log("view", view);
  const handleClose = () => setNewStatus(false);
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
  const Basement = [
    { label: "Finished", value: "Finished" },
    { label: "Unfinished", value: "Unfinished" },
  ];
  const Appliances = [
    { label: "Oven", value: "Oven" },
    { label: "Dishwasher", value: "Dishwasher" },
    { label: "Dryer", value: "Dryer" },
    { label: " Microwave", value: " Microwave" },
    { label: " Refrigerator", value: " Refrigerator" },
    { label: "Stove", value: "Stove" },
    { label: "Washer", value: "Washer" },
    { label: " Hood Fan", value: " Hood Fan" },
    {
      label: listingType === "Rent" ? "Wall Oven" : null,
      value: listingType === "Rent" ? "Wall Oven" : null,
    },
    {
      label: listingType === "Rent" ? "CookTop" : null,
      value: listingType === "Rent" ? "CookTop" : null,
    },
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
    { label: "Adobe", value: "Adobe" },
    { label: "Brick", value: "Brick" },
    { label: "Concrete Block", value: "Concrete Block" },
    { label: "Log", value: "Log" },
    { label: "Metal", value: "Metal" },
    { label: "Stone", value: "Stone" },
    { label: "Straw", value: "Straw" },
    { label: "Wood", value: "Wood" },
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
  const ExteriorConstruction = [
    { label: "Brick", value: "Brick" },
    { label: " Siding", value: "Siding" },
    { label: "Vinyl", value: "Vinyl" },
  ];
  const NeighbouringAmenities = [
    { label: "Playground Nearby", value: "Playground Nearby" },
    { label: " Public Transit Nearby", value: " Public Transit Nearby" },
    { label: " Recreation Nearby", value: " Recreation Nearby" },
    { label: "Shopping Nearby", value: "Shopping Nearby" },
    { label: "Trail", value: "Trail" },
  ];

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

  // -----Home Construction Material Method----
  const handleRoomAmenities = (val) => {
    setRoomAmenities(val);
  };

  // -----Site Amenities Method----
  const handleKitchenAmenities = (val) => {
    setKitchenAmenities(val);
  };
  // -----Home Construction Material Method----
  const handleBathRoomAmenities = (val) => {
    setBathAmenities(val);
  };
  // ----Appliance Method----

  const handleAppliances = (val) => {
    setAppliances(val);
  };

  // ----Exterior Construction Method----

  const handleExteriorConstruction = (val) => {
    setAppliances(val);
  };
  // ----Neighbouring Amenities Method----
  const handleNeighbouringAmenities = (val) => {
    setNeighbouringAmenities(val);
  };

  // -----Image Input Method----
  const imageUploadHandler = (e) => {
    let dumpMedia = [...images];
    console.log("object", ...e.target.files);
    if (images.length < 25) {
      dumpMedia.push(...e.target.files);
      setImages(dumpMedia);
      setImageCheck(true);
    }
  };

  // -----BEGIN: Property Add API Call------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const yes = {
      images,
      priceOfProperty,
      location,
      city,
      community,
      dateForRent,
      yearBuild,
      bedrooms,
      floors,
      bathrooms,
      ownershipDoc,
      driverLicence,
      roomDimensions,
      timing,
      squareFeet,
      houseType,
    };
    console.log("all fields", yes);

    if (
      !images ||
      // !priceOfProperty ||
      // !location ||
      // !city ||
      // !yearBuild ||
      // !bedrooms ||
      // !floors ||
      // !bathrooms ||
      // !ownershipDoc ||
      // !driverLicence ||
      // !buildingType ||
      !squareFeet
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
      formData.append("city", city);
      formData.append("community", community);
      formData.append("dateForRent", dateForRent);
      formData.append("yearBuild", yearBuild);
      formData.append("parkingSpots", parkingSpots);
      formData.append("bedrooms", bedrooms);
      formData.append("floors", floors);
      formData.append("bathrooms", bathrooms);
      formData.append("houseType", houseType);
      formData.append("view", view);
      formData.append("frontType", frontType);
      formData.append("siteAmenities", JSON.stringify(siteAmenities));
      formData.append("roomDimension", roomDimension);
      formData.append("houseTiming", houseTiming);
      formData.append(
        "exteriorConstruction",
        JSON.stringify(exteriorConstruction)
      );
      formData.append(
        "constructionMaterial",
        JSON.stringify(constructionMaterial)
      );
      formData.append("extraImages", JSON.stringify(extraImages));

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

      formData.append("coolingType", coolingType);
      formData.append("roofingType", roofingType);
      formData.append("heatingType", heatingType);
      formData.append("waterType", waterType);
      formData.append(
        "neighbouringAmenities",
        JSON.stringify(neighbouringAmenities)
      );
      formData.append("firePlaces", firePlaces);
      formData.append("firePlacesFuel", firePlaceFuel);
      formData.append("sewerType", sewerType);
      formData.append("propertyTax", propertyTax);
      formData.append("propertyTaxYear", propertyTaxYear);
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
      }
      let res;
      let headers;
      try {
        headers = {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("auth-token"),
        };

        if (type === "POST") {
          console.log("this is POST method");
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
          toast.success("Added Successfully", {
            autoClose: 3000,
            position: "top-center",
          });
          reloadData();
          setLoading(false);
          onClose();
          resetAllStates();
        } else {
          toast.error("Error", error, {
            autoClose: 3000,
            position: "top-center",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Error found", error, {
          autoClose: 3000,
          position: "top-center",
        });
        setLoading(false);
      }
    }
  };

  const resetAllStates = () => {
    setLocation("");
    setCity("");
    setCommunity("");
    setDateForRent("");
    setYearBuild("");
    setParkingSpots("");
    setBedrooms("");
    setFloors("");
    setBathrooms("");
    setView("");
    setCoolingType("");
    setRoofingType("");
    setWaterType("");
    setHeatingType("");
    setAppliances("");
    setExteriorConstruction("");
    setHouseType("");
    setFrontType("");
    setDes("");
    setPriceOfProperty("");
    setBuildingType("");
    setHeatingFuel("");
    setImages("");
    setSiteAmenities("");
    setConstructionMaterial("");
    setBasement("");
    setHomeAmenities("");
    setRoomAmenities("");
    setKitchenAmenities("");
    setBathAmenities("");
    setOwnershipDoc("");
    setDriverLicence("");
    setSquareFeet("");
    setNeighbouringAmenities("");
    setFirePlaces("");
    setFirePlaceFuel("");
    setSewerType("");
    setPropertyTax("");
    setPropertyTaxYear("");
    setAssociationPOTLFee("");
    setAssessmentAmount("");
    setAssessmentYear("");
  };

  // Download pdf file
  const handleDownloadPDF = (file) => {
    window.location.href = `${baseUrl}/${file?.[0]?.path}`;
  };

  // -----END: Property Add API Call--------
  // ------------------------Update Room Dimensions--------------------------
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
  // -----attach bathroom-----
  const upAttachBath = (index, value) => {
    console.log("room dimensionss.......................value", value);
    let oldDimensions = [...roomDimensions];
    oldDimensions[index].attachBathRoom = value;
    console.log("olddimesnsdfss========================>", oldDimensions);
    setRoomDimensions(oldDimensions);
  };
  // -----update dimension-----
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
  // -----update levels-----
  const upLevels = (index, value) => {
    let oldDimensions = [...roomDimensions];
    oldDimensions[index].levels = value;
    setRoomDimensions(oldDimensions);
  };
  // -----Delete room dimensions-----
  const delRoomDimensions = (id) => {
    let oldDimensions = [...roomDimensions];
    var NewDataForDb = oldDimensions.filter((task) => task.roomId !== id);
    setRoomDimensions(NewDataForDb);
  };
  // ------------------------Ending Update Room Dimensions--------------------------

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
  //.............Update date (Day)...............//

  const upDay = (index, value) => {
    let oldTiming = [...timing];
    oldTiming[index].day = value;
    setTiming(oldTiming);
  }; //.............Update date...............//

  const upDate = (index, value) => {
    let oldTiming = [...timing];
    oldTiming[index].date = value;
    setTiming(oldTiming);
  };
  //.......... Update Starting Time..............//
  const upStarting = (index, value) => {
    let oldTiming = [...timing];
    oldTiming[index].opening = value;
    setTiming(oldTiming);
  };
  //........... Update Closing Time .............//
  const upClosing = (index, value) => {
    let oldTiming = [...timing];
    oldTiming[index].closing = value;
    setTiming(oldTiming);
  };
  //.............. Delete Items .................//
  const delTiming = (id) => {
    let oldTiming = [...timing];
    var NewDataForDb = oldTiming.filter((task) => task.timeId !== id);
    setTiming(NewDataForDb);
  };
  //..........................Ending-Update date...............................//
  function deleteFile(e) {
    const s = images.filter((item, index) => index !== e);
    setImages(s);
    setExtraImages(s);
    console.log(s);
  }
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size={"sm"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <DrawerHeader>
              <Text fontWeight="bold">{`${onButtonPress} ${listingType} Property Details`}</Text>
            </DrawerHeader>
            <Box className="col-lg-12 col-12 my-3">
              <Text fontWeight="semibold" fontSize="22">
                Interior
              </Text>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>No of Bedrooms</FormLabel>
                <NumberInput min={0} defaultValue={bedrooms}>
                  <NumberInputField
                    type="number"
                    className="form-control"
                    placeholder="Enter No of Bedrooms"
                    value={bedrooms}
                    onChange={(e) => {
                      setBedrooms(e.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>No of Bathrooms</FormLabel>
                <NumberInput min={0} defaultValue={bathrooms} required>
                  <NumberInputField
                    className="form-control"
                    placeholder="Numbers of bathrooms"
                    value={bathrooms}
                    onChange={(e) => {
                      setBathrooms(e.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>No of Floors</FormLabel>
                <NumberInput min={0} defaultValue={floors}>
                  <NumberInputField
                    className="form-control"
                    placeholder="Level of floors"
                    value={floors}
                    onChange={(e) => {
                      setFloors(e.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>
                  {listingType == "Sale" ? "Property Price" : "Monthly Payment"}
                </FormLabel>
                <NumberInput min={0} defaultValue={priceOfProperty}>
                  <NumberInputField
                    className="form-control"
                    placeholder="Enter Price here"
                    value={priceOfProperty}
                    onChange={(e) => {
                      setPriceOfProperty(e.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>Plz complete this</FormErrorMessage>
              </FormControl>
            </Box>
            {listingType == "Sale" ? (
              ""
            ) : (
              <Box className="col-lg-12 col-12 my-3">
                <FormLabel>Pets</FormLabel>
                <Select
                  placeholder="Pets"
                  name="Pets"
                  className="form-control"
                  onChange={(e) => {
                    setFrontType(e.target.value);
                  }}
                >
                  <option
                    value="Yes"
                    // selected={item?.frontType === "River" ? true : false}
                  >
                    Yes
                  </option>
                  <option
                    value="No"
                    // selected={item?.frontType === "Ocean" ? true : false}
                  >
                    No
                  </option>
                </Select>
              </Box>
            )}
            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Basement</FormLabel>
              <MultiSelect
                onChange={handleBasement}
                options={Basement}
                defaultValue={basement}
              />
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Appliances</FormLabel>
              <MultiSelect
                onChange={handleAppliances}
                options={Appliances}
                defaultValue={appliances}
              />
            </Box>
            {/* <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Flooring</FormLabel>
              <MultiSelect
                onChange={handleFlooring}
                options={Flooring}
                defaultValue={flooring}
              />
            </Box> */}
            {/* <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Home Amenities</FormLabel>
              <MultiSelect
                onChange={handleHomeAmenities}
                options={HomeAmenities}
                defaultValue={homeAmenities}
              />
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Room Amenities</FormLabel>
              <MultiSelect
                onChange={handleRoomAmenities}
                options={RoomAmenities}
                defaultValue={roomAmenities}
              />
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Kitchen Amenities</FormLabel>
              <MultiSelect
                onChange={handleKitchenAmenities}
                options={KitchenAmenities}
                defaultValue={kitchenAmenities}
              />
            </Box> */}
            {/* <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Bathroom Amenities</FormLabel>
              <MultiSelect
                onChange={handleBathRoomAmenities}
                options={BathRoomAmenities}
                defaultValue={bathAmenities}
              />
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Basement</FormLabel>
              <MultiSelect
                onChange={handleBasement}
                options={Basement}
                defaultValue={basement}
              />
            </Box> */}
            {/* <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Appliances</FormLabel>
              <MultiSelect
                onChange={handleAppliances}
                options={Appliances}
                defaultValue={appliances}
              />
            </Box> */}
            <Divider />
            <Box className="col-lg-12 col-12 my-3">
              <Text fontWeight="semibold" fontSize="22">
                Exterior
              </Text>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </FormControl>
            </Box>{" "}
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Community</FormLabel>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Enter Community"
                  value={community}
                  onChange={(e) => {
                    setCommunity(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Area(sq ft.)</FormLabel>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Total Square Feet"
                  value={squareFeet}
                  onChange={(e) => {
                    setSquareFeet(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Property Location</FormLabel>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  value={location}
                  required
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Building For</FormLabel>
                <Select
                  className="form-control"
                  placeholder="Select Building For"
                  onChange={(e) => {
                    setBuildingType(e.target.value);
                  }}
                  disabled={true}
                >
                  <option
                    value="Sale"
                    selected={listingType === "Sale" ? true : false}
                  >
                    For Sale
                  </option>
                  <option
                    value="Rent"
                    selected={listingType === "Rent" ? true : false}
                  >
                    For Rent
                  </option>
                </Select>
              </FormControl>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>House Type</FormLabel>
                <Select
                  placeholder="--- House Type ---"
                  className="form-control"
                  onChange={(e) => {
                    setHouseType(e.target.value);
                  }}
                  required
                >
                  <option
                    value="Bungalow"
                    selected={item?.houseType === "Bungalow" ? true : false}
                  >
                    Bungalow
                  </option>
                  <option
                    value="TownHouse"
                    selected={item?.houseType === "TownHouse" ? true : false}
                  >
                    TownHouse
                  </option>
                  <option
                    value="Apartment"
                    selected={item?.houseType === "Apartment" ? true : false}
                  >
                    Apartment
                  </option>
                  <option
                    value="Semi-Detach"
                    selected={item?.houseType === "Semi-Detach" ? true : false}
                  >
                    Semi-Detach
                  </option>
                  <option
                    value="Multi Family"
                    selected={item?.houseType === "Multi Family" ? true : false}
                  >
                    Multi Family
                  </option>
                  <option
                    value="Single Family"
                    selected={
                      item?.houseType === "Single Family" ? true : false
                    }
                  >
                    Single Family
                  </option>
                  <option
                    value="Room"
                    selected={item?.houseType === "Room" ? true : false}
                  >
                    Room
                  </option>
                </Select>
              </FormControl>
            </Box>
            {/* <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Home Construction Material</FormLabel>
              <MultiSelect
                onChange={handleHomeConstruction}
                options={HomeConstruction}
                defaultValue={constructionMaterial}
              />
            </Box> */}
            <Divider />
            <Box className="col-lg-12 col-12 my-3">
              <Text fontWeight="semibold" fontSize="22">
                Utility Information
              </Text>
            </Box>
            {/* <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Number of Fireplaces</FormLabel>
                <NumberInput min={0} defaultValue={firePlaces}>
                  <NumberInputField
                    className="form-control"
                    placeholder="Enter Number Of Fireplaces"
                    value={firePlaces}
                    onChange={(e) => {
                      setFirePlaces(e.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box> */}
            {listingType == "Sell" ? (
              <>
                <Box className="col-lg-12 col-12 my-3">
                  <FormLabel> Fireplaces Fuel </FormLabel>
                  <Select
                    placeholder="--- Fireplaces Fuel ---"
                    name="firePlaceFuel"
                    className="form-control"
                    onChange={(e) => {
                      setFirePlaceFuel(e.target.value);
                    }}
                  >
                    <option
                      value="Wood"
                      selected={item?.firePlaceFuel === "Wood" ? true : false}
                    >
                      Wood
                    </option>
                    <option
                      value="Gas"
                      selected={item?.firePlaceFuel === "Gas" ? true : false}
                    >
                      Gas
                    </option>
                  </Select>
                </Box>
                <Box className="col-lg-12 col-12 my-3">
                  <FormLabel>Heating Description</FormLabel>
                  <Select
                    placeholder="--- Heating ---"
                    name="heating"
                    className="form-control"
                    onChange={(e) => {
                      setHeatingType(e.target.value);
                    }}
                  >
                    <option
                      value="Forced Air"
                      selected={
                        item?.heatingType === "Forced Air" ? true : false
                      }
                    >
                      Forced Air
                    </option>
                    <option
                      value="Air"
                      selected={item?.heatingType === "Air" ? true : false}
                    >
                      Air
                    </option>
                    <option
                      value="Furnace"
                      selected={item?.heatingType === "Furnace" ? true : false}
                    >
                      Furnace
                    </option>
                  </Select>
                </Box>
                <Box className="col-lg-12 col-12 my-3">
                  <FormLabel>Sewer Type</FormLabel>
                  <Select
                    placeholder="--- Water Supply ---"
                    name="water"
                    className="form-control"
                    onChange={(e) => {
                      setSewerType(e.target.value);
                    }}
                  >
                    <option
                      value="Sewer Connected"
                      selected={
                        item?.waterType === "Sewer Connected" ? true : false
                      }
                    >
                      Sewer Connected
                    </option>
                  </Select>
                </Box>
              </>
            ) : (
              ""
            )}
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Heating Fuel</FormLabel>
                <Select
                  className="form-control"
                  placeholder="Select Heating Fuel"
                  onChange={(e) => {
                    setHeatingFuel(e.target.value);
                  }}
                >
                  <option
                    value="natural gas"
                    selected={heatingFuel === "natural gas" ? true : false}
                  >
                    Natural gas
                  </option>
                </Select>
              </FormControl>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Air Conditioning Description</FormLabel>
              <Select
                placeholder="--- Cooling Type ---"
                name="coolingType"
                className="form-control"
                onChange={(e) => {
                  setCoolingType(e.target.value);
                }}
              >
                <option
                  value="Central air"
                  selected={item?.coolingType === "Central air" ? true : false}
                >
                  Central air
                </option>
              </Select>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Water Supply</FormLabel>
              <Select
                placeholder="--- Water Supply ---"
                name="water"
                className="form-control"
                onChange={(e) => {
                  setWaterType(e.target.value);
                }}
              >
                <option
                  value="Municipal Water"
                  selected={
                    item?.waterType === "Municipal Water" ? true : false
                  }
                >
                  Municipal Water
                </option>
                <option
                  value="Well"
                  selected={item?.waterType === "Well" ? true : false}
                >
                  Well
                </option>
              </Select>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Hydro Gas</FormLabel>
              <Select
                placeholder="--- Facilities ---"
                name="View"
                className="form-control"
                onChange={(e) => {
                  setView(e.target.value);
                }}
              >
                {/* <option
                  value="Oil"
                  // selected={item?.view === "Coast" ? true : false}
                >
                  Oil
                </option> */}
                <option
                  value="Gass"
                  // selected={item?.view === "City" ? true : false}
                >
                  Gas
                </option>
                <option
                  value="Electricity"
                  // selected={item?.view === "City" ? true : false}
                >
                  Electricity
                </option>
              </Select>
            </Box>
            <Divider />
            {listingType === "Sale" ? (
              <>
                <Box className="col-lg-12 col-12 my-3">
                  <Text fontWeight="semibold" fontSize="22">
                    Financial Information
                  </Text>
                </Box>
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Property Taxes</FormLabel>
                    <NumberInput min={0} defaultValue={propertyTax}>
                      <NumberInputField
                        className="form-control"
                        placeholder="Enter property tax"
                        value={propertyTax}
                        onChange={(e) => {
                          setPropertyTax(e.target.value);
                        }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Box>
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Property Tax Year</FormLabel>
                    <NumberInput min={0} defaultValue={propertyTaxYear}>
                      <NumberInputField
                        className="form-control"
                        placeholder="Enter property tax year"
                        value={propertyTaxYear}
                        onChange={(e) => {
                          setPropertyTaxYear(e.target.value);
                        }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Box>
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Association/POTL Fee</FormLabel>
                    <NumberInput min={0} defaultValue={associationPOTLFee}>
                      <NumberInputField
                        className="form-control"
                        placeholder="Enter property tax year"
                        value={associationPOTLFee}
                        onChange={(e) => {
                          setAssociationPOTLFee(e.target.value);
                        }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Box>{" "}
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Assessment Amount</FormLabel>
                    <NumberInput min={0} defaultValue={assessmentAmount}>
                      <NumberInputField
                        className="form-control"
                        placeholder="Enter property tax year"
                        value={assessmentAmount}
                        onChange={(e) => {
                          setAssessmentAmount(e.target.value);
                        }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Box>{" "}
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Assessment Year</FormLabel>
                    <NumberInput min={0} defaultValue={assessmentYear}>
                      <NumberInputField
                        className="form-control"
                        placeholder="Enter property tax year"
                        value={assessmentYear}
                        onChange={(e) => {
                          setAssessmentYear(e.target.value);
                        }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Box>
              </>
            ) : (
              ""
            )}
            <Divider />
            <Box className="col-lg-12 col-12 my-3">
              <Text fontWeight="semibold" fontSize="22">
                Exterior/Construction
              </Text>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>No of Garage Spaces</FormLabel>
                <NumberInput min={0} defaultValue={parkingSpots}>
                  <NumberInputField
                    className="form-control"
                    placeholder="Enter Number Of Parking Spot"
                    value={parkingSpots}
                    onChange={(e) => {
                      setParkingSpots(e.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Year Build</FormLabel>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Write Year Build"
                  value={yearBuild}
                  onChange={(e) => setYearBuild(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Roofing Type</FormLabel>
              <Select
                placeholder="--- Roofing Type ---"
                name="roofingType"
                className="form-control"
                onChange={(e) => {
                  setRoofingType(e.target.value);
                }}
              >
                <option
                  value="Metal Roof"
                  selected={item?.roofingType === "Metal Roof" ? true : false}
                >
                  Metal Roof
                </option>
                <option
                  value="Clay Tile"
                  selected={item?.roofingType === "Clay Tile" ? true : false}
                >
                  Clay Tile
                </option>
                <option
                  value="State"
                  selected={item?.roofingType === "State" ? true : false}
                >
                  State
                </option>
              </Select>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>Neighbouring Amenities</FormLabel>
              <MultiSelect
                onChange={handleNeighbouringAmenities}
                options={NeighbouringAmenities}
                defaultValue={neighbouringAmenities}
              />
            </Box>
            <Divider />
            <Box className="col-lg-12 col-12 my-3">
              <Text fontWeight="semibold" fontSize="22">
                Room Dimensions
              </Text>
            </Box>
            {roomDimensions.map((data, index) => (
              <Fragment key={index}>
                <Button
                  height={"46px"}
                  width={"60px"}
                  borderRadius={4}
                  backgroundColor={"transparent"}
                  objectFit={"cover"}
                  border={"1px solid #5ba600"}
                  onClick={addRoomDimensions}
                >
                  +
                </Button>
                {data?.roomId == 1 ? null : (
                  <Button
                    height={"46px"}
                    width={"60px"}
                    borderRadius={4}
                    // ml={25}
                    backgroundColor={"transparent"}
                    objectFit={"cover"}
                    border={"1px solid red"}
                    float={"right"}
                    onClick={() => delRoomDimensions(data?.roomId)}
                  >
                    -
                  </Button>
                )}
                {/* <Box className="col-lg-12 col-12 my-3">
                  <FormLabel>Attach Bathroom</FormLabel>
                  <Select
                    placeholder="--- Attach Bathroom ---"
                    name="attach"
                    className="form-control"
                    onChange={(e) => upAttachBath(index, e.target.value)}
                  >
                    <option
                      value="Yes"
                      selected={item?.attachBathRoom === "Yes" ? true : false}
                    >
                      Yes
                    </option>{" "}
                    <option
                      value="No"
                      selected={item?.attachBathRoom === "No" ? true : false}
                    >
                      No
                    </option>
                  </Select>
                </Box> */}
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Room Name</FormLabel>
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Room name"
                      value={data?.attachBathRoom}
                      onChange={(e) => upAttachBath(index, e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Dimensions</FormLabel>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Dimensions"
                      value={data?.dimensions}
                      onChange={(e) => upDimensions(index, e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Level</FormLabel>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Level"
                      value={data?.levels}
                      onChange={(e) => upLevels(index, e.target.value)}
                    />
                  </FormControl>
                </Box>
              </Fragment>
            ))}
            <Divider />
            <Box className="col-lg-12 col-12 my-3">
              <Text fontWeight="semibold" fontSize="22">
                Timings
              </Text>
            </Box>
            {timing.map((data, index) => (
              <Fragment key={index}>
                <Button
                  height={"46px"}
                  width={"60px"}
                  borderRadius={4}
                  backgroundColor={"transparent"}
                  objectFit={"cover"}
                  border={"1px solid #5ba600"}
                  onClick={addTiming}
                >
                  +
                </Button>
                {data?.timeId == 1 ? (
                  ""
                ) : (
                  <Button
                    height={"46px"}
                    width={"60px"}
                    borderRadius={4}
                    // ml={25}
                    backgroundColor={"transparent"}
                    objectFit={"cover"}
                    border={"1px solid red"}
                    float={"right"}
                    onClick={() => delTiming(data?.timeId)}
                  >
                    -
                  </Button>
                )}
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Selecting Date</FormLabel>
                    <Input
                      type="date"
                      className="form-control"
                      placeholder="Selecting Date"
                      value={data?.date}
                      onChange={(e) => upDate(index, e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box className="col-lg-12 col-12 my-3">
                  <FormLabel>Selecting Day</FormLabel>
                  <Select
                    placeholder="--- Selecting Day ---"
                    name="day"
                    className="form-control"
                    onChange={(e) => upDay(index, e.target.value)}
                  >
                    <option
                      value="Monday"
                      selected={item?.day === "Monday" ? true : false}
                    >
                      Monday
                    </option>{" "}
                    <option
                      value="Tuesday"
                      selected={item?.day === "Tuesday" ? true : false}
                    >
                      Tuesday
                    </option>{" "}
                    <option
                      value="Wednesday"
                      selected={item?.day === "Wednesday" ? true : false}
                    >
                      Wednesday
                    </option>{" "}
                    <option
                      value="Thursday"
                      selected={item?.day === "Thursday" ? true : false}
                    >
                      Thursday
                    </option>{" "}
                    <option
                      value="Friday"
                      selected={item?.day === "Friday" ? true : false}
                    >
                      Friday
                    </option>{" "}
                    <option
                      value="Saturday"
                      selected={item?.day === "Saturday" ? true : false}
                    >
                      Saturday
                    </option>
                    <option
                      value="Sunday"
                      selected={item?.day === "Sunday" ? true : false}
                    >
                      Sunday
                    </option>
                  </Select>
                </Box>
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Starting Time</FormLabel>
                    <Input
                      type="time"
                      className="form-control"
                      placeholder="Starting Time"
                      value={data?.opening}
                      onChange={(e) => upStarting(index, e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box className="col-lg-12 col-12 my-3">
                  <FormControl isRequired>
                    <FormLabel>Closing Time</FormLabel>
                    <Input
                      type="time"
                      className="form-control"
                      placeholder="Closing Time"
                      value={data?.closing}
                      onChange={(e) => upClosing(index, e.target.value)}
                    />
                  </FormControl>
                </Box>
              </Fragment>
            ))}
            {listingType == "Rent" ? (
              <Box className="col-lg-12 col-12 my-3">
                <FormControl isRequired>
                  <FormLabel>Date For Rent</FormLabel>
                  <Input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    value={dateForRent}
                    onChange={(e) => {
                      setDateForRent(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            ) : (
              ""
            )}
            <Divider />
            <Box className="col-lg-12 col-12 my-3">
              <Text fontWeight="semibold" fontSize="22">
                Upload Images
              </Text>
            </Box>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Property Images</FormLabel>
                <Input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    imageUploadHandler(e);
                  }}
                />
              </FormControl>
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={0} mt={4}>
              {images?.length === 0
                ? ""
                : images?.map((item, i) => (
                    <Fragment key={i}>
                      <img
                        style={{
                          marginLeft: "10px",
                          marginTop: "20px",
                          borderRadius: "10px",
                          border: "1px solid #0F52BA",
                          padding: "2px",
                        }}
                        src={
                          item.hasOwnProperty("path")
                            ? `${baseUrl}/${item.path}`
                            : URL.createObjectURL(item)
                        }
                        width={180}
                        height={110}
                        alt=""
                      />
                      <span
                        style={{
                          // bottom: "103px",
                          marginTop: "20px",
                          color: "#2f2f2f",
                          fontSize: "10px",
                          padding: "3px",
                          height: "30px",
                          width: "30px",
                          alignItems: "center",
                          borderRadius: "50px",
                          objectFit: "cover",
                        }}
                        onClick={() => deleteFile(i)}
                      >
                        <CloseIcon />
                      </span>
                    </Fragment>
                  ))}
            </Grid>
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Upload Property Ownership Documents</FormLabel>
                <Input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setOwnershipDoc(e.target.files[0]);
                  }}
                />
              </FormControl>
            </Box>
            {onButtonPress === "Edit" && ownershipDoc != "NA" && (
              <>
                <Box className="col-lg-12 col-12 my-3">
                  <FormLabel fontSize={12}>
                    Download Ownership Document and see
                  </FormLabel>
                  <Button
                    rightIcon={<VscFilePdf />}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleDownloadPDF(ownershipDoc)}
                  >
                    Download
                  </Button>
                </Box>
              </>
            )}
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Upload Driver License</FormLabel>
                <Input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setDriverLicence(e.target.files[0]);
                  }}
                />
              </FormControl>
            </Box>
            {onButtonPress === "Edit" && driverLicence != "NA" && (
              <>
                <Box className="col-lg-12 col-12 my-3">
                  <FormLabel fontSize={12}>
                    Download Driver License file and see
                  </FormLabel>
                  <Button
                    type="download"
                    rightIcon={<VscFilePdf />}
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleDownloadPDF(driverLicence)}
                  >
                    Download
                  </Button>
                </Box>
              </>
            )}
            <Box className="col-lg-12 col-12 my-3">
              <FormControl isRequired>
                <FormLabel>Enter Description</FormLabel>
                <Textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  placeholder="Enter Description here"
                  value={des}
                  onChange={(e) => {
                    setDes(e.target.value);
                  }}
                  rows="3"
                ></Textarea>
              </FormControl>
            </Box>
            {/* {description} */}
            <DrawerFooter>
              {loading ? (
                <Button isLoading colorScheme="teal" size="md" variant="solid">
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  colorScheme="teal"
                  size="md"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </DrawerFooter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Create;
