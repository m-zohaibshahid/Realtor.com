import React, { useState, useEffect, useRef } from "react";
import Edit from "../Edit";
import Create from "../Create";
import { GET_RENT_PROPERTY } from "../../../reducers/propertyReducer";
import { baseUrl } from "../../../config/baseUrl";
import SplashScreen from "components/SplashScreen";
import { useDispatch, useSelector } from "react-redux";
import View from "../View";
import Delete from "./Delete";
import UpdateStatus from "../updateStatus";
import Rent from "./RentProperty";
import New from "./newProperty";
import img from "assets/img/location.jpg";

import {
  Button,
  Grid,
  useColorModeValue,
  Box,
  Spacer,
  Heading,
  Image,
  GridItem,
  useDisclosure,
  Badge,
  IconButton,
  Flex,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import {
  ViewIcon,
  DeleteIcon,
  InfoIcon,
  EditIcon,
  ArrowUpDownIcon,
} from "@chakra-ui/icons";
import Search from "../../SearchFilter/Filters";
const ForRent = () => {
  const dispatch = useDispatch();
  const [rent, setRent] = useState([]);
  const [loading, setLoading] = useState(false);
  const { RentProperty } = useSelector((state) => state.property);
  const [propertyStatus, setPropertyStatus] = useState("");
  const [newStatus, setNewStatus] = useState(false);
  const [propertyId, setPropertyId] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [propertyData, setPropertyData] = useState({});
  const [propertyModal, setPropertyModal] = useState(false);
  const [editPropertyModal, setEditPropertyModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [statusModal, setStatusModal] = useState("");
  const [listingType, setListingType] = useState("Rent");
  const [onButtonPress, setOnButtonPress] = useState("");
  const btnRef = useRef();

  const handleClose = () => setNewStatus(false);
  const handleShow = (pid, pstatus) => {
    setNewStatus(true);
    setPropertyStatus(pstatus);
    setPropertyId(pid);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const getData = async () => {
    await dispatch(GET_RENT_PROPERTY());
    setLoading(false);
  };
  const setData = async () => {
    await setRent(RentProperty);
  };
  useEffect(() => {
    setData();
  }, [RentProperty]);

  const showPropertyModal = (propertyItem) => {
    setPropertyModal(true);
    setPropertyData(propertyItem);
  };
  const showStatusModal = (pid, pstatus) => {
    setStatusModal(true);
    setPropertyStatus(pstatus);
    setPropertyId(pid);
  };

  const closePropertyModal = () => {
    setPropertyModal(false);
  };
  const closeStatusModal = () => {
    setStatusModal(false);
  };
  const EditPropertyModal = (propertyItem) => {
    onOpen();
    setPropertyData(propertyItem);
    setOnButtonPress("Edit");
  };

  const closeEditPropertyModal = () => {
    setEditPropertyModal(false);
  };

  //   Delete component call
  const Submit = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const reloadData = () => {
    getData();
  };

  console.log("on press buttion status", onButtonPress);
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

  if (loading) {
    return <SplashScreen />;
  }

  const handleAddButton = () => {
    onOpen();
    setOnButtonPress("Add");
  };

  return (
    <Box marginTop="70px">
      {/* <Grid templateColumns="repeat(4, 1fr)" gap={4} my={12}> */}

      {/* <Box width={"100%"} mb="1em">
        <Search />
      </Box> */}
      <SimpleGrid columns={{ sm: 1, md: 1, xl: 2 }}>
        <GridItem colSpan={2} h="10" />
        <GridItem colStart={4} colEnd={6} h="10">
          <Spacer />
          <Box>
            <Button
              bg="teal.300"
              hover="teal.400"
              color="white"
              fontSize="xs"
              type="button"
              ref={btnRef}
              onClick={handleAddButton}
              colorScheme="teal"
            >
              Add New Property
            </Button>
            {/* <Filter /> */}
          </Box>
        </GridItem>
      </SimpleGrid>

      {rent?.length > 0 ? (
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }}>
          {rent?.map((property, index) => (
            // property?.propertyStatus !== "approved" ? (
            <>
              <Box
                maxW="sm"
                overflow="hidden"
                w={"full"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                my={2}
              >
                <Box position="absolute" mt={2} ml={2}>
                  <Badge variant="solid" colorScheme="blue" ml={1}>
                    For {property?.buildingType}
                  </Badge>
                </Box>
                <Image
                  src={`${baseUrl}/${property?.images?.[0]?.path}`}
                  alt={property.imageAlt}
                  layout="fill"
                  object-fit="cover"
                  h={"250px"}
                  w={"415px"}
                />

                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    {/* Payment Verify Status */}
                    <Badge
                      colorScheme={
                        property?.paymentVerified === "paid"
                          ? "teal"
                          : property?.paymentVerified === "unpaid"
                          ? "red"
                          : null
                      }
                    >
                      {property?.paymentVerified}
                    </Badge>
                    {/* Property Status Badge */}
                    <Badge
                      colorScheme={
                        property?.propertyStatus === "pending"
                          ? "purple"
                          : property?.propertyStatus === "disapproved"
                          ? "red"
                          : "teal"
                      }
                      ml={1}
                    >
                      {property?.propertyStatus}
                    </Badge>
                    {/* Bedroom and Bathroom section */}
                  </Box>
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    <Flex>
                      <Box mt="1">
                        <Image src={img} alt="img" h={"15px"} />
                      </Box>
                      <Box
                        marginRight={"5px"}
                        fontSize="20px"
                        fontWeight="bold"
                      >
                        {property?.location}
                      </Box>
                    </Flex>
                  </Box>
                  <Box
                    fontSize="20px"
                    fontWeight="bold"
                    mt="1"
                    color={"#0069D9"}
                  >
                    ${property?.priceOfProperty}
                    <Box as="span" color="gray.600">
                      CND
                    </Box>
                  </Box>{" "}
                  <Box fontSize="20px" fontWeight="bold">
                    {property?.houseType}
                  </Box>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    // ml="2"
                  >
                    {property?.bedrooms} beds &bull; {property?.bathrooms} baths
                  </Box>
                  <Box display="flex" mt="2" alignItems="center">
                    <ViewIcon />
                    <Box as="span" ml="1" color="gray.600" fontSize="sm">
                      {property?.propertyViewed} views
                    </Box>
                    <Spacer />
                    <Box ml="1">
                      <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Call Sage"
                        fontSize="20px"
                        icon={<EditIcon />}
                        onClick={() => {
                          EditPropertyModal(property);
                        }}
                      />
                    </Box>
                    <Box ml={1}>
                      <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Call Sage"
                        fontSize="20px"
                        icon={<DeleteIcon />}
                        onClick={() => Submit(property?._id)}
                      />
                    </Box>
                    <Box ml={1}>
                      <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Call Sage"
                        fontSize="20px"
                        icon={<ViewIcon />}
                        onClick={() => showPropertyModal(property)}
                      />
                    </Box>
                    <Box ml={1}>
                      <IconButton
                        variant="outline"
                        colorScheme="blue"
                        aria-label="Call Sage"
                        fontSize="20px"
                        icon={<ArrowUpDownIcon />}
                        onClick={() =>
                          showStatusModal(
                            property?._id,
                            property?.propertyStatus
                          )
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <View
                isOpen={propertyModal}
                onClose={closePropertyModal}
                item={propertyData}
              />
              <UpdateStatus
                propertyId={propertyId}
                status={propertyStatus}
                setNewStatus={setNewStatus}
                isOpen={statusModal}
                onClose={closeStatusModal}
                btnRef={btnRef}
                reloadData={reloadData}
              />
            </>
          ))}
        </SimpleGrid>
      ) : (
        <Box textAlign="center" py={10} px={6}>
          <InfoIcon boxSize={"50px"} color={"blue.500"} />
          <Heading as="h4" size="sm" mt={6} mb={2}>
            No Record Found!
          </Heading>
        </Box>
      )}
      {onButtonPress === "Add" && (
        <Create
          reloadData={reloadData}
          isOpen={isOpen}
          onClose={onClose}
          btnRef={btnRef}
          listingType={listingType}
          onButtonPress="Add"
          item={null}
        />
      )}
      {onButtonPress === "Edit" && (
        <Create
          reloadData={reloadData}
          isOpen={isOpen}
          onClose={onClose}
          btnRef={btnRef}
          listingType={listingType}
          onButtonPress="Edit"
          item={propertyData}
        />
      )}
      {/* <Create
          reloadData={reloadData}
          isOpen={isOpen}
          onClose={onClose}
          btnRef={btnRef}
          listingType={listingType}
        /> */}
      {/* <Edit
        isOpen={editPropertyModal}
        onClose={closeEditPropertyModal}
        item={propertyData}
        reloadData={reloadData}
        btnRef={btnRef}
      /> */}
      {deleteModal && (
        <Delete
          setDeleteModal={setDeleteModal}
          reloadData={reloadData}
          id={deleteId}
        />
      )}
    </Box>
  );
};

export default ForRent;
