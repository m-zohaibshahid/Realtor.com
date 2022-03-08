import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import {
  Box,
  Text,
  Button,
  FormControl,
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { baseUrl } from "config/baseUrl";
const UpdateStatus = (props) => {
  const {
    propertyId,
    status,
    property,
    setNewStatus,
    newStatus,
    handleClose,
    reloadData,
    isOpen,
    onClose,
    btnRef,
  } = props;
  const [propertyStatus, setPropertyStatus] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("props", props.status);
  useEffect(() => {}, [propertyStatus]);

  const handleStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      propertyStatus,
    };
    const token = localStorage.getItem("auth-token");
    await fetch(`${baseUrl}/api/updatePropertyStatus/${propertyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(`Status updated`, {
          autoClose: 3000,
        });
        setNewStatus(false);
        reloadData();
        // setPropertyStatus(status);
        setLoading(false);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size={"sm"}
        onClose={onClose}
        finalFocusRef={btnRef}
        show={newStatus}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text fw="bold">Change Property Status</Text>
          </DrawerHeader>
          <DrawerBody>
            <Box
              p={"4px"}
              // borderRadius: "5px",
            >
              <Box class="form-group">
                <FormControl isRequired>
                  <Select
                    class="js-example-basic-single w-100 mt-3 form-control"
                    onChange={(e) => setPropertyStatus(e.target.value)}
                  >
                    <option
                      value="pending"
                      selected={status === "pending" ? true : false}
                    >
                      Pending
                    </option>
                    <option
                      value="approved"
                      selected={status === "approved" ? true : false}
                    >
                      {" "}
                      {/* {property?.paymentVerified === "unpaid" ? "" : "Approved"} */}
                      Approved
                    </option>
                    <option
                      value="disapproved"
                      selected={status === "disapproved" ? true : false}
                    >
                      Disapproved
                    </option>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <DrawerFooter>
              <Button
                type="submit"
                colorScheme="red"
                size="md"
                onClick={onClose}
              >
                Close
              </Button>
              &nbsp;
              {loading ? (
                <Button isLoading colorScheme="teal" size="md" variant="solid">
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  colorScheme="teal"
                  size="md"
                  onClick={(e) => handleStatus(e)}
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
};
export default UpdateStatus;
