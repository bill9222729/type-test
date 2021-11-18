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
          <Route path="/type-test/" element={<TestPage />} />
          <Route path="/type-test/test" element={<TestPage />} />
          <Route path="/type-test/score" element={<ScorePage />} />
        </Routes>
      </Router>
    </Container>
  );
}

const Container = styled.div`
`;

export default App;
