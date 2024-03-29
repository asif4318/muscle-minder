import { React } from "react";
import { Box, Heading, Container, HStack, Text } from "@chakra-ui/react";

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
      <Heading textAlign={"center"}>Dashboard</Heading>
      <HStack>
        <StatsContainer text={"4/5 Days Excercised"} />
        <StatsContainer text={"45 minutes of Cardio Training"} />
        <StatsContainer text={"x to complete y"} />
      </HStack>
    </Container>
  );
};

export default DashboardPage;
