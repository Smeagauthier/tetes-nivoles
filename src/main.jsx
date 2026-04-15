import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import ScrollToTop from "./components/ui/ScrollToTop";

import "./index.css";
import "./assets/styles/keyframes.css";

import AOS from "aos";
import "aos/dist/aos.css";

function Root() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
        });
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <App />
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);