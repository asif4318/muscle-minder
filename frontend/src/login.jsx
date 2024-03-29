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
          onClick={() =>
            signInWithPopup(auth, provider).then((result) =>
              getRedirectResult(auth).then((res) => {
                navigate("dashboard");
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
