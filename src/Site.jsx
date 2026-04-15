import Navbar   from "./components/layout/Navbar";
import Hero     from "./components/sections/Hero";
import About    from "./components/sections/About";
import Members  from "./components/sections/Members";
import Books from "./components/sections/Books.jsx";
import Contact from "./components/sections/Contact.jsx";
import Events from "./components/sections/Events.jsx";
import Footer from "./components/layout/Footer.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";


export default function Site() {
    return (
        <>
            <HelmetProvider>
                <Toaster position="bottom-right" />
                <Hero />
                <About />
                <Members />
                <Books />
                <Events />
                <Contact />
            </HelmetProvider>
        </>
    );
}