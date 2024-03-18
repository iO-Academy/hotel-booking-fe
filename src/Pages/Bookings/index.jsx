import {useEffect, useState} from "react";
import Booking from "./BookingsTable/Booking/index.jsx";
import BookingsTable from "./BookingsTable/index.jsx";
import Message from "../../Components/Message/index.jsx";

function Bookings() {
    const [bookings, setBookings] = useState([])
    const [rooms, setRooms] = useState([])
    const [roomFilter, setRoomFilter] = useState(null)

    useEffect(getBookings, [roomFilter]);
    useEffect(getRooms, []);

    function getBookings() {
        let url = 'http://localhost:8000/api/bookings'

        if (roomFilter) {
            url += '?room_id=' + roomFilter
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBookings(data.data)
            })
    }

    function getRooms() {
        fetch('http://localhost:8000/api/rooms')
            .then(res => res.json())
            .then(data => {
                setRooms(data.data)
            })
    }

    function cancelBooking(id) {
        fetch('http://localhost:8000/api/bookings/' + id, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                getBookings()
            })
    }

    function resetFilters() {
        setRoomFilter(null)
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-4xl mb-10'>Upcoming bookings</h1>

            <div className='container mx-auto flex items-center justify-between'>
                <div>
                    <label className='mr-2' htmlFor='rooms'>Filter by room:</label>
                    <select id='rooms' className='border border-1 p-2' onChange={e => setRoomFilter(e.target.value)}>
                        {roomFilter === null ? <option selected>Select</option> : <option>Select</option>}

                        {rooms.map(room => <option value={room.id} key={room.id}>{room.name}</option>)}
                    </select>
                </div>

                <button className='bg-blue-400 p-2 inline-block cursor-pointer' onClick={resetFilters}>Reset</button>

            </div>
            {
                bookings.length !== 0 ?
                    <BookingsTable bookings={bookings} cancelBooking={cancelBooking} /> :
                    <Message message='No bookings found' />
            }

        </div>
    )
}

export default Bookings