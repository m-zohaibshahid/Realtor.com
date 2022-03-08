import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Edit from "./BLogEdit";
import Create from "./BlogCreate";
import { baseUrl } from "../../config/baseUrl";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SplashScreen from "components/SplashScreen";
import View from "./View";

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
} from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
const Blog = () => {
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const [blogData, setBlogData] = useState({});
  const [blogModal, setBlogModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    await fetch(`${baseUrl}/blog/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res data", res.data);
        setLoading(false);
        setBlog(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const deleteItems = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("auth-token");
    await fetch(`${baseUrl}/blog/remove/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res data", res.data);
        setLoading(false);
        reloadData();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const Submit = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this permanently?.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteItems(id),
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
    });
  };

  const reloadData = () => {
    // here call api and save data in setRent
    getData();
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Box marginTop="40px">
      <Grid templateColumns="repeat(4, 1fr)" gap={4} my={12}>
        <GridItem colSpan={2} h="10" />
        <GridItem colStart={4} colEnd={6} h="10">
          <Box my={8}>
            <Button
              ref={btnRef}
              onClick={onOpen}
              bg="teal.300"
              w="50%"
              p="8px 32px"
              mb={5}
              _hover="teal.300"
              color="white"
              fontSize="xs"
              type="button"
            >
              Add New Blog
            </Button>
          </Box>
        </GridItem>
      </Grid>

      {blog?.length > 0 ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {blog?.map((item, index) => (
            <>
              <Box
                maxW={"445px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                p={6}
                overflow={"hidden"}
                my={2}
              >
                <Box
                  h={"155px"}
                  bg={"gray.100"}
                  mt={-6}
                  mx={-6}
                  mb={6}
                  pos={"relative"}
                >
                  <Image
                    src={`${baseUrl}/${item?.images?.[0]?.path}`}
                    alt={item.imageAlt}
                    layout="fill"
                    object-fit="cover"
                    h={"170px"}
                    w={"445px"}
                  />
                </Box>
                <Stack>
                  <Text
                    color={"green.500"}
                    textTransform={"uppercase"}
                    fontWeight={800}
                    fontSize={"sm"}
                  >
                    Blog
                  </Text>
                  <Heading
                    color={useColorModeValue("gray.700", "white")}
                    fontSize={"2xl"}
                    fontFamily={"body"}
                  >
                    {item.title}
                  </Heading>
                  <Text color={"gray.500"}>
                    {item.description.substring(0, 54)}
                  </Text>
                </Stack>

                <Stack mt={3} direction={"row"} spacing={4} align={"center"}>
                  <Edit item={item} reloadData={reloadData} />
                  <Button
                    bg="transparent"
                    borderRadius="15px"
                    border="2px solid"
                    borderColor={borderColor}
                    alignItem="center"
                    onClick={() => Submit(`${item?._id}`)}
                  >
                    <DeleteIcon />
                  </Button>

                  <Button
                    bg="transparent"
                    borderRadius="15px"
                    border="2px solid"
                    borderColor={borderColor}
                    alignItem="center"
                    onClick={() => showBogModal(item)}
                  >
                    <ViewIcon />
                  </Button>
                </Stack>
              </Box>
              <View
                isOpen={blogModal}
                onClose={closeBlogModal}
                item={blogData}
              />
            </>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={10} px={6}>
          <InfoIcon boxSize={"50px"} color={"blue.500"} />
          <Heading as="h4" size="sm" mt={6} mb={2}>
            No Record Found!
          </Heading>
        </Box>
      )}
      <Create
        reloadData={reloadData}
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
      />
      {/* <View isOpen={blogwModal} onClose={closeBlogModal} btnRef={btnRef} /> */}
    </Box>
  );
};

export default Blog;
