import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "config/baseUrl";
import DataTable from "react-data-table-component";

import SplashScreen from "components/SplashScreen";
import { customStyles } from "components/CustomStyles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Edit from "./Edit";

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
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { ViewIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
const Blog = () => {
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const [loading, setLoading] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const [payment, setPayment] = useState([]);
  const [data, setData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [offset, setOffset] = React.useState(0);
  const btnRef = useRef();

  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  const getData = async () => {
    const token = localStorage.getItem("auth-token");
    await fetch(`${baseUrl}/api/subscription/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res data for subbbb ====", res.data);
        setLoading(false);
        setPayment(res.data);
        console.log("paymentsssss......", payment);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const showStatusModal = (object) => {
    setData(object);
    setPayModal(true);
  };
  const closePayModal = () => {
    setPayModal(false);
  };
  const reloadData = () => {
    getData();
  };

  if (loading) {
    return <SplashScreen />;
  }
  const columns = [
    {
      name: "Rent",
      selector: "rent",
      sortable: true,
      width: "370px",
      cell: (row, index) => <p>{row?.rent}</p>,
    },
    {
      name: "Sale",
      selector: "sale",
      sortable: true,
      width: "370px",
      cell: (row, index) => <p>{row?.sale}</p>,
    },
    {
      name: "Action",
      //   selector: "sale",
      sortable: true,
      width: "170px",
      cell: (row) => {
        return (
          <>
            <IconButton
              variant="outline"
              colorScheme="teal"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<EditIcon />}
              onClick={() => showStatusModal(row)}
            />
            ;
          </>
        );
      },
    },
  ];
  //  <IconButton
  //    variant="outline"
  //    colorScheme="teal"
  //    aria-label="Call Sage"
  //    fontSize="20px"
  //    icon={<EditIcon />}
  //    onClick={() => EditPropertyModal(property)}
  //  />;
  return (
    <Box marginTop="90px">
      <Flex>
        {loading ? (
          <center>
            <SplashScreen />
          </center>
        ) : (
          <Card minHeight="200.5px">
            <CardBody>
              <Box marginTop="4">
                <DataTable
                  paginationDefaultPage={offset === 0 ? 1 : offset}
                  columns={columns}
                  data={payment}
                  customStyles={customStyles}
                  fixedHeader
                  onChangePage={(page) => setOffset(page)}
                />
              </Box>
            </CardBody>
          </Card>
        )}
      </Flex>
      <Edit
        isOpen={payModal}
        onClose={closePayModal}
        btnRef={btnRef}
        row={data}
        reloadData={reloadData}
      />
    </Box>
  );
};

export default Blog;
