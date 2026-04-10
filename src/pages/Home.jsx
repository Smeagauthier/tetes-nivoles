import Navbar from "../components/layout/Navbar";
import Hero from "../components/Hero";

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