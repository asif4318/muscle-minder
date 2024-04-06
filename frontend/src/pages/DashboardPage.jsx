import { React } from "react";
import {
  Box,
  Flex,
  Heading,
  Container,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

const StatsContainer = ({ text }) => {
  return (
    <Container
      backgroundColor={"lightgray"}
      borderRadius=".5rem"
      paddingY={"1rem"}
    >
      <Text>{text}</Text>
    </Container>
  );
};

const DashboardPage = () => {
  return (
    <Container my={"1%"}>
      <VStack space={12}>
        <Heading textAlign={"center"}>Dashboard</Heading>
        <Flex gap={"10%"}>
          <StatsContainer text={"4/5 Days Excercised"} />
          <StatsContainer text={"45 minutes of Cardio Training"} />
          <StatsContainer text={"x to complete y"} />
        </Flex>
      </VStack>
    </Container>
  );
};

export default DashboardPage;
