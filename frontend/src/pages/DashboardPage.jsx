import { React } from "react";
import {
  Box,
  Flex,
  Heading,
  Container,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from 'react';


const StatsContainer = ({ text }) => {
  return (
    <Container
      backgroundColor={"white"}
      borderRadius=".5rem"
      paddingY={"1rem"}
    >
      <Text>{text}</Text>
    </Container>
  );
};

const DashboardPage = () => { //Much of these statements are copied from activity page, however since we now needed to get all muscles and exercises in totality - not associated
  const [user_data, set_user_data] = useState([]); //with each unique workout some had to be changed - they now put all exercises and muscles in one list to be easily comapred
  const [workout_data, set_workout_data] = useState([]); //to see what has not been worked out
  const [exercise_data, set_exercise_data] = useState([]);
  const [exercise_muscle_map, set_exercise_muscle_map] = useState([]);
  const [unexercised_muscles, set_unexercised_muscles] = useState([]);
  const [muscle_data, set_muscle_data] = useState([]); //NEW this gets all muscle ids
  const user_id = localStorage.getItem("user_id"); //Get the current user_id from local storage - David use this frequently
  const [challenge_workout_id, set_challenge_workout_id] = useState([]);
  const [challenge_workout_name, set_challenge_workout_name] = useState([]);
  const [challenge_exercises, set_challenge_exercises] = useState([]);
  const [challenge_exercises_name, set_challenge_exercises_name] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/workouts/user-workout-link')
      .then(response => response.json())
      .then(data => {
        const filtered_data = data.filter(item => String(item.user_id) === user_id); //Filter data so it only grabs workouts that the user's id is associated with
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
        //console.log(filtered_workout_data);
      });
  }, [user_data]); //Add user_data as a dependency so this useEffect runs whenever user_data changes

  useEffect(() => {
    fetch('http://localhost:8000/excercises/workout-excercise-link') //Spelt wrong
    .then(response => response.json())
    .then(data => { //had to be rewritten since now we need every exercise not paired to their respective workouts, just in a list
      const filtered_data = data.filter(item => workout_data.some(workout => workout.id === item.workout_id));
      //console.log(filtered_data);
      const all_exercises = filtered_data.reduce((exercise_list, item) => { //reduce all exercises to one array
        if (!exercise_list.includes(item.excercise_id)) { //adds exercises not already in array (prevents duplicates0)
          exercise_list.push(item.excercise_id);
        }
        return exercise_list;
      }, []);
      //console.log(all_exercises);
      set_exercise_data(all_exercises); // all_exercises is an array of all unique exercises across all workouts
    });
  }, [workout_data]);

  useEffect(() => {
    fetch('http://localhost:8000/excercises')
      .then(response => response.json())
      .then(data => {
        const filtered_exercises = data.filter(item => exercise_data.includes(item.id));
        const all_muscles = filtered_exercises.reduce((muscle_array, item) => muscle_array.concat(item.muscles), []); //gets all muscles from the exercises the user has done
        //console.log(all_muscles);
        set_exercise_muscle_map(all_muscles); //This is no longer a map but im not going to bother changing the name
      });
  }, [exercise_data]);

  useEffect(() => { //Creates a map of muscle ids as keys to their names as resultants
    fetch('http://localhost:8000/muscles')
    .then(response => response.json())
    .then(data => {
      const muscle_names = data.map(item => item.name); //only need the names since exercises track the names not ids, so this is easier, gives array of muscle names
      set_muscle_data(muscle_names);
      //console.log(muscle_names); //DELETE
    });
  }, [exercise_data]);

  useEffect(() => { //this compares the list of all myscles against the list of the muscles the user has worked out - NOT TIME SENSITIVE CURRENTLY so if they ever workout it it will remain
      const exercised_muscles = exercise_muscle_map.flatMap(item => item.name);
      //console.log(exercised_muscles);
      const unexercised_muscles = muscle_data.filter(muscle => !exercised_muscles.includes(muscle));
      //console.log(unexercised_muscles);
      set_unexercised_muscles(unexercised_muscles);
  }, [muscle_data, exercise_muscle_map]);


  //Challenges

  useEffect(() => { //Creates a map of muscle ids as keys to their names as resultants
    fetch('http://localhost:8000/challenge?user_id=' + user_id)
    .then(response => response.json())
    .then(data => {
      const challenge_workout_id_get = data.id;
      const challenge_workout_name_get = data.name;
      set_challenge_workout_id(challenge_workout_id_get);
      set_challenge_workout_name(challenge_workout_name_get);
      //console.log(challenge_workout_id_get);
      //console.log(challenge_workout_name_get);
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/excercises/workout-excercise-link')
      .then(response => response.json())
      .then(data => { //filters and gets all exercises in the one workout challenge gave
        const challenge_exercises_get = data.filter(exercise => exercise.workout_id === challenge_workout_id);
        const challenge_exercise_ids = challenge_exercises_get.map(exercise => exercise.excercise_id); //again mispelled
        set_challenge_exercises(challenge_exercise_ids)
        //console.log(challenge_exercise_ids)
      });
  }, []);

  useEffect(() => { //taken from inital exercise get but changed to use challenges to filter and to grab names instead of muscles
    fetch('http://localhost:8000/excercises')
      .then(response => response.json())
      .then(data => { //gets all exercise names, same? as getting the muscle names
        const filtered_exercises = data.filter(item => challenge_exercises.includes(item.id));
        const challenge_exercise_names_get = filtered_exercises.reduce((exercise_array, item) => exercise_array.concat(item.name), []);
        //console.log(challenge_exercise_names_get);
        set_challenge_exercises_name(challenge_exercise_names_get);
      });
  }, [exercise_data]);



  return ( //changed to use a box so the spacing looks better
      <Container my={"1%"}>
        <VStack>
          <Heading textAlign={"center"}size="3xl">Welcome to Muscle Minder!</Heading>
          <Box height="50px" />
          <Heading textAlign={"center"} >Muscles not yet worked out:</Heading>
          <Flex gap={"10%"}>
            <StatsContainer text={unexercised_muscles.join(', ')} />
          </Flex>
          <Box height="50px" />
          <Heading textAlign={"center"} >Challenge:</Heading>
          <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Workout</Th>
              <Th>Exercises</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{challenge_workout_name.length > 0 ? challenge_workout_name : "No workouts"}</Td>
              <Td>{challenge_exercises_name.length > 0 ? challenge_exercises_name.join(', ') : "No exercises"}</Td>
            </Tr>
          </Tbody>
          </Table>
        </VStack>
      </Container>
    );
};

export default DashboardPage;
