import { useState } from "react";
import styled from "styled-components";
import Question from "../components/Question";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

const TestPage = () => {

    const initData = [
        {
            question: "我有一隻小毛驢",
            answer: "",
        },
        {
            question: "我從來也不騎",
            answer: "",
        },
        {
            question: "有一天我心血來潮",
            answer: "",
        },
    ];

    const initMin = 10;
    const initSec = 10;
    const navigate = useNavigate();

    const [allData, setAllData] = useState(initData);
    const [minutes, setMinutes] = useState(initMin);
    const [seconds, setSeconds] = useState(initSec);
    const [timerStart, setTimerStart] = useState(false);


    // 處理輸入答案
    const handleAnswerChange = (value, questionId) => {
        let newData = [...allData];
        newData[questionId].answer = value;
        setAllData([...newData]);
    }

    // 開始計時
    const startTimer = () => {
        setTimerStart(true);
    }

    // 接收計時器回傳的時間
    const handleTimeReturn = (min, sec) => {
        setMinutes(min);
        setSeconds(sec);
    }

    // 計時器結束的時候
    const handleTimeOut = () => {
        navigate('score', { state: { data: allData, endMin: minutes, endSec: seconds, startMin: initMin, startSec: initSec } })
    }

    const Questions = initData.map((item, index) => {
        return <Question questionText={item.question} key={index} id={index} onFocusFuction={startTimer} onAnswerChange={handleAnswerChange} onTestCompleted={handleTimeOut} />
    });



    return (
        <Container className="App">
            {Questions}
            <Timer initialMinute={minutes} initialSeconds={seconds} start={timerStart} timeOutFunction={handleTimeOut} timeReturnFuc={handleTimeReturn} />
        </Container>
    );
}

const Container = styled.div`
`;

export default TestPage;
