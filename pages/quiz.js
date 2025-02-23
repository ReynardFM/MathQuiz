import React, { useEffect, useState } from "react";
import Footer from "./footer";
import { useRouter } from "next/router";
import Layout from "./layout";

// List Component
function QuestionList({ questions, selectedIndex, onQuestionClick, answeredQuestions, status }) {
  return (
    <div className="question-list">
      <h3>Questions</h3>
      <ul>
        {questions.map((question, index) => (
          <li
            key={index}
            onClick={() => !answeredQuestions.includes(index) && onQuestionClick(index)} // Disable click if answered
            style={{
              backgroundColor: answeredQuestions.includes(index)
                ? status[index]
                  ? "#92d050" // Green for correct answers
                  : "#c00000" // Red for incorrect answers
                : selectedIndex === index
                ? "#e0e0e0" // Highlight selected question
                : "#fff", // Default color for unanswered questions
              cursor: answeredQuestions.includes(index) ? "not-allowed" : "pointer", // Change cursor for answered questions
              padding: "5px",
              margin: "5px 0",
              opacity: answeredQuestions.includes(index) ? 0.7 : 1, // Reduce opacity for answered questions
            }}
          >
            Question {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Quiz({ name: propName, difficulty: propDifficulty }) {
    const Router = useRouter();
    const { name, difficulty } = Router.query; // Get name and difficulty from query parameters

    const [questions, setQuestions] = useState([]); // State for storing questions
    const [answers, setAnswers] = useState([]); // State for storing correct answers
    const [userAnswers, setUserAnswers] = useState({}); // State for storing user answers
    const [status, setStatus] = useState([]); // State for tracking correct/incorrect answers
    const [questionIndex, setQuestionIndex] = useState(0); // State for tracking the current question index
    const [tempValue, setTemp] = useState(""); // State for temporary input value
    const [backgroundColor, setBackgroundColor] = useState("#e0e0e0"); // State for background color
    const [button, setButton] = useState("Next"); // State for button text
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // State for tracking answered questions

    // Calculate score dynamically from the status array
    const score = status.filter((s) => s).length;

    // useEffect for Generating Questions
    useEffect(() => {
        if (difficulty) {
            generateQuestion();
        }
    }, [difficulty]);

    // useEffect for Navigating to Result Page
    useEffect(() => {
        if (answeredQuestions.length === questions.length && questions.length) {
            Router.push({
                pathname: "/result",
                query: {
                    questions: JSON.stringify(questions),
                    answers: JSON.stringify(answers),
                    userAnswers: JSON.stringify(userAnswers),
                    status: JSON.stringify(status),
                    score: score,
                },
            });
        }
    }, [answeredQuestions]);

    // Function to Generate Questions
    function generateQuestion() {
        const operators = ["+", "-", "*", "/"];
        let count = 10;
        let newQuestions = [];
        let newAnswers = [];

        while (count--) {
            let numCount, question = "", answer;
            switch (difficulty) {
                case "easy":
                    numCount = 2; // Easy: 2 operands
                    break;
                case "medium":
                    numCount = 3; // Medium: 3 operands
                    break;
                case "hard":
                    numCount = 4; // Hard: 4 operands
                    break;
                default:
                    numCount = 2; // Default to easy
            }
            let numbers = [];
            let ops = [];
            for (let i = 0; i < numCount; i++) {
                numbers.push(Math.floor(Math.random() * 10) + 1); // Random number between 1 and 10
                if (i < numCount - 1) {
                    ops.push(operators[Math.floor(Math.random() * operators.length)]);
                }
            }

            // Ensure division problems result in whole numbers
            for (let i = 0; i < ops.length; i++) {
                if (ops[i] === "/") {
                    numbers[i + 1] = [2, 3, 5, 7, 10].find((n) => numbers[i] % n === 0) || 1;
                }
            }

            // Construct the question string
            question = numbers[0].toString();
            for (let i = 0; i < ops.length; i++) {
                question += ` ${ops[i]} ${numbers[i + 1]}`;
            }

            // Calculate the answer using `eval`
            answer = eval(question);
            newQuestions.push(question);
            newAnswers.push(answer);
        }

        setQuestions(newQuestions);
        setAnswers(newAnswers);
    }

    // Function to Handle Next Question
    const handleNextQuestion = () => {
        // Save the user's answer for the current question
        const updatedUserAnswers = { ...userAnswers, [questionIndex]: tempValue };
        setUserAnswers(updatedUserAnswers);

        // Update the status array
        const newStatus = [...status];
        if (parseFloat(tempValue) === answers[questionIndex]) {
            newStatus[questionIndex] = true;
        } else {
            newStatus[questionIndex] = false;
        }
        setStatus(newStatus);

        // Mark the question as answered
        setAnsweredQuestions((prev) => [...prev, questionIndex]);

        if (questionIndex === questions.length - 1) {
            // Navigate to the Result page with data as query parameters
            if (answeredQuestions.length === questions.length) {
                Router.push({
                    pathname: "/result",
                    query: {
                        questions: JSON.stringify(questions),
                        answers: JSON.stringify(answers),
                        userAnswers: JSON.stringify(updatedUserAnswers),
                        status: JSON.stringify(newStatus),
                        score: score,
                    },
                });
            } else {
                let temp = 1;
                while (answeredQuestions.includes(temp) && temp <= questions.length - 1) {
                    temp++;
                }
                setQuestionIndex(temp);
                if (questionIndex === questions.length - 2) {
                    setButton("Finish");
                } else {
                    setButton("Next");
                }
            }
        } else {
            if (answeredQuestions.length === questions.length) {
                Router.push({
                    pathname: "/result",
                    query: {
                        questions: JSON.stringify(questions),
                        answers: JSON.stringify(answers),
                        userAnswers: JSON.stringify(updatedUserAnswers),
                        status: JSON.stringify(newStatus),
                        score: score,
                    },
                });
            }
            let temp = questionIndex + 1;
            while (answeredQuestions.includes(temp) && temp <= questions.length - 1) {
                temp++;
            }
            if (temp >= questions.length) {
                temp = 1;
                while (answeredQuestions.includes(temp) && temp <= questions.length - 1) {
                    temp++;
                }
            }
            setQuestionIndex(temp);
            if (questionIndex === questions.length - 2) {
                setButton("Finish");
            }
        }
        setTemp("");
    };

    // Function to Handle Question Selection from the List
    const handleQuestionClick = (index) => {
        if (!answeredQuestions.includes(index)) {
            setQuestionIndex(index);
            setTemp(userAnswers[index] || ""); // Load the saved answer for the selected question
        }
    };

    return (
        <div className="quiz">
            {/* 
                Layout Component:
                - Passes the current page (`router.pathname`) as a prop to the Layout component.
            */}
            <Layout page={`${Router.pathname}`} />

            {/* 
                Header Section:
                - Displays the quiz title, difficulty level, user name, and score.
            */}
            <div className="header">
                <h1>Arithmetic Quiz</h1>
                <p>{String(difficulty).charAt(0).toUpperCase() + String(difficulty).slice(1)} Difficulty</p>
                <h2>User: {name}</h2>
                <p>Score: {score}</p>
            </div>

            {/* 
                Content Section:
                - Contains the QuestionList component and the current question with an input field.
            */}
            <div className="content">
                <QuestionList
                    questions={questions}
                    selectedIndex={questionIndex}
                    onQuestionClick={handleQuestionClick}
                    answeredQuestions={answeredQuestions}
                    status={status}
                />

                {/* 
                    Current Question Section:
                    - Displays the current question and an input field for the user's answer.
                */}
                <div className="question" style={{ backgroundColor }}>
                    {questions.length > 0 && (
                        <>
                            <p>Question {questionIndex + 1}:</p>
                            <p>{questions[questionIndex]}</p>
                            <input
                                type="number"
                                value={tempValue}
                                onChange={(e) => setTemp(e.target.value)}
                            />
                        </>
                    )}
                    {/* 
                        Navigation Buttons:
                        - A button to navigate to the next question or finish the quiz.
                    */}
                    <div className="navigation-buttons">
                        <button onClick={handleNextQuestion}>{button}</button>
                    </div>
                </div>
            </div>

            {/* 
                Footer Component:
                - Displays the footer at the bottom of the page.
            */}
            <Footer />
        </div>
    );
}