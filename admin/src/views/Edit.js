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
  FormErrorMessage,
  Box,
  InputField,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import axios from "axios";
import { MdEdit } from "react-icons/md";

export default function Edit(props) {
  const { isOpen, onClose, row, reloadData, btnRef } = props;
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const [images, setImages] = useState([]);
  const [_id, setID] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState({});
  console.log("video....", video);

  useEffect(() => {
    setSalePrice(row?.sale);
    setRentPrice(row?.rent);
    setVideo(row?.video);
    setID(row?._id);
  }, [props?.row]);
  console.log("props", props);
  const imageUploadHandler = (e) => {
    let dumpMedia = [...video];
    console.log("object...............x", ...e.target.files);
    dumpMedia.push(...e.target.files);
    setVideo(dumpMedia);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("video form data", video);
    var formData = new FormData();
    for (var x = 0; x < images.length; x++) {
      formData.append("video", video[x]);
    }
    formData.append("salePrice", salePrice);
    formData.append("rentPrice", rentPrice);
    console.log("formData>>>>>>>>>>>>>>>>>", formData);
    try {
      const res = await axios.put(
        `${baseUrl}/api/subscription/update/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("auth-token"),
          },
        }
      );
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
        set;
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
                <Box ml={1}>
                  <Box className="col-lg-12 col-12 my-3">
                    <FormControl isRequired>
                      <FormLabel>Rent</FormLabel>
                      <NumberInput min={0} defaultValue={rentPrice}>
                        {/* <NumberInput min={0} defaultValue={parkingSpots}> */}
                        <NumberInputField
                          className="form-control"
                          placeholder="Enter Rent Price"
                          value={rentPrice}
                          onChange={(e) => {
                            setRentPrice(e.target.value);
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
                      <FormLabel>Sale</FormLabel>
                      <NumberInput min={0} defaultValue={salePrice}>
                        {/* <NumberInput min={0} defaultValue={parkingSpots}> */}
                        <NumberInputField
                          className="form-control"
                          placeholder="Enter Sale Price"
                          value={salePrice}
                          onChange={(e) => {
                            setSalePrice(e.target.value);
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
                      <FormLabel>Upload video</FormLabel>
                      <Input
                        type="file"
                        className="form-control"
                        accept="video/*"
                        onChange={(e) => {
                          imageUploadHandler(e);
                        }}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Flex>
            </DrawerHeader>
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
