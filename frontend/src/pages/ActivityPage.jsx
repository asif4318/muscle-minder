import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

const ActivityPage = () => {
  return (
    <VStack w={"100%"}>
      <Heading size={"2xl"} textAlign={"center"} my="1%">
        My Activity
      </Heading>
      <Container my="3%" textAlign={"center"} padding={"5px"}>
        <InputGroup>
          <Input type="search" placeholder="Search for a Workout" />
          <InputRightAddon>
            <SearchIcon />
          </InputRightAddon>
        </InputGroup>
        <HStack my="3%">
          <Input placeholder={"Reps"} type="number"></Input>
          <Input placeholder={"Sets"} type="number"></Input>
          <Input placeholder={"Time"} type="datetime-local"></Input>
        </HStack>
        <Button
          textAlign={"center"}
          padding={"1rem"}
          backgroundColor={"lightgreen"}
        >
          Log!
        </Button>
      </Container>
      <Box textAlign={"center"}>
        <Heading size={"xl"}>Recent Activity</Heading>
      </Box>
    </VStack>
  );
};

export default ActivityPage;
