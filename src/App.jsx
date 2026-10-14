import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import StudentSupport from "./components/StudentSupport.jsx";

// New page -> start at the top (hash links are handled by the page itself).
function ScrollToTop() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (!hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname, hash]);
    return null;
}

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/studentsupport" element={<StudentSupport />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
