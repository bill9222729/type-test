import { useState } from "react";
import styled from "styled-components";
import MemorizeQuestion from "../components/Question";
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

    const initMin = 1;
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

    // 結束的時候
    const handleTimeOut = () => {
        navigate('../type-test/score', { state: { data: allData, endMin: minutes, endSec: seconds, startMin: initMin, startSec: initSec } })
    }

    const Questions = initData.map((item, index) => {
        return <MemorizeQuestion questionText={item.question} key={index} id={index} onFocusFuction={startTimer} onAnswerChange={handleAnswerChange} onTestCompleted={handleTimeOut} />
    });



    return (
        <Container>
            <Header>
                <Logo>打字大會考</Logo>
                <Timer initialMinute={minutes} initialSeconds={seconds} start={timerStart} timeOutFunction={handleTimeOut} timeReturnFuc={handleTimeReturn} />
                <div className="right">
                    <Profile>
                        臺北市校園國小 301 王小明
                    </Profile>
                    <Button onClick={handleTimeOut}>
                        <div>結束</div>
                    </Button>
                </div>
            </Header>
            {Questions}
        </Container>
    );
}

const Container = styled.div`
        height: 100%;
        width: 100%;
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
    width:50px;
    height:25px;
    
    `;

export default TestPage;
