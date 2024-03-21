import {useParams} from "react-router-dom";
function BookRoom() {
    const {id} = useParams()
    const [roomName, setRoomName] = useState('')
    const [bookings, setBookings] = useState([])

    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [customer, setCustomer] = useState('')
    const [guests, setGuests] = useState(0)

    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [errors, setErrors] = useState(false)

    const fetchHeaders = useFetchHeaders()

    // Get the room details
    useEffect(() => {
        fetch('http://localhost:8000/api/rooms/' + id, {
            headers: fetchHeaders
        })
            .then(res => res.json())
            .then(data => {
                setRoomName(data.data.name)
            })
    }, [id]);

    useEffect(getBookings, [id]);

    function getBookings() {
        fetch('http://localhost:8000/api/bookings?room_id=' + id, {
            headers: fetchHeaders
        })
            .then(res => res.json())
            .then(data => {
                setBookings(data.data)
            })
    }

    const submit = e => {
        e.preventDefault()
        setSuccessMessage(false)
        setErrorMessage(false)
        setErrors(false)

        fetch('http://localhost:8000/api/bookings', {
            method: 'POST',
            headers: fetchHeaders,
            body: JSON.stringify({
                room_id: id,
                customer,
                start,
                end,
                guests
            })
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(errorData => {
                        if (res.status === 422) {
                            setErrors(errorData.errors)
                        }
                        throw new Error(errorData.message)
                    })
                }
                return res.json()
            })
            .then(data => {
                setSuccessMessage(data.message)
                getBookings()
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
    }

    return (
        <div className='container mx-auto flex gap-10'>
            <form onSubmit={submit} className='mb-10 w-1/2'>
                <h1 className='text-4xl mb-5'>Book the {roomName} room</h1>
                <div className='flex gap-5 mb-10'>
                    <div className='w-1/2'>
                        <label className='block' htmlFor='customer'>Customer name:</label>
                        <input className='w-full border border-1 p-2' type='text' id='customer' required
                               onChange={e => setCustomer(e.target.value)}/>
                        {errors.customer && <p className='text-red-700'>{errors.customer}</p>}
                    </div>
                    <div className='w-1/2'>
                        <label className='block' htmlFor='guests'>How many guests:</label>

                        <input className='w-full border border-1 p-2' type='number' id='guests' required
                               onChange={e => setGuests(e.target.value)}/>
                        {errors.guests && <p className='text-red-700'>{errors.guests}</p>}
                    </div>
                </div>
                <div className='flex gap-5 mb-10'>
                    <div className='w-1/2'>
                        <label className='block' htmlFor='start'>Start date:</label>
                        <input className='w-full border border-1 p-2' type='date' id='start' required
                               onChange={e => setStart(e.target.value)}/>
                        {errors.start && <p className='text-red-700'>{errors.start}</p>}
                    </div>
                    <div className='w-1/2'>
                        <label className='block' htmlFor='end'>End date:</label>
                        <input className='w-full border border-1 p-2' type='date' id='end'  required
                               onChange={e => setEnd(e.target.value)}/>
                        {errors.end && <p className='text-red-700'>{errors.end}</p>}
                    </div>
                </div>
                <div className='text-center'>
                    <input className='cursor-pointer bg-blue-400 hover:bg-blue-300 text-xl px-5 py-2' type='submit' value='Book' />
                </div>
                {successMessage && <p className='mt-5'>{successMessage}</p>}
                {(errorMessage && !errors) && <p className='mt-5 text-red-700 text-xl'>Error: {errorMessage}</p>}
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
import useFetchHeaders from "../../Hooks/useFetchHeaders.js";

export default BookRoom