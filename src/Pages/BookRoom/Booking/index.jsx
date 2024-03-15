import useDateFormat from "../../../Hooks/useDateFormat.js";

function Booking({start, end, customer}) {
    const formattedStart = useDateFormat(start)
    const formattedEnd = useDateFormat(end)

    return (
        <div className='even:bg-gray-100 py-5 px-5'>Booked from {formattedStart} to {formattedEnd} by {customer}</div>
    )
}

export default Booking