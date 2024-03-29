import { GridItem, Container, Heading, Button, VStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect , useState } from "react";
import { auth } from "../firebase_config";

const SideNavBar = () => {
  const [presentUser, setPresentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPresentUser(auth.currentUser);
      } else {
        setPresentUser(null);
      }
    });
  }, []);
  return (
    <GridItem bg="purple.600" height="100%">
      <VStack spacing={10}>
        <Container textAlign={"center"} my={"10px"}>
          <Heading textColor={"white"}>Muscle Minder</Heading>
        </Container>
        { presentUser == null ? <></> :
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
        
        }
        <a href="/">
          { presentUser == null ? <></> : 
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={() => {
              signOut(auth);
            }}
          >
            Log Out
          </Button>
        }
        </a>
      </VStack>
    </GridItem>
  );
};

export default SideNavBar;
