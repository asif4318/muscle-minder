import {
  GridItem,
  IconButton,
  Image,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Button,
  Circle,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { auth } from "../firebase_config";
import { onAuthStateChanged } from "firebase/auth";

import { BellIcon, SettingsIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

const RightBar = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName);
        setProfilePic(user.photoURL);
      } else {
        console.log("No User");
        setUsername(null);
      }
    });
  }, []);
  
  const [userName, setUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  return (
    <GridItem bg="purple.400" height="100%" textAlign={"center"}>
      <Flex textAlign={"center"} align={"center"} gap={"10%"}>
        <Text>{userName}</Text>
        <Image src={profilePic} width={"10%"}></Image>
      </Flex>
    </GridItem>
  );
};

export default RightBar;
