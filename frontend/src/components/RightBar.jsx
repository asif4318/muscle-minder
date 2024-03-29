import {
  GridItem,
  IconButton,
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

import { BellIcon, SettingsIcon } from "@chakra-ui/icons";

const RightBar = () => {
  return (
    <GridItem bg="purple.400" height="100%" textAlign={"center"}>
      <HStack textAlign={"center"} align={"center"} spacing={"10px"}>
        <Text>Name</Text>
        <Text>Pic</Text>
        <IconButton aria-label="Notifications" icon={<BellIcon />} />
        <IconButton aria-label="Settings" icon={<SettingsIcon />} />
      </HStack>
      <VStack>
        <Text>4012 Calories Burned</Text>
        <Text>45 Minutes Exercised</Text>
        <Text>My Goal</Text>
      </VStack>
    </GridItem>
  );
};

export default RightBar;
