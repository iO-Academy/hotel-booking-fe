import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/index.jsx";
import Nav from "./Components/Nav/index.jsx";
import SingleRoom from "./Pages/SingleRoom/index.jsx";
import BookRoom from "./Pages/BookRoom/index.jsx";
import Bookings from "./Pages/Bookings/index.jsx";
import Footer from "./Components/Footer/index.jsx";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/room/:id" element={<SingleRoom />} />
                <Route path="/book/:id" element={<BookRoom />} />
                <Route path="/bookings" element={<Bookings />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    )
}

export default App
