import {useParams} from "react-router-dom";
function BookRoom() {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [bookings, setBookings] = useState([])
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [customer, setCustomer] = useState('')
    const [guests, setGuests] = useState(0)
    const [successMessage, setSuccessMessage] = useState(false)
    const [errors, setErrors] = useState(false)

    // Get the room details
    useEffect(() => {
        fetch('http://localhost:8000/api/rooms/' + id)
            .then(res => res.json())
            .then(data => {
                setName(data.data.name)
            })
    }, [id]);

    useEffect(getBookings, [id]);

    function getBookings() {
        fetch('http://localhost:8000/api/bookings?room_id=' + id)
            .then(res => res.json())
            .then(data => {
                setBookings(data.data)
            })
    }

    const submit = e => {
        e.preventDefault()
        setSuccessMessage(false)
        setErrors(false)

        fetch('http://localhost:8000/api/bookings', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                room_id: id,
                customer,
                start,
                end,
                guests
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    setErrors(data.errors)
                } else if(!data.success) {
                    setSuccessMessage(data.message)
                }
                else {
                    setSuccessMessage(data.message)
                    getBookings()
                }
            })
    }

    return (
        <div className='container mx-auto flex gap-10'>
            <form onSubmit={submit} className='mb-10 w-1/2'>
                <h1 className='text-4xl mb-5'>Book the {name} room</h1>
                <div className='flex gap-5 mb-10'>
                    <div className='w-1/2'>
                        <label className='block' htmlFor='customer'>Customer name:</label>
                        <input className='w-full border border-1 p-2' type='text' id='customer' required
                               onChange={e => setCustomer(e.target.value)}/>
                    </div>
                    <div className='w-1/2'>
                        <label className='block' htmlFor='guests'>How many guests:</label>
                        <input className='w-full border border-1 p-2' type='number' id='guests' required
                               onChange={e => setGuests(e.target.value)}/>
                    </div>
                </div>
                <div className='flex gap-5 mb-10'>
                    <div className='w-1/2'>
                        <label className='block' htmlFor='start'>Start date:</label>
                        <input className='w-full border border-1 p-2' type='date' id='start' required
                               onChange={e => setStart(e.target.value)}/>
                    </div>
                    <div className='w-1/2'>
                        <label className='block' htmlFor='end'>End date:</label>
                        <input className='w-full border border-1 p-2' type='date' id='end'  required
                               onChange={e => setEnd(e.target.value)}/>
                    </div>
                </div>
                <div className='text-center'>
                    <input className='cursor-pointer bg-blue-400 text-xl px-5 py-2' type='submit' value='Book' />
                </div>
                {successMessage && <p className='mt-5'>{successMessage}</p>}
                {errors.customer ?? ''}
                {errors.guests ?? ''}
                {errors.start ?? ''}
                {errors.end ?? ''}
            </form>
            <div className='w-1/2'>
                <h2 className='text-3xl mb-5'>Current bookings</h2>
                    {bookings.length !== 0 ? (
                        <div className='border border-1'>
                            {bookings.map(booking => <Booking key={booking.id} start={booking.start} end={booking.end} customer={booking.customer}/>)}
                        </div>
                    ) : <p>No bookings found</p>}
            </div>
        </div>
    )
}

import {useEffect, useState} from "react";
import Booking from "./Booking/index.jsx";

export default BookRoom