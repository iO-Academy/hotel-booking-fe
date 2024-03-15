function Booking({start, end, customer}) {
    return (
        <div className='even:bg-gray-100 py-5 px-5'>Booked from {start} to {end} by {customer}</div>
    )
}

export default Booking