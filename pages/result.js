import React, { useState } from "react";
import Footer from "./footer";
import Layout from "./layout";
import { useRouter } from "next/router";

export default function Result() {
    const Router = useRouter();
    const [activeSection, setActiveSection] = useState("all"); // State to manage the active section (all, correct, wrong)

    // Retrieve data from query parameters
    const {
        questions: questionsString,
        answers: answersString,
        userAnswers: userAnswersString,
        status: statusString,
        score: scoreString,
    } = Router.query;

    // Parse query parameters
    const questions = JSON.parse(questionsString || "[]"); // Parse questions from query
    const answers = JSON.parse(answersString || "[]"); // Parse correct answers from query
    const userAnswers = JSON.parse(userAnswersString || "[]"); // Parse user answers from query
    const status = JSON.parse(statusString || "[]"); // Parse answer status (correct/wrong) from query
    const score = parseInt(scoreString || "0"); // Parse score from query

    // Filter correct and wrong answers
    const correctAnswers = questions.filter((_, index) => status[index]); // Filter correct answers
    const wrongAnswers = questions.filter((_, index) => !status[index]); // Filter wrong answers

    return (
        <>
            {/* 
                Layout Component:
                - Passes the current page (`router.pathname`) as a prop to the Layout component.
            */}
            <Layout page={`${Router.pathname}`} />

            <div className="last">
                {/* 
                    Quiz Results Header:
                    - Displays the quiz results and the user's score.
                */}
                <h1>Quiz Results</h1>
                <p>Your Score: {score}</p>

                {/* 
                    Button Group:
                    - Buttons to filter the results (all, correct, wrong).

                */}
                <div className="button-group">
                    <button onClick={() => setActiveSection("all")}>All Answers</button>
                    <button onClick={() => setActiveSection("correct")}>Correct Answers</button>
                    <button onClick={() => setActiveSection("wrong")}>Wrong Answers</button>
                </div>

                {/* 
                    All Answers Section:
                    - Displays all questions, user answers, and correct answers.
                */}
                {activeSection === "all" && (
                    <div className="section">
                        <h2>All Questions and Answers</h2>
                        {questions.length ? (questions.map((question, index) => (
                            <div
                                key={index}
                                className="result"
                                style={{ backgroundColor: status[index] ? "#92d050" : "#ff0000" }} // Green for correct, red for wrong
                            >
                                <p><strong>Question {index + 1}:</strong> {question}</p>
                                <p><strong>Your Answer:</strong> {userAnswers[index] || "No answer"}</p>
                                <p><strong>Correct Answer:</strong> {answers[index]}</p>
                            </div>
                        ))
                    ):(
                        <p>No answers.</p> // Display message if no answers
                    )}
                    </div>
                )}

                {/* 
                    Correct Answers Section:
                    - Displays only the correct answers.
                */}
                {activeSection === "correct" && (
                    <div className="section">
                        <h2>Correct Answers</h2>
                        {correctAnswers.length > 0 ? (
                            correctAnswers.map((question, index) => {
                                const originalIndex = questions.indexOf(question); // Find the original index of the question
                                return (
                                    <div
                                        key={index}
                                        className="result"
                                        style={{ backgroundColor: "#92d050" }} // Green for correct
                                    >
                                        <p><strong>Question {originalIndex + 1}:</strong> {question}</p>
                                        <p><strong>Your Answer:</strong> {userAnswers[originalIndex]}</p>
                                        <p><strong>Correct Answer:</strong> {answers[originalIndex]}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No correct answers.</p> // Display message if no correct answers
                        )}
                    </div>
                )}

                {/* 
                    Wrong Answers Section:
                    - Displays only the wrong answers.
                */}
                {activeSection === "wrong" && (
                    <div className="section">
                        <h2>Wrong Answers</h2>
                        {wrongAnswers.length > 0 ? (
                            wrongAnswers.map((question, index) => {
                                const originalIndex = questions.indexOf(question); // Find the original index of the question
                                return (
                                    <div
                                        key={index}
                                        className="result"
                                        style={{ backgroundColor: "#ff0000" }} // Red for wrong
                                    >
                                        <p><strong>Question {originalIndex + 1}:</strong> {question}</p>
                                        <p><strong>Your Answer:</strong> {userAnswers[originalIndex] || "No answer"}</p>
                                        <p><strong>Correct Answer:</strong> {answers[originalIndex]}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No wrong answers.</p> // Display message if no wrong answers
                        )}
                    </div>
                )}
            </div>

            {/* 
                Footer Component:
                - Displays the footer at the bottom of the page
            */}
            <Footer />
        </>
    );
}