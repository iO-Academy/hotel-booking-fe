import {Link} from "react-router-dom";
import useDateFormat from "../../../../Hooks/useDateFormat.js";

function Booking({id, room, roomId, start, end, customer, cancel}) {
    const formattedStart = useDateFormat(start)
    const formattedEnd = useDateFormat(end)

    return (
        <tr className='even:bg-gray-100'>
            <td className='border-1 border p-5'>
                <Link to={'/room/' + roomId}>{room}</Link>
            </td>
            <td className='border-1 border p-5'>
                {formattedStart}
            </td>
            <td className='border-1 border p-5'>
                {formattedEnd}
            </td>
            <td className='border-1 border p-5'>
                {customer}
            </td>
            <td className='border-1 border p-5 bg-red-500 text-center cursor-pointer' onClick={() => cancel(id)}>
                Cancel Booking
            </td>
        </tr>
    )
}

export default Booking