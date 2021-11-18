import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

const ScorePage = () => {
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


    console.log(duringMin, duringSec);


    useEffect(() => {
        CountCorrectNum();
        return () => {

        }
    }, []);

    return (
        <div>
            <div>正確率：{correctRate}%</div>
            <div>打對字：{correctNum}</div>
            <div>打錯字：{wrongNum}</div>
            <div>速度：{speedPerMin} 字/每分鐘</div>
            <div>花費時間：{duringMin}：{duringSec}</div>
        </div>
    )
}

export default ScorePage
