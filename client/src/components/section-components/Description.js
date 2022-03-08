import React from "react";
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Link,
  Heading,
  Text,
  Divider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BiBed } from "react-icons/bi";
import { BiBath } from "react-icons/bi";
import { AiOutlineBorder } from "react-icons/ai";
import Feature from "./Feature";
import moment from "moment";
import "./detail.css";

function Description(props) {
  const { bedrooms, bathrooms, squareFeet } = props;
  console.log("props========>>", props);
  function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <div className="box">
        <Stat
          px={{ base: 2, md: 4 }}
          py={"5"}
          borderRadius="md"
          borderTopRadius="md"
          borderTopLeftRadius="md"
          shadow={"xl"}
          border={"1px solid"}
          borderColor={useColorModeValue("gray.800", "gray.500")}
          rounded={"lg"}
        >
          <Flex justifyContent={"space-between"}>
            <Box
              pl={{ base: 2, md: 4 }}
              rounded={"lg"}
              borderRadius="md"
              borderTopRadius="md"
              borderTopLeftRadius="md"
              shadow={"xl"}
            >
              <StatLabel fontWeight={"medium"} isTruncated>
                {title}
              </StatLabel>
              <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                {stat}
              </StatNumber>
            </Box>
            <Box
              my={"auto"}
              color={useColorModeValue("gray.800", "gray.200")}
              alignContent={"center"}
            >
              {icon}
            </Box>
          </Flex>
        </Stat>
      </div>
    );
  }
  return (
    <Box maxW="10xl" mx={"auto"} pt={5} px={{ base: 2, sm: 2, md: 7 }}>
      {/* <SimpleGrid columns={{ base: 3, md: 3 }} spacing={{ base: 5, lg: 8 }}> */}
      <SimpleGrid row={{ sm: 3, md: 3, xl: 3 }} spacing="24px">
        {" "}
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="col-sm-4 col-md-4 col-lg-4 col-12 mb-2 ">
            <StatsCard
              title={"Bedrooms"}
              stat={bedrooms}
              icon={<BiBed size={"3em"} />}
            />{" "}
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-12 mb-2 ">
            <StatsCard
              className="mt-3"
              title={"Bathrooms"}
              stat={bathrooms}
              icon={<BiBath size={"3em"} />}
            />
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 col-12 mb-2">
            <StatsCard
              title={"1100-1500 ft"}
              stat={squareFeet}
              icon={<AiOutlineBorder size={"3em"} />}
            />
          </div>
        </div>
      </SimpleGrid>
      <Box my={8}>
        <Divider />
      </Box>
    </Box>
  );
}
export default Description;
