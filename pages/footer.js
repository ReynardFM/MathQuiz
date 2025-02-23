import React from "react";
import Link from "next/link";

export default function Footer() {
    return(
        <footer className="footer">
            <Link href="/welcome">Home</Link>

            <div className="footer-content">
                <p>
                The Math Quiz Flashcard App helps you practice arithmetic operations like addition, subtraction, multiplication, and division with customizable difficulty levels.
                Test your skills and track your progress in a simple, engaging way!
                </p>
            </div>
        </footer>
    );
};