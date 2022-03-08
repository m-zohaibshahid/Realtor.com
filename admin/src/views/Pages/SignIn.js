import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  loginPending,
  loginFail,
  loginSuccess,
} from "../../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "config/baseUrl";
toast.configure();
// Assets
// import signInImage from "assets/img/signInImage.png";

function SignIn() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginPending());

    const body = {
      email,
      password,
    };

    console.log("email ", email, " password: ", password);

    try {
      const res = await fetch(`${baseUrl}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      console.log("this is an result", res);
      if (result.error) {
        const error = result.error;
        dispatch(loginFail({ error }));
        toast.error(error, {
          autoClose: 3000,
        });
      } else if (result.token) {
        dispatch(loginSuccess({ result }));
        toast.success("Login Successfully!", {
          autoClose: 3000,
        });
        history.push("/admin/dashboard");
      }
    } catch (error) {
      dispatch(loginFail({ error }));
      toast.error(error, {
        autoClose: 3000,
      });
    }
  };
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const errorColor = useColorModeValue("red.400", "white");
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="16px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>
            {error !== "" &&
              (error === "Failed to fetch" ? (
                <Text
                  mb="10px"
                  ms="4px"
                  color={errorColor}
                  fontWeight="bold"
                  fontSize="14px"
                >
                  Check your internet connection! Try again later
                </Text>
              ) : null)}
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="Your email adress"
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="password"
                placeholder="Your password"
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
              />
              {loading ? (
                <Button
                  isLoading
                  colorScheme="teal"
                  h="45"
                  mb="20px"
                  w="100%"
                  variant="solid"
                >
                  SIGN IN
                </Button>
              ) : (
                <Button
                  fontSize="10px"
                  type="submit"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  onClick={(e) => handleSubmit(e)}
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
                  }}
                >
                  SIGN IN
                </Button>
              )}
            </FormControl>
          </Flex>
        </Flex>
        {/* <Box
					display={{ base: "none", md: "block" }}
					overflowX="hidden"
					h="100%"
					w="40vw"
					position="absolute"
					right="0px">
					<Box
						bgImage={signInImage}
						w="100%"
						h="100%"
						bgSize="cover"
						bgPosition="50%"
						position="absolute"
						borderBottomLeftRadius="20px"></Box>
				</Box> */}
        <Flex
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
          bg="teal.300"
          align="center"
          justify="center"
          borderRadius="15px"
          width={{ lg: "40%" }}
          minHeight={{ sm: "250px" }}
        >
          <Text
            fontSize="30px"
            color="white"
            align="center"
            fontWeight="bold"
            pb=".5rem"
            pt={270}
          >
            Hedgesandbricks
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignIn;
