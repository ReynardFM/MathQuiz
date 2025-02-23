import React, { useState } from "react";
import Footer from "./footer";
import { useRouter } from 'next/router';
import Layout from "./layout";

export default function SaveData() {
    const Router = useRouter();
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(""); // State to track error messages

    // Event Handler for Saving Data and Navigating
    function save(e, selectedDifficulty) {
        e.preventDefault();

        // Validate the name input
        if (!name.trim()) {
            setError("Please enter your name."); // Set error message if name is empty
            return; // Stop further execution
        }

        // Clear any previous error
        setError("");

        // Set the selected difficulty
        setDifficulty(selectedDifficulty);

        // Navigate to the quiz page with name and difficulty as query parameters
        Router.push({
            pathname: "/quiz",
            query: { name, difficulty: selectedDifficulty },
        });
    }

    return (
        <div className="input">
            {/* Layout Component */}
            <Layout page={`${Router.pathname}`} />

            {/* Form for User Input */}
            <form>
                <label htmlFor="name">Enter your name: </label>
                <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError(""); // Clear error when user starts typing
                    }}
                    placeholder="Name"
                />
                {/* Display error message if name is empty */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <p>Pick your difficulty:</p>

                {/* Difficulty Buttons */}
                <div className="difficulty">
                    <button onClick={(e) => save(e, "easy")}>Easy</button>
                    <button onClick={(e) => save(e, "medium")}>Medium</button>
                    <button onClick={(e) => save(e, "hard")}>Hard</button>
                </div>
            </form>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}