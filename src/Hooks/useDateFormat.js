import { useEffect, useState } from 'react';
import moment from 'moment';

function useDateFormat(initialDate) {
    const [formattedDate, setFormattedDate] = useState('')

    useEffect(() => {
        const date = moment(initialDate, "YYYY-MM-DD").format("DD/MM/YYYY")

        setFormattedDate(date)
    }, [initialDate])

    return formattedDate
}

export default useDateFormat