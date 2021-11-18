import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    const { initialMinute = 0, initialSeconds = 0, start = false, timeOutFunction = null, timeReturnFuc = null } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (start) {
            let myInterval = setInterval(() => {
                console.log("計時");
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
                timeReturnFuc(minutes, seconds);
            }, 1000)
            return () => {
                clearInterval(myInterval);
            };
        } else {
            return
        }

    });


    return (
        <div>
            {minutes === 0 && seconds === 0
                ? timeOutFunction()
                : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    )
}

export default Timer;