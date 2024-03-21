import {useEffect, useState} from "react";
import ReportItem from "./ReportItem/index.jsx";

function Report() {
    const [report, setReport] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/api/bookings/report')
            .then(res => res.json())
            .then(data => {
                setReport(data.data)
            })
    }, []);

    return (
        <div className='container mx-auto'>
            <h1 className='text-4xl'>Bookings report</h1>
            <table className='border border-1 w-full mt-10'>
                <thead>
                <tr className='bg-gray-100'>
                    <th className='border-1 border p-5'>Room</th>
                    <th className='border-1 border p-5'>Total number of bookings</th>
                    <th className='border-1 border p-5'>Average booking duration</th>
                </tr>
                </thead>
                <tbody>
                {report.map(room => <ReportItem key={room.id} roomId={room.id} room={room.name} bookingCount={room.booking_count} bookingDuration={room.average_booking_duration} />)}
                </tbody>
            </table>

        </div>
    )
}

export default Report