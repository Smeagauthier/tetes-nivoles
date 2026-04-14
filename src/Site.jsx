import Navbar   from "./components/layout/Navbar";
import Hero     from "./components/sections/Hero";
import About    from "./components/sections/About";
import Members  from "./components/sections/Members";
import Books from "./components/sections/Books.jsx";
import Contact from "./components/sections/Contact.jsx";

export default function Site() {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Members />
            <Books />
            <Contact />
        </>
    );
}