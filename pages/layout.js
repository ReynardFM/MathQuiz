import Link from "next/link";
import React from "react";

export default function Layout({ page }) {
    return (
        <>
            {/* 
                Navigation Bar:
                - Displays the application title and a navigation menu.
                - Uses Next.js's `Link` component for client-side navigation.
            */}
            <div className="nav">
                <h1 className="title">MathQuiz</h1>

                <nav>
                    <ul>
                        <li>
                            <Link href="/welcome">Home</Link>
                        </li>
                        <li>
                            <Link href="/saveData">Set Difficulty</Link>
                        </li>
                        <li>
                            <Link href="/result">Quiz Result</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* 
                Conditional Rendering Based on Page:
                - Displays a message based on the current page (`page` prop).
                - Uses conditional rendering to show different messages for the 
                  Home, Difficulty, and Result pages.
            */}
            <div>
                {page === "/welcome" && (
                    <div className="welcome-message">
                        <p>Welcome to the Math Quiz App!</p>
                    </div>
                )}

                {page === "/saveData" && (
                    <div className="difficulty-message">
                        <p>Please select your quiz difficulty.</p>
                    </div>
                )}

                {page === "/result" && (
                    <div className="result-message">
                        <p>Here are your quiz results.</p>
                    </div>
                )}
            </div>
        </>
    );
}