import { useRef, useState } from "react";
import styled from "styled-components";
import TestPage from "./pages/TestPage";
import ScorePage from "./pages/ScorePage";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Container className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TestPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/score" element={<ScorePage />} />
        </Routes>
      </Router>
    </Container>
  );
}

const Container = styled.div`
`;

export default App;
