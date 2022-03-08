import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "config/baseUrl";
import DataTable from "react-data-table-component";

import SplashScreen from "components/SplashScreen";
import { customStyles } from "components/CustomStyles";

import {
  Button,
  Grid,
  useColorModeValue,
  Box,
  Heading,
  Text,
  Stack,
  Image,
  GridItem,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
const Blog = () => {
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const [blogData, setBlogData] = useState({});
  const [blogModal, setBlogModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [offset, setOffset] = React.useState(0);

  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const btnRef = useRef();

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const showBogModal = (blogItem) => {
    setBlogModal(true);
    setBlogData(blogItem);
  };

  const closeBlogModal = () => {
    setBlogModal(false);
  };

  const getData = async () => {
    const token = localStorage.getItem("auth-token");
    await fetch(`${baseUrl}/api/contact`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res data for contact ====", res.data);
        setLoading(false);
        setContact(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  if (loading) {
    return <SplashScreen />;
  }
  console.log("contact   ========== ", contact);
  const columns = [
    {
      name: "Company",
      selector: "company",
      sortable: true,
      width: "190px",
      cell: (row, index) => <p>{row?.company}</p>,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      width: "270px",
      cell: (row, index) => <p>{row?.name}</p>,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      width: "270px",
      cell: (row, index) => <p>{row?.email}</p>,
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
      name: "message",
      selector: "message",
      sortable: true,
      width: "160px",
      cell: (row, index) => <p>{row?.message}</p>,
    },
    ,
  ];
  return (
    <Box marginTop="40px">
      <Flex>
        {loading ? (
          <center>
            <SplashScreen />
          </center>
        ) : (
          <Box marginTop="4">
            <DataTable
              paginationDefaultPage={offset === 0 ? 1 : offset}
              columns={columns}
              data={contact}
              customStyles={customStyles}
              fixedHeader
              onChangePage={(page) => setOffset(page)}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Blog;
