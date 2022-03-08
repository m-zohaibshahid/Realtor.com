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
} from "@chakra-ui/react";

import React from "react";

const Feature = (props) => {
  const { title, value, shades } = props;
  return (
    <Flex
      justifyContent={"space-evenly"}
      bg={shades == null ? "" : "blue.50"}
      py={3}
      width="100%"
    >
      <Box pl={{ base: 2, md: 4 }} width="50%">
        <StatLabel fontWeight={"medium"} isTruncated>
          {title}
        </StatLabel>
      </Box>
      <Box
        my={"auto"}
        color={useColorModeValue("gray.800", "gray.200")}
        width="50%"
      >
        <StatNumber fontWeight={"bold"} float={"left"}>
          {value ? value : value == [] && value == "" ? "None" : "None"}
        </StatNumber>
      </Box>
    </Flex>
  );
};

export default Feature;
