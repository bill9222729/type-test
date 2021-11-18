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

  const handleEndButtonClick = () => {
    alert("點了");
  }

  return (
    <Container className="App">
      <Wrapper>
        <Router>
          <Routes>
            <Route path="/type-test/" element={<TestPage />} />
            <Route path="/type-test/test" element={<TestPage />} />
            <Route path="/type-test/score" element={<ScorePage />} />
          </Routes>
        </Router>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height:100vh;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: #C6F1F8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:10px;
  width:1080px;
  height:600px;
`;

const Header = styled.div`
  display:flex;
  justify-content: space-between;
  .right{
    display: flex;
  }
`;

const Logo = styled.div`

`;

const Profile = styled.div`
  margin-right: 10px;
`;

const Button = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  background-color:#0071BD;
  color:#fff;
  border-radius:5px;
  width:50px;
  height:25px;
  
`;

export default App;
