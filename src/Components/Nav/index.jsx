import {NavLink} from "react-router-dom";

function Nav() {
    const activeClass = ({ isActive}) => isActive ? "bg-blue-300 p-2 text-xl" : "p-2 text-xl"

    return (
        <nav className='mb-10 py-5 bg-blue-400'>
            <div className='container mx-auto'>
                <NavLink className={activeClass} to="/">Home</NavLink>
                <NavLink className={activeClass} to="/bookings">Bookings</NavLink>
            </div>
        </nav>
    )
}

export default Nav