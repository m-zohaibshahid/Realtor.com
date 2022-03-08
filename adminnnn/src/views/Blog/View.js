import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  HStack,
  Tag,
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
import { baseUrl } from "config/baseUrl";
export default function View(props) {
  const { item } = props;
  const finalRef = React.useRef();

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
          <ModalHeader>Blog Details Page</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container maxW={"7xl"} p="12">
              {/* <Heading as="h1"></Heading> */}
              <Box
                marginTop={{ base: "1", sm: "5" }}
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  flex="1"
                  marginRight="3"
                  position="relative"
                  alignItems="center"
                >
                  <Box
                    width={{ base: "100%", sm: "85%" }}
                    zIndex="2"
                    marginLeft={{ base: "0", sm: "5%" }}
                    marginTop="5%"
                  >
                    <Link
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                    >
                      <Image
                        borderRadius="lg"
                        src={`${baseUrl}/${item?.images?.[0]?.path}`}
                        alt="some good alt text"
                        objectFit="contain"
                      />
                    </Link>
                  </Box>
                  <Box
                    zIndex="1"
                    width="100%"
                    position="absolute"
                    height="100%"
                  >
                    <Box
                      bgGradient={useColorModeValue(
                        "radial(orange.600 1px, transparent 1px)",
                        "radial(orange.300 1px, transparent 1px)"
                      )}
                      backgroundSize="20px 20px"
                      opacity="0.4"
                      height="100%"
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={{ base: "3", sm: "0" }}
                >
                  <Heading marginTop="1">
                    <Link
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                    >
                      {item.title}
                    </Link>
                  </Heading>
                  <Text
                    as="p"
                    marginTop="2"
                    color={useColorModeValue("gray.700", "gray.200")}
                    fontSize="lg"
                  >
                    {item.description}
                  </Text>
                </Box>
              </Box>
            </Container>
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
