import React from 'react'
import { useRef, useState } from "react";
import styled from "styled-components";

const Question = (
    {
        questionText = "",
        onFocusFuction = null,
        onAnswerChange = null,
        onTestCompleted = null,
        id = 0,
    }) => {
    const [question, setQuestion] = useState(questionText);
    const [answer, setAnswer] = useState("");
    const inputDom = useRef();
    let doing = false;

    const Cstart = (val) => {
        doing = false;
    }

    const Cend = (val) => {
        doing = true;
        handleAnserChange();
    }

    const handleAnserChange = () => {
        let inputValue = inputDom.current.value;
        setAnswer(inputValue);
        onAnswerChange(inputValue, id);
        let allInput = inputDom.current.parentElement.parentElement.getElementsByTagName("input");
        let nextElement = allInput[id + 1];
        if (question.length <= inputValue.length) {
            inputValue = inputValue.substring(0, question.length);
            inputDom.current.value = inputValue;
            if (id === allInput.length - 1) {
                onTestCompleted();
            } else {
                nextElement.focus();
            }
        }
    }

    const handleKeyPress = (event) => {
        let pressKey = event.key;
        let allInput = event.target.parentElement.parentElement.getElementsByTagName("input");
        let nextElement = allInput[id + 1];
        let prevElement = allInput[id - 1];
        if (id < allInput.length - 1 && (pressKey === "Enter" || pressKey === "ArrowDown")) {
            nextElement.focus();
        }

        if (id !== 0 && pressKey === "ArrowUp") {
            const length = prevElement.value.length;
            prevElement.focus();
            event.preventDefault();
            prevElement.setSelectionRange(length, length);
        }
    }


    return (
        <Container>
            <QuestionContainer>
                {
                    question.split('').map((item, index) => {
                        let answerLetter = answer.split('');
                        if (answerLetter.length !== 0 && answerLetter[index] !== undefined) {
                            if (answerLetter[index] === item) {
                                return <div style={{ color: "#272EF0" }} key={index}>{item}</div>
                            } else {
                                return <div style={{ color: "#D11" }} key={index}>{item}</div>
                            }
                        }
                        return <div key={index}>{item}</div>
                    })
                }
            </QuestionContainer>
            <input ref={inputDom} onKeyDown={handleKeyPress} onFocus={onFocusFuction} onCompositionStart={Cstart} onCompositionEnd={Cend} />
            {/* <input ref={inputDom} value={answer} onChange={handleAnserChange} onKeyDown={handleKeyPress} onFocus={onFocusFuction} onCompositionStart={Cstart} onCompositionEnd={Cend} /> */}
        </Container>
    );
}

const Container = styled.div`
    padding:10px 20px;
    input{
        width:100%;
    }
`;

const QuestionContainer = styled.div`
  display: flex;
  width:100%;
`;

const MemorizeQuestion = React.memo(Question);

export default MemorizeQuestion
