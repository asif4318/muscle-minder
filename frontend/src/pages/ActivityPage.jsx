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
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';

const ActivityPage = () => {
  const [userData, setUserData] = useState([]);
  const user_id = localStorage.getItem("user_id"); //Get the current user_id from local storage - David use this frequently

  useEffect(() => {
    fetch('http://localhost:8000/workouts/user-workout-link')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(item => String(item.user_id) === user_id); //Filter data so it only grabs workouts that the user's id is associated with
        setUserData(filteredData);
      });
  }, []);

  return (
    <Container>
      <VStack>
        <Box textAlign={"center"}>
          <Heading size={"xl"}>Recent Activity</Heading>
        </Box>
        <Box>
          {userData.map((info, index) => (
            <Text key={index}>{info.workout_id}</Text>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default ActivityPage;