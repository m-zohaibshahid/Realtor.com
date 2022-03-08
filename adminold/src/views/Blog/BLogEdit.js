import { useState, useEffect, Fragment, useRef } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "config/baseUrl";

import {
  useColorModeValue,
  useDisclosure,
  Button,
  Drawer,
  Flex,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Grid,
  Box,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { MdEdit } from "react-icons/md";

export default function blogPostWithImage(props) {
  const { item, reloadData } = props;
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const [images, setImages] = useState([]);
  const [_id, setID] = useState("");
  const [des, setDes] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageCheck, setImageCheck] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  useEffect(() => {
    setTitle(item?.title);
    setDes(item?.description);
    setImages(item?.images ? item?.images : []);
    setID(item?._id);
  }, [item]);

  // -----Image Input Method----
  const imageUploadHandler = (e) => {
    let dumpMedia = [...images];
    if (images?.length < 5) {
      dumpMedia.push(...e.target.files);
      setImages(dumpMedia);
      setImageCheck(true);
    } else {
      toast.error("Only 5 images allowed!", {
        autoClose: 3000,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    var formData = new FormData();
    formData.append("description", des);
    formData.append("title", title);
    console.log("images object", imageCheck);
    if (imageCheck) {
      for (var x = 0; x < images?.length; x++) {
        formData.append("images", images[x]);
      }
    }

    try {
      const res = await axios.put(`${baseUrl}/blog/update/${_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("auth-token"),
        },
      });
      if (res?.data.message === "success") {
        toast.success("Added Successfully", {
          autoClose: 3000,
        });
        setLoading(false);
        reloadData();
      } else {
        toast.error("Error", {
          autoClose: 3000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("error catch wla", error);
      toast.error("Error", error, {
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  // -----END: Blog Add API Call-------- //

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        bg="transparent"
        borderRadius="15px"
        border="2px solid"
        borderColor={borderColor}
      >
        <MdEdit />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size="sm"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <DrawerHeader borderBottomWidth="1px">
              <Flex>
                <Box mt={1}>
                  <MdEdit />
                </Box>
                <Box ml={1}>Update Blog Here</Box>
              </Flex>
            </DrawerHeader>
            <Stack spacing="24px">
              <FormControl isRequired>
                <Grid templateColumns="repeat(1, 1fr)" gap={0} mt={4}>
                  <FormLabel htmlFor="blogTitle">Blog Title</FormLabel>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Title here"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Grid>
                <Grid templateColumns="repeat(1, 1fr)" gap={0} mt={4}>
                  <FormLabel>Blog Image</FormLabel>
                  <Input
                    type="file"
                    className="form-control"
                    // multiple
                    accept="image/*"
                    onChange={(e) => {
                      imageUploadHandler(e);
                    }}
                  />
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={0} mt={4}>
                  {images?.length === 0
                    ? ""
                    : images?.map((item, i) => (
                        <Fragment key={i}>
                          <Image
                            left="10px"
                            top="20px"
                            borderRadius="10px"
                            border="1px solid lightblue"
                            p="2px"
                            src={
                              item?.hasOwnProperty("path")
                                ? `${baseUrl}/${item?.path}`
                                : window?.URL?.createObjectURL(item)
                            }
                            w="180px"
                            h="110px"
                            alt=""
                          />
                        </Fragment>
                      ))}
                </Grid>
                <Grid templateColumns="repeat(1, 1fr)" gap={0} mt={4}>
                  <FormLabel marginBottom="10px">Enter Description</FormLabel>
                  <Textarea
                    placeholder="Enter Description here"
                    value={des}
                    onChange={(e) => {
                      setDes(e.target.value);
                    }}
                    rows="3"
                  ></Textarea>
                </Grid>
              </FormControl>
              {/* {description} */}
            </Stack>
          </DrawerBody>
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
        </DrawerContent>
      </Drawer>
    </>
  );
}
