import { GridItem, Container, Heading, Button, VStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebase_config";

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
        </VStack>
        <a href="/">
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={() => {
              signOut(auth);
            }}
          >
            Log Out
          </Button>
        </a>
      </VStack>
    </GridItem>
  );
};

export default SideNavBar;
