import Footer from "./footer";
import Link from "next/link";
import Layout from "./layout";
import { useRouter } from "next/router";
export default function Welcome() {
    const Router = useRouter();
    return (
        <div className="welcome">
            {/* 
                Layout Component:
                - Passes the current page (`router.pathname`) as a prop to the Layout component.
                - This allows the Layout component to conditionally render UI elements based on the current route.
            */}
            <Layout page={`${Router.pathname}`} />

            {/* 
                Main Heading:
                - Displays the title of the application.
            */}
            <h1>Arithmetic Quiz</h1>

            {/* 
                Difficulty Section:
                - Contains a button that links to the `/saveData` page using Next.js's `Link` component.
            */}
            <div className="difficulty">
                <button>
                    <Link href="/saveData">Get Started</Link>
                </button>
            </div>

            {/* 
                Footer Component:
                - Displays the footer at the bottom of the page.
            */}
            <Footer />
        </div>
    );
}