import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ScorePage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [correctRate, setCorrectRate] = useState();
    const [correctNum, setCorrectNum] = useState();
    const [wrongNum, setWrongNum] = useState();
    const [speedPerMin, setSpeedPerMin] = useState();
    const [timeCost, setTimeCost] = useState();

    const anserData = state.data;
    const endMin = state.endMin;
    const endSec = state.endSec + 1;
    const startMin = state.startMin;
    const startSec = state.startSec;

    // 計算花費時間
    const duringTime = ((startMin * 60) + startSec) - ((endMin * 60) + endSec);
    const duringMin = Math.floor(duringTime / 60).toString().padStart(2, '0');
    const duringSec = (duringTime % 60).toString().padStart(2, '0');

    // 計算打對字幾個
    const CountCorrectNum = () => {

        console.log(anserData);
        let correctNumCount = 0;
        let questionCharNum = 0;
        let answerCharNum = 0;
        anserData.forEach((item) => {
            let questionArr = item.question.split('');
            let answerArr = item.answer.split('');
            questionCharNum += questionArr.length;
            answerCharNum += answerArr.length;
            questionArr.forEach((questionChar, index) => {
                if (questionChar === answerArr[index]) {
                    correctNumCount++;
                }
            });
        });
        setCorrectNum(correctNumCount);
        setWrongNum(answerCharNum - correctNumCount);
        setCorrectRate(Math.round(correctNumCount / answerCharNum * 10000) / 100);
        setSpeedPerMin(Math.floor(answerCharNum / duringTime) * 60);
    }

    // 回首頁
    const handleBackHomeButton = () => {
        navigate('../type-test/test');
    }

    useEffect(() => {
        CountCorrectNum();
        return () => {

        }
    }, []);

    return (
        <Container>
            <Header>
                <Logo>打字大會考</Logo>
                <div className="right">
                    <Profile>
                        臺北市校園國小 301 王小明
                    </Profile>
                    <Button onClick={handleBackHomeButton}>
                        <div>回首頁</div>
                    </Button>
                </div>
            </Header>
            <Wrapper>
                <Title>
                    <div>
                        打字成績
                    </div>
                </Title>
                <Scores>
                    <ScoresItem><div className="left">正確率：</div><div className="right">{isNaN(correctRate) ? "0" : correctRate}%</div></ScoresItem>
                    <ScoresItem><div className="left">打對字：</div><div className="right">{correctNum}</div></ScoresItem>
                    <ScoresItem><div className="left">打錯字：</div><div className="right">{wrongNum}</div></ScoresItem>
                    <ScoresItem><div className="left">速度：</div><div className="right">{speedPerMin} 字/每分鐘</div></ScoresItem>
                    <ScoresItem><div className="left">花費時間：</div><div className="right">{duringMin === "-1" ? "00" : duringMin}：{duringSec === "-1" ? "00" : duringSec}</div></ScoresItem>
                </Scores>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    height: 70%;
    width: 80%;
    flex-direction: column;
    background-color:#FFF2BD;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 7%;
    border-radius: 20px;
`;

const Header = styled.div`
    width: 100%;
    display:flex;
    justify-content: space-between;
    .right{
        display: flex;
    }
`;

const Logo = styled.div`
    font-size: 3rem;
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
  width:70px;
  height:25px;
  
`;

const Title = styled.div`
    font-size: 2rem;
    display:flex;
    justify-content: center;
    align-items: center;
`;

const Scores = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  background-color:#fff;
  width:90%;
  height:70%;
`;

const ScoresItem = styled.div`
  display:flex;
  width:100%;
  justify-content: center;
  font-size:2rem;
  .left{
    display:flex;
    justify-content: flex-end;
    width:50%
    };
 .right{
     display:flex;
     justify-content: flex-start;
     width:50%
     };
`;

export default ScorePage
