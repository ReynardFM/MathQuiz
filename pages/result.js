import React, { useState } from "react";
import Footer from "./footer";
import Layout from "./layout";
import { useRouter } from "next/router";

export default function Result() {
    const Router = useRouter();
    const [activeSection, setActiveSection] = useState("all");

    // Retrieve data from query parameters
    const {
        questions: questionsString,
        answers: answersString,
        userAnswers: userAnswersString,
        status: statusString,
        score: scoreString,
    } = Router.query;

    // Parse query parameters
    const questions = JSON.parse(questionsString || "[]");
    const answers = JSON.parse(answersString || "[]");
    const userAnswers = JSON.parse(userAnswersString || "[]");
    const status = JSON.parse(statusString || "[]");
    const score = parseInt(scoreString || "0");

    // Filter correct and wrong answers
    const correctAnswers = questions.filter((_, index) => status[index]);
    const wrongAnswers = questions.filter((_, index) => !status[index]);

    return (
        <>
            <Layout page={`${Router.pathname}`} />
            <div className="last">
                <h1>Quiz Results</h1>
                <p>Your Score: {score}</p>

                <div className="button-group">
                    <button onClick={() => setActiveSection("all")}>All Answers</button>
                    <button onClick={() => setActiveSection("correct")}>Correct Answers</button>
                    <button onClick={() => setActiveSection("wrong")}>Wrong Answers</button>
                </div>

                {activeSection === "all" && (
                    <div className="section">
                        <h2>All Questions and Answers</h2>
                        {questions.map((question, index) => (
                            <div
                                key={index}
                                className="result"
                                style={{ backgroundColor: status[index] ? "#92d050" : "#ff0000" }}
                            >
                                <p><strong>Question {index + 1}:</strong> {question}</p>
                                <p><strong>Your Answer:</strong> {userAnswers[index] || "No answer"}</p>
                                <p><strong>Correct Answer:</strong> {answers[index]}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === "correct" && (
                    <div className="section">
                        <h2>Correct Answers</h2>
                        {correctAnswers.length > 0 ? (
                            correctAnswers.map((question, index) => {
                                const originalIndex = questions.indexOf(question);
                                return (
                                    <div
                                        key={index}
                                        className="result"
                                        style={{ backgroundColor: "#92d050" }}
                                    >
                                        <p><strong>Question {originalIndex + 1}:</strong> {question}</p>
                                        <p><strong>Your Answer:</strong> {userAnswers[originalIndex]}</p>
                                        <p><strong>Correct Answer:</strong> {answers[originalIndex]}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No correct answers.</p>
                        )}
                    </div>
                )}

                {activeSection === "wrong" && (
                    <div className="section">
                        <h2>Wrong Answers</h2>
                        {wrongAnswers.length > 0 ? (
                            wrongAnswers.map((question, index) => {
                                const originalIndex = questions.indexOf(question);
                                return (
                                    <div
                                        key={index}
                                        className="result"
                                        style={{ backgroundColor: "#ff0000" }}
                                    >
                                        <p><strong>Question {originalIndex + 1}:</strong> {question}</p>
                                        <p><strong>Your Answer:</strong> {userAnswers[originalIndex] || "No answer"}</p>
                                        <p><strong>Correct Answer:</strong> {answers[originalIndex]}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No wrong answers.</p>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}