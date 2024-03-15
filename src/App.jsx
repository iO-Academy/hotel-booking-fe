import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/index.jsx";
import Nav from "./Components/Nav/index.jsx";
import SingleRoom from "./Pages/SingleRoom/index.jsx";
import BookRoom from "./Pages/BookRoom/index.jsx";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/room/:id" element={<SingleRoom />} />
                <Route path="/book/:id" element={<BookRoom />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
