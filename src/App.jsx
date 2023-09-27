import React from "react";
import { MantineProvider, } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Activate from "./pages/Activate";
import Chat from "./pages/Chat";
import Tool from "./pages/Tool";
import Account from "./pages/Account";
import MindMap from "./pages/MindMap";
import Timeline from "./pages/Timeline";
import Flashcards from "./pages/FlashCards";
import Quiz from "./pages/Quiz";
import History from "./pages/History";
import Favorite from "./pages/Favorite";
import Artefact from "./pages/Artefact";
import Revision from "./pages/Revision";
import Delete from "./pages/Delete";
import Redaction from "./pages/Redaction";
import Conf from "./pages/Conf";
import FPRequest from "./pages/FPRequest";
import FPApply from "./pages/FPApply";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/confidentiality-policies",
    element: <Conf />,
  },
  {
    path: "/forgot-password",
    element: <FPRequest />,
  },
  {
    path: "/reset-password/:token",
    element: <FPApply />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/revision",
    element: <Revision />
  },
  {
    path: "/delete",
    element: <Delete />
  },
  {
    path: "/redaction",
    element: <Redaction />
  },
  {
    path: "/activate",
    element: <Activate />
  },
  {
    path: "/chat/:id",
    element: <Chat />
  },
  {
    path: "/tools/:tool",
    element: <Tool />
  },
  {
    path: "/revision/mind-map",
    element: <MindMap />
  },
  {
    path: "/revision/timeline",
    element: <Timeline />
  },
  {
    path: "/revision/flashcards",
    element: <Flashcards />
  },
  {
    path: "/revision/quiz",
    element: <Quiz />
  },
  {
    path: "/artefacts/:id",
    element: <Artefact />
  },
  {
    path: "/account",
    element: <Account />
  },
  {
    path: "/account/history",
    element: <History />
  },
  {
    path: "/account/favorite",
    element: <Favorite />
  },
]);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return (
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Poppins",
          colorScheme: 'dark',
          loader: "dots",
          colors: {
            dark: [
              "#d5d7e0",
              "#acaebf",
              "#8c8fa3",
              "#666980",
              "#4d4f66",
              "#34354a",
              "#2b2c3d",
              "#1d1e30",
              "#0c0d21",
              "#01010a",
            ],
          },
        }}
      >
        <RouterProvider router={router} />
      </MantineProvider>
    );
  }
}
