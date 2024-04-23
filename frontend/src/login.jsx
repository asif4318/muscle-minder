import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { auth } from "./firebase_config";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signInWithPopup,
  getRedirectResult,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Button
          onClick={() => //Below if a user signs in for the first time it creates a user with a unique id - last name is storing their email (changed late in development)
            signInWithPopup(auth, provider).then((result) =>
              getRedirectResult(auth).then((res) => {
                const requestOptions = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({'first_name': result.user.displayName,
                  'last_name': result.user.email,
                  'date_of_birth': '2024-04-23'}) //DOB is leftover junk data not used for anything
                }
                fetch("http://localhost:8000/users").then(response => response.json())
                .then(data => {
                  var flag = true; //Keeps track if user is already in database
                  for (let user of data) {
                    if (user.last_name == result.user.email) { //if database got very large this would take linearly long time
                      flag = false;
                      break;
                    }
                  }
                  if (flag == true) { //below has two cases, either the user already exists so it can just grab the id and store it, or it needs to wait for the database
                    fetch("http://localhost:8000/users", requestOptions) //to update and create the id then retrieve it
                      .then(response => response.json())
                      .then(new_user => {
                        localStorage.setItem("user_id", new_user.id);
                        //alert(localStorage.getItem("user_id")); use for testing to see if correct id is returned
                        navigate("dashboard");
                      });
                  } else {
                    for (let user of data) {
                      if (user.last_name == result.user.email) {
                        localStorage.setItem("user_id", user.id);
                        break;
                      }
                    }
                    //alert(localStorage.getItem("user_id")); use for testing to see if correct id is returned
                    navigate("dashboard");
                  }
                });
              })
            )
          }
        >
          Sign in with Google
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
