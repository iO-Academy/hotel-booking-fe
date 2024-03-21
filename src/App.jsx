import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/index.jsx";
import Nav from "./Components/Nav/index.jsx";
import SingleRoom from "./Pages/SingleRoom/index.jsx";
import BookRoom from "./Pages/BookRoom/index.jsx";
import Bookings from "./Pages/Bookings/index.jsx";
import Footer from "./Components/Footer/index.jsx";
import Report from "./Pages/Report/index.jsx";
import {useEffect, useState} from "react";
import Message from "./Components/Message/index.jsx";

function App() {
    const [apiActive, setApiActive] = useState(true)

    useEffect(() => {
        fetch('http://localhost:8000/api/rooms')
            .catch(() => {
                    setApiActive(false)
            })
    }, []);
    return (
        <>
        {apiActive ? (
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/room/:id" element={<SingleRoom />} />
                    <Route path="/book/:id" element={<BookRoom />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/report" element={<Report />} />
                </Routes>

                <Footer />
            </BrowserRouter>
        ) : <Message message="Fatal error - API appears to be offline" error={true} /> }
        </>

    )
}

export default App
