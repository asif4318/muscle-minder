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
} from "firebase/auth";

const Login = () => {
  const provider = new GoogleAuthProvider();

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Button
          onClick={() => signInWithRedirect(auth, provider).then(() => null)}
        >
          Sign in with Google
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
