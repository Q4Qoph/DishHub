import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import coverImg from "./assets/img/sandwich.jpg";
import { login, logout as destroy } from "./utils/auth";
import Cover from "./components/utils/Cover";
import { Notification } from "./components/utils/Notifications";
import Recipes from "./components/recipe/Recipes";


const App = function AppWrapper() {
  const isAuthenticated = window.auth.isAuthenticated;
  const principal = window.auth.principalText;



  return (
    <>
    <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <main>
            <Recipes />
          </main>
        </Container>
      ) : (
        <Cover name="" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default App;
