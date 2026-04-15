import { Routes, Route } from "react-router-dom";
import Site from "../Site.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Site />} />
        </Routes>
    );
}