import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero.jsx";

export default function Home() {
    return (
        <>
            <Navbar />

            <section id="home">
                <Hero />
            </section>


        </>
    );
}