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

    const handleAnserChange = (val) => {
        let inputValue = val.target.value;
        setAnswer(inputValue);
        onAnswerChange(inputValue, id);
        let allInput = inputDom.current.parentElement.parentElement.getElementsByTagName("input");
        let nextElement = allInput[id + 1];
        if (question.length - 1 === answer.length) {
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
        <Container className="App">
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
            <input ref={inputDom} value={answer} onChange={handleAnserChange} onKeyDown={handleKeyPress} onFocus={onFocusFuction} />
        </Container>
    );
}

const Container = styled.div`
`;

const QuestionContainer = styled.div`
  display: flex;
`;

export default Question
