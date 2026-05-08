import { BrowserRouter, Routes, Route } from "react-router-dom";
import Site from "./Site";
import AdminApp from "./admin/AdminApp";
import MentionsLegales from "./pages/MentionsLegales";
import ScrollTopButton from "./components/ui/ScrollToTop";

import MainLayout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";

export default function App() {
    return (
            <Routes>
                <Route
                    path="/*"
                    element={
                        <MainLayout>
                            <Site />
                            <ScrollTopButton />
                        </MainLayout>
                    }
                />

                <Route
                    path="/admin/*"
                    element={
                        <AdminLayout>
                            <AdminApp />
                        </AdminLayout>
                    }
                />

                <Route
                    path="/mentions-legales"
                    element={
                        <MainLayout>
                            <MentionsLegales />
                        </MainLayout>
                    }
                />
            </Routes>
    );
}