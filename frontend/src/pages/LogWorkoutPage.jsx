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
  Table,
  Text,
  TableCaption,
  TableContainer,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  VStack,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

const ExcercisesDummy = [
  { title: "crunches", muscles: ["rectus abdominus"] },
  { title: "bicep curls", muscles: ["biceps"] },
];

const excerciseContext = React.createContext({
  excercises: [], fetchExcercises: () => {}
})

const LogWorkoutPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pendingExercise, setPendingExercise] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [excercises, setExcercises] = useState([]);
  const fetchExcercises = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    setIsLoading(true);
    const response = await fetch("http://localhost:8000/excercises", requestOptions);
    const excercise = await response.json()
    setExcercises(excercise)
    setIsLoading(false);
  }
  useEffect(() => {
    fetchExcercises()
  }, [])

  return (
    <div>
      <VStack w={"100%"}>
        <Heading size={"2xl"} textAlign={"center"} my="1%">
          Log Workout
        </Heading>
        <Text textAlign={"left"}>
          Selected Excercise: {selectedExercise ? selectedExercise.name : ""}
        </Text>
        <Container my="3%" textAlign={"center"} padding={"5px"}>
          <InputGroup>
            <Input
              type="search"
              name="searchbar"
              id="sb-1"
              placeholder={searchTerm ? "suggestion" : "Search for an Exercise"}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightAddon>
              <SearchIcon />
            </InputRightAddon>
          </InputGroup> 
          <>
          {(!isLoading) ? 
            excercises.filter((element) => {
            let result = element.name.includes(searchTerm);
            return result;
          }).map((element) => {
            return (
              <Text
                backgroundColor="lightgray"
                onClick={() => {
                  setSelectedExercise(element);
                  setSearchTerm(null);
                }}
              >
                {element.name}
              </Text>
            );
          })
          : <div>Loading...</div>
          }
          </>
          <HStack my="3%">
            <Input
              placeholder={"Reps"}
              type="number"
              onChange={(e) => {
                if (e.target.value) {
                  setReps(parseInt(e.target.value, 10));
                }
              }}
            ></Input>
            <Input
              placeholder={"Sets"}
              type="number"
              onChange={(e) => {
                if (e.target.value) {
                  setSets(parseInt(e.target.value, 10));
                }
              }}
            ></Input>
          </HStack>
          <VStack align={"center"} justify={"center"}>
            <Button
              textAlign={"center"}
              padding={"1rem"}
              backgroundColor={"purple.400"}
              onClick={() => {
                if (selectedExercise) {
                  setPendingExercise([
                    ...pendingExercise,
                    { ...selectedExercise, sets: sets, reps: reps },
                  ]);
                }
              }}
            >
              Add to Workout
            </Button>
          </VStack>
        </Container>
        <VStack spacing={6}>
          <Heading size={"xl"}>Exercises to Log</Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th>Exercise</Th>
                  <Th isNumeric>Reps</Th>
                  <Th isNumeric>Sets</Th>
                  <Th>Muscles</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pendingExercise.map((element) => {
                  return (
                    <Tr>
                      <Td>{element.name}</Td>
                      <Td isNumeric>{element.reps}</Td>
                      <Td isNumeric>{element.sets}</Td>
                      <Td isNumeric>{element.muscles.join(" ")}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <Input placeholder={"Time"} type="datetime-local" mt={4}></Input>

          <Button
            textAlign={"center"}
            padding={"1rem"}
            backgroundColor={"lightgreen"}
          >
            Log!
          </Button>
        </VStack>
        <Box textAlign={"center"}>
          <Heading size={"xl"}>Recent Activity</Heading>
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>adkjlfalkdfjadl;dfkald;jdfkl;ajdskfajflkajsl;dfjal;dfskj</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LogWorkoutPage;
