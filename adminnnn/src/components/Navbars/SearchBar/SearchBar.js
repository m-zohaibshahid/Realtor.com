import React, { useState, useEffect } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { searchFilter } from "../../../reducers/filterReducer";
import { SearchIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
export function SearchBar(props) {
  const dispatch = useDispatch();
  // Pass the computed styles into the `__css` prop
  const [address, setAddress] = useState("");
  const { variant, children, ...rest } = props;
  // Chakra Color Mode
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "gray.800");
  const { Filter } = useSelector((state) => state.property);
  console.log("Filters", Filter);
  const history = useHistory();

  const handleSubmit = async (e) => {
    useEffect(() => {
      // setLoading(true);
      getData();
    }, [dispatch]);

    const getData = async () => {
      dispatch(searchFilter());
      // setLoading(false);
    };

    useEffect(() => {
      setData();
    }, [Filter]);

    const setData = async () => {
      setAddress(Filter);
      // setLoading(false);
    };
    history.push("/");
  };
  return (
    <InputGroup
      bg={inputBg}
      borderRadius="15px"
      w="200px"
      _focus={{
        borderColor: { mainTeal },
      }}
      _active={{
        borderColor: { mainTeal },
      }}
    >
      <InputLeftElement
        children={
          <IconButton
            bg="inherit"
            borderRadius="inherit"
            _hover="none"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
            // onClick={handleSubmit}
          ></IconButton>
        }
      />
      <Input
        fontSize="xs"
        py="11px"
        placeholder="Type here"
        borderRadius="inherit"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </InputGroup>
  );
}
