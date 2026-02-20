import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/search" element={<Search />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
