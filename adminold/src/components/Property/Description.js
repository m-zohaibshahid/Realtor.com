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
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BiBed } from "react-icons/bi";
import { BiBath } from "react-icons/bi";
import { AiOutlineBorder } from "react-icons/ai";
import Feature from "components/Property/Feature";
import moment from "moment";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
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
  );
}

export default function Description(props) {
  const {
    bedrooms,
    bathrooms,
    squareFeet,
    email,
    fname,
    lname,
    createdAt,
    item,
  } = props;
  console.log("props========>>", props);

  return (
    <Box maxW="10xl" mx={"auto"} pt={5} px={{ base: 2, sm: 2, md: 7 }}>
      {/* <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Our company is expanding, you could be too.
      </chakra.h1> */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <div className="my-2" style={{ borderRadius: "10px" }}>
          <StatsCard
            title={"Bedrooms"}
            stat={bedrooms}
            icon={<BiBed size={"3em"} />}
          />
        </div>
        <StatsCard
          title={"Bathrooms"}
          stat={bathrooms}
          icon={<BiBath size={"3em"} />}
        />
        <StatsCard
          title={"1100-1500 ft"}
          stat={squareFeet}
          icon={<AiOutlineBorder size={"3em"} />}
        />
      </SimpleGrid>
      <Box my={8}>
        <Divider />
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: "3", sm: "12" }}
      >
        <Heading marginTop="1">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            Description
          </Link>
        </Heading>
        <Text
          as="p"
          marginTop="6"
          color={useColorModeValue("gray.700", "gray.200")}
          fontSize="lg"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
        {/* <BlogAuthor name="John Doe" date={new Date("2021-04-06T19:01:27Z")} /> */}
      </Box>
      <Feature
        title="Name"
        value={`${fname} ${""} ${lname}`}
        shades="blue.50"
      />
      <Feature title="Email" value={email} shades={null} />
      <Feature
        title="created At"
        value={moment(createdAt).format("lll")}
        shades="blue.50"
      />
      {/* <Feature
        title="Payer Name"
        value={`${
          item?.transactionId?.details?.payer?.name?.given_name
        } ${""} ${item?.transactionId?.details?.payer?.name?.surname}`}
        shades={null}
      /> */}
      <Heading marginTop="1" mb={"4px"}>
        {/* <Link textDecoration="none" _hover={{ textDecoration: "none" }}> */}
        Transaction
        {/* </Link> */}
      </Heading>

      <Feature
        title="Payer Name"
        value={`${
          item?.transactionId?.details?.payer?.name?.given_name
        } ${""} ${item?.transactionId?.details?.payer?.name?.surname}`}
        shades="blue.50"
      />

      <Feature
        title="Payer Email"
        value={item?.transactionId?.details?.payer?.email_address}
        shades={null}
      />
      <Feature
        title="Payer Id"
        value={item?.transactionId?.details?.payer?.payer_id}
        // value={item?.constructionMaterial?.value}
        shades="blue.50"
      />
      <Feature
        title="Merchant Id"
        value={
          item?.transactionId?.details?.purchase_units[0]?.payee?.merchant_id
        }
        // value={item?.basement?.value}
        shades={null}
      />
      <Feature
        title="Transaction Date"
        value={moment(item?.transactionId?.details?.create_time).format("lll")}
        // value={item?.flooring?.value}
        shades="blue.50"
      />
      <Feature
        title="Status"
        colorScheme={
          item?.transactionId?.paymentVerified === "paid"
            ? "teal"
            : item?.transactionId?.paymentVerified === "unpaid"
            ? "red"
            : null
        }
        value={item?.transactionId?.paymentVerified}
        // value={item?.homeAmenities?.value}

        shades={null}
      />
    </Box>
  );
}
