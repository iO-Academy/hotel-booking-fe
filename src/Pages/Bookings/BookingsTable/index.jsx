import Booking from "./Booking/index.jsx";

function BookingsTable({bookings, cancelBooking}) {
    console.log(bookings)
    return (
        <table className='border border-1 w-full mt-10'>
            <thead>
            <tr className='bg-gray-100'>
                <th className='border-1 border p-5'>Room</th>
                <th className='border-1 border p-5'>Start</th>
                <th className='border-1 border p-5'>End</th>
                <th className='border-1 border p-5'>Customer</th>
                <th className='border-1 border p-5'></th>
            </tr>
            </thead>
            <tbody>
            {bookings.map(booking => <Booking
                key={booking.id}
                id={booking.id}
                room={booking.rooms[0].name}
                roomId={booking.rooms[0].id}
                start={booking.start}
                end={booking.end}
                customer={booking.customer}
                cancel={cancelBooking}
            />)}
            </tbody>
        </table>
    )
}

export default BookingsTable