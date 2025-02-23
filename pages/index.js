import Welcome from "./welcome";

export default function Home() {
    return (
        <div>
            {/* 
                Welcome Component:
                - Renders the `Welcome` component, which serves as the homepage.
                - The `Welcome` component includes a layout, a heading, a 
                  "Get Started" button, and a footer.
                
            */}
            <Welcome />
        </div>
    );
}