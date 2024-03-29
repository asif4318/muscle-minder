import { GridItem, Container, Heading, Button, VStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const SideNavBar = () => {
  return (
    <GridItem bg="purple.600" height="100%">
      <VStack spacing={10}>
        <Container textAlign={"center"} my={"10px"}>
          <Heading textColor={"white"}>Muscle Minder</Heading>
        </Container>
        <VStack w={"100%"} textAlign={"center"} textColor={"white"} spacing={3}>
          <Button width={"70%"}>
            <a href="/dashboard">Dashboard</a>
          </Button>
          <Button width={"70%"}>
            <a href="/activity">My Activity</a>
          </Button>
          <Button width={"70%"}>
            <a href="/log">Log Workout</a>
          </Button>
          <Button width={"70%"}>Profile</Button>
        </VStack>
        <Button leftIcon={<ArrowBackIcon />}>Log Out</Button>
      </VStack>
    </GridItem>
  );
};

export default SideNavBar;
