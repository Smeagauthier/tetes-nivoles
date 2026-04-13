import { Routes, Route } from "react-router-dom";
import Site from "./Site";
import AdminApp from "./admin/AdminApp";

export default function App() {
    return (
        <Routes>
            <Route path="/*"       element={<Site />} />
            <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
    );
}