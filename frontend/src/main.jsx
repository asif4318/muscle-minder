import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./Login.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import SideNavBar from "./components/SideNavBar.jsx";
import RightBar from "./components/RightBar.jsx";
import LogWorkoutPage from "./pages/LogWorkoutPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <DashboardPage />,
  },
  {
    path: "log",
    element: <LogWorkoutPage />,
  },
  {
    path: "activity",
    element: <ActivityPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Grid templateColumns="15% 1fr 25%" height="100vh">
        <SideNavBar />
        <GridItem height="100%">
          <RouterProvider router={router}></RouterProvider>
        </GridItem>
        <RightBar />
      </Grid>
    </ChakraProvider>
  </React.StrictMode>
);
