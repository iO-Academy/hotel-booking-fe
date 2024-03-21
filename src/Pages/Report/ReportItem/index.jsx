import {Link} from "react-router-dom";

function ReportItem({roomId, room, bookingCount, bookingDuration}) {
    return (
        <tr className='even:bg-gray-100'>
            <td className='border-1 border p-5'>
                <Link to={'/room/' + roomId}>{room}</Link>
            </td>
            <td className='border-1 border p-5'>
                {bookingCount}
            </td>
            <td className='border-1 border p-5'>
                {bookingDuration}
            </td>
        </tr>
    )
}

export default ReportItem