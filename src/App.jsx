import { Route, Routes} from "react-router-dom";
import Site from "./Site";
import AdminApp from "./admin/AdminApp";
import MainLayout from "./components/layout/Layout.jsx";

import MentionsLegales from "./pages/MentionsLegales.jsx";

export default function App() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/*"       element={<Site />} />
                <Route path="/admin/*" element={<AdminApp />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
            </Routes>
        </MainLayout>
    );
}