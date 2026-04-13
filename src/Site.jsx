import Navbar   from "./components/layout/Navbar";
import Hero     from "./components/sections/Hero";
import About    from "./components/sections/About";
import Members  from "./components/sections/Members";

export default function Site() {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Members />
        </>
    );
}