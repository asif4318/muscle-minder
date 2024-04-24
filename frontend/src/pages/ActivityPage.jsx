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
  Table,
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td
} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';

const ActivityPage = () => {
  const [user_data, set_user_data] = useState([]);
  const [workout_data, set_workout_data] = useState([]);
  const [exercise_data, set_exercise_data] = useState([]);
  const [exercise_name_map, set_exercise_name_map] = useState([]);
  const [exercise_muscle_map, set_exercise_muscle_map] = useState([]);
  const user_id = localStorage.getItem("user_id"); //Get the current user_id from local storage - David use this frequently

  useEffect(() => {
    fetch('http://localhost:8000/workouts/user-workout-link')
      .then(response => response.json())
      .then(data => {
        const filtered_data = data.filter(item => String(item.user_id) === user_id); //Filter data so it only grabs workouts that the user's id is associated with
        //console.log(filtered_data);
        set_user_data(filtered_data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/workouts')
      .then(response => response.json())
      .then(data => {
        const filtered_workout_data = user_data.map(user => {
          return data.filter(workout => workout.id === user.workout_id);
        }).flat(); //Flat makes it so it returns only one list of the ids of the workouts 
                   //rather than a list of lists (since orignally there is a list of users each with a list of workouts)
        set_workout_data(filtered_workout_data);
      });
  }, [user_data]); //Add user_data as a dependency so this useEffect runs whenever user_data changes

  useEffect(() => { //Gets all exercises assocatied with workouts that the user has done and creates a map with the filtered exercises
    fetch('http://localhost:8000/excercises/workout-excercise-link') //EXERCISE IS STILL SPELT WRONG BEWARE
    .then(response => response.json())
    .then(data => {
      const exercise_map = workout_data.reduce((map, workout) => {
        map[workout.id] = data.filter(exercise => exercise.workout_id === workout.id);
        return map;
      }, {});
      ///console.log(exercise_map);
      set_exercise_data(exercise_map);
    });
  }, [workout_data]);
  
  useEffect(() => { //gets the names of the exercises since the above useEffect only gets the ids, creates a map with the id as the key to the name
    fetch('http://localhost:8000/excercises')
      .then(response => response.json())
      .then(data => {
        const name_map = data.map(item => ({id: item.id, name: item.name}));
        set_exercise_name_map(name_map);
      });
  }, [exercise_data]);

  useEffect(() => { //the same thing as above but maps exercise ids to a array of all their muscles, the muscles in this array already are named
    fetch('http://localhost:8000/excercises')
      .then(response => response.json())
      .then(data => {
        const muscle_map = data.map(item => ({id: item.id, muscles: item.muscles}));
        set_exercise_muscle_map(muscle_map);
      });
  }, [exercise_data]);

  return (
    <Container>
      <VStack>
        <Box textAlign={"center"}>
          <Heading size={"xl"}>Recent Activity</Heading>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Workout</Th>
              <Th>Exercises</Th>
              <Th>Muscles</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody> 
          {workout_data.map((workout, index) => { //iterate through workout_data
            const exercises = exercise_data[workout.id] ? exercise_data[workout.id].map(exercise => exercise.excercise_id) : []; //get exercise data for the workout
            const display_exercises = exercises.length > 0 ? exercises.map(id => { 
              const exercise_name_obj = exercise_name_map.find(item => item.id === id); //relate the id of the current exercise to its name (they are stored seperatly)
              return exercise_name_obj.name;
            }).join(', ') : 'No Exercises'; //format and say if there is no exercises
            const display_muscles = exercises.length > 0 ? [...new Set(exercises.flatMap(id => { //needs to be a set so multiple muscles arent copied if they are used by same exercise
              const muscle_names_obj = exercise_muscle_map.find(item => item.id === id); //different from exercises since exercises contain a list of their muscles, there is no 
              return muscle_names_obj ? muscle_names_obj.muscles.map(muscle => muscle.name) : []; //need to fetch the muscles name
            }))].join(', ') : 'No Muscles';
            const user_workout = user_data.find(item => item.workout_id === workout.id); //Compares the data in user_data to properly display the correct dates
            const workout_date = user_workout ? user_workout.workout_date : 'No Date Recorded';
            return (
              <Tr key={index}>
                <Td>{workout.name}</Td>
                <Td>{display_exercises}</Td>
                <Td>{display_muscles}</Td>
                <Td>{workout_date}</Td>
              </Tr>
            );
          })}
        </Tbody>
        </Table>
      </VStack>
    </Container>
  );
}; 

export default ActivityPage;