import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Text,
  Flex,
  Grid,
  Heading,
  Badge,
} from "@chakra-ui/react";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "config/baseUrl";
import Carousel from "components/Property/Carousel";
import { useDispatch } from "react-redux";
import { customStyles } from "components/CustomStyles";
import DataTable from "react-data-table-component";
import { getTransactions } from "helpers/transaction";
import Description from "components/Property/Description";
import Feature from "components/Property/Feature";
toast.configure();

export default function View(props) {
  const { item } = props;
  console.log("itemsssssssssssssss in view", item);
  const finalRef = React.useRef();
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const [totalTransactions, setTotalTransactions] = React.useState(82);
  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);

  const data = [
    {
      priceOfProperty: `${item?.priceOfProperty}`,
      buildingType: `${item?.buildingType}`,
    },
  ];
  const columns = [
    {
      name: "Payer Name",
      selector: "",
      sortable: true,
      width: "190px",
      cell: (row, index) => (
        <p>
          {item?.transactionId?.details?.payer?.name?.given_name}{" "}
          {item?.transactionId?.details?.payer?.name?.surname}
        </p>
      ),
    },
    {
      name: "Payer Email",
      selector: "",
      sortable: true,
      width: "270px",
      cell: (row, index) => (
        <p>{item?.transactionId?.details?.payer?.email_address}</p>
      ),
    },
    // {
    //   name: "House Type",
    //   selector: "buildingType",
    //   sortable: true,
    //   width: "120px",
    //   //   cell: (row, index) => <p>{row?.customerId?._id}</p>,
    // },
    // {
    //   name: "Price of Property",
    //   selector: "priceOfProperty",
    //   sortable: true,
    //   width: "150px",
    //   // cell: (row, index) => <p>{row??.name}</p>,
    // },
    {
      name: "Payer Id",
      selector: "",
      sortable: true,
      width: "160px",
      cell: (row, index) => (
        <p>{item?.transactionId?.details?.payer?.payer_id}</p>
      ),
    },
    ,
    {
      name: "Merchant Id",
      selector: "",
      sortable: true,
      width: "160px",
      cell: (row, index) => (
        <p>
          {item?.transactionId?.details?.purchase_units[0]?.payee?.merchant_id}
        </p>
      ),
    },
    {
      name: "Transaction Date",
      selector: "",
      sortable: true,
      width: "170px",
      cell: (row, index) => (
        <p>{moment(item?.transactionId?.details?.create_time).format("lll")}</p>
      ),
    },
    {
      name: "Status",
      selector: "",
      sortable: true,
      width: "180px",
      // cell: (row, index) => <p>{item?.transactionId?.paymentVerified}</p>,
      cell: (row, index) => (
        <Badge
          textTransform="uppercase"
          colorScheme={
            item?.transactionId?.paymentVerified === "paid"
              ? "teal"
              : item?.transactionId?.paymentVerified === "unpaid"
              ? "red"
              : null
          }
        >
          {item?.transactionId?.paymentVerified}
        </Badge>
      ),
    },
  ];
  // const toggleFun = () => {
  //   setHide(!hide);
  //   dispatch(toggleButton(hide));
  // };
  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rent Property Details Page</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height={"600px"} width={"full"} overflow={"hidden"}>
              <Carousel images={item?.images} />
            </Box>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Description</Tab>
                <Tab>Property Features</Tab>
                <Tab>Amenities</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Description
                    bedrooms={item?.bedrooms}
                    bathrooms={item?.bathrooms}
                    squareFeet={item?.squareFeet}
                    email={item?.propertyBy?.email}
                    fname={item?.propertyBy?.fname}
                    lname={item?.propertyBy?.lname}
                    createdAt={item?.createdAt}
                    item={item}
                  />
                </TabPanel>
                <TabPanel>
                  {item?.buildingType == "Rent" ? (
                    <>
                      <Feature
                        title={`Monthly Payment`}
                        value={item?.priceOfProperty}
                        shades={null}
                      />
                      <Feature
                        title={`Pets`}
                        value={item?.frontType}
                        shades={null}
                      />
                      <Feature
                        title={`Hedro Gass`}
                        value={item?.View}
                        shades={null}
                      />
                    </>
                  ) : (
                    <Feature
                      title={` Property Price}`}
                      value={item?.priceOfProperty}
                      shades={null}
                    />
                  )}
                  <Feature
                    title="Building Type"
                    value={item?.buildingType}
                    shades={null}
                  />
                  <Feature
                    title="Property Location"
                    value={item?.location}
                    shades="blue.50"
                  />
                  <Feature
                    title="Property Style"
                    value={item?.floor}
                    shades={null}
                  />
                  <Feature
                    title="Year of construction"
                    value={item?.yearBuild}
                    shades="blue.50"
                  />
                  <Feature title="View Type" value="Stone" shades={null} />
                  <Feature
                    title="House Type"
                    value={item?.houseType}
                    shades="blue.50"
                  />
                  <Feature
                    title="Cooling Type"
                    value={item?.coolingType}
                    shades={null}
                  />
                  <Feature
                    title="Water Type"
                    value={item?.waterType}
                    shades="blue.50"
                  />
                  <Feature
                    title="Front Type"
                    value={item?.frontType}
                    shades={null}
                  />
                  <Feature
                    title="Heating Type"
                    value={item?.heatingType}
                    shades="blue.50"
                  />
                  <Feature
                    title="Heating Fuel"
                    value={item?.heatingFuel}
                    shades={null}
                  />
                  <Feature title="Parking Spots" value={2} shades="blue.50" />
                  <Feature
                    title="Cooling Type"
                    value={item?.coolingType}
                    shades={null}
                  />
                  <Text marginTop="1" ml={2} fontWeight={"700"}>
                    Room Dimensions
                  </Text>
                  {item?.roomDimension?.map((items, index) => (
                    <>
                      <Feature
                        title="Levels"
                        value={items?.levels}
                        shades={null}
                      />
                      <Feature
                        title="Dimensions"
                        value={items?.dimensions}
                        shades={null}
                        shades="blue.50"
                      />
                      <Feature
                        title="Attach Bathroom"
                        value={items?.attachBathRoom}
                        shades={null}
                      />
                      <Divider my={2} color={"transparent"} />
                    </>
                  ))}
                  <Text marginTop="1" ml={2} fontWeight={"700"}>
                    House Timing
                  </Text>
                  {item?.houseTiming?.map((items, index) => (
                    <>
                      <Feature title="Day" value={items?.day} shades={null} />
                      <Feature
                        title="Opening Time"
                        value={items?.Opening}
                        shades="blue.50"
                      />
                      <Feature
                        title="Closing Time"
                        value={items?.closing}
                        shades={null}
                      />
                      <Divider my={2} color={"transparent"} />
                    </>
                  ))}
                </TabPanel>
                <TabPanel>
                  {/* <Text mt={12}>ljsabc</Text> */}

                  <Feature
                    title="Appliances"
                    value={item?.appliances?.map(
                      (items, index) => items?.appliances?.value
                    )}
                    shades={null}
                  />

                  <Feature
                    title="Basement"
                    value={item?.basement?.map(
                      (items, index) => items?.basement?.value
                    )}
                    // value={item?.basement?.value}
                    shades="blue.50"
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
            {/* <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}> */}
            {/* <Flex> */}
            {/* {isLoading ? (
                  <center></center>
                ) : (
                  <Box marginTop="4">
                    <DataTable
                      paginationDefaultPage={offset === 0 ? 1 : offset}
                      columns={columns}
                      data={data}
                      customStyles={customStyles}
                      pagination
                      fixedHeader
                      paginationServer
                      paginationComponentOptions={{
                        noRowsPerPage: 10,
                      }}
                      onChangePage={(page) => setOffset(page)}
                      paginationTotalRows={totalTransactions}
                      expandableRows
                      onRowExpandToggled={(bol, row) => viewManageData(row)}
                      expandableRowExpanded={(row) => row._id === rowId}
                      expandableRowsComponent={
                        <ViewManage
                          manageData={manageData}
                          organizationData={organizationData}
                          manageLoading={manageLoading}
                        />
                      }
                    />
                  </Box>
                )} */}
            {/* </Flex> */}
            {/* </Box> */}
            {/* <Box my={8}></Box> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
