import { useState } from "react";

import "react-multiple-select-dropdown-lite/dist/index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useColorModeValue,
  Grid,
  Button,
  Drawer,
  Text,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Textarea,
  Input,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

import { baseUrl } from "../../config/baseUrl";

toast.configure();

function Create(props) {
  const { reloadData, isOpen, onClose, btnRef } = props;
  const borderColor = useColorModeValue("#dee2e6", "gray.500");
  const [images, setImages] = useState("");
  const [des, setDes] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    var formData = new FormData();
    formData.append("description", des);
    formData.append("title", title);
    formData.append("images", images);

    try {
      const res = await axios.post(`${baseUrl}/blog/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("auth-token"),
        },
      });
      if (res?.data?.message === "success") {
        toast.success("Added Successfully", {
          autoClose: 3000,
        });
        setLoading(false);
        reloadData();
        onClose();
        setTitle("");
        setImages("");
        setDes("");
      } else {
        toast.error("Error", {
          autoClose: 3000,
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error", error, {
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  // -----END: Blog Add API Call--------

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
              <Text fontWeight="bold">Please Add Blog Here</Text>
            </DrawerHeader>
            <FormLabel>
              <Text fontWeight="bold">
                Add Title
                <span style={{ color: "red" }}>*</span>
              </Text>
            </FormLabel>
            <Input
              type="text"
              className="form-control"
              placeholder="Enter Title here"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <Box className="col-lg-12 col-12 my-3">
              <FormLabel>
                <Text fontWeight="bold">
                  Property Images
                  <span style={{ color: "red" }}>*</span>
                </Text>
              </FormLabel>
              <Input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImages(e.target.files[0])}
              />
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={0} mt={4}>
              {images?.length === 0 ? (
                ""
              ) : (
                <img
                  style={{
                    marginLeft: "10px",
                    marginTop: "20px",
                    borderRadius: "10px",
                    border: "1px solid #0F52BA",
                    padding: "2px",
                  }}
                  src={URL.createObjectURL(images)}
                  width={180}
                  height={110}
                  alt=""
                />
              )}
            </Grid>

            <FormLabel>
              <Text fontWeight="bold">
                Enter Description
                <span style={{ color: "red" }}>*</span>
              </Text>
            </FormLabel>
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
