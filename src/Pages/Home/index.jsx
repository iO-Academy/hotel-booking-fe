import {useEffect, useMemo, useState} from "react";
import RoomListItem from "./RoomListItem/index.jsx";
import Message from "../../Components/Message/index.jsx";

function Home() {
    const [rooms, setRooms] = useState([])
    const [guestsFilter, setGuestsFilter] = useState(null)
    const [typeFilter, setTypeFilter] = useState(null)
    const [startFilter, setStartFilter] = useState(null)
    const [endFilter, setEndFilter] = useState(null)
    const [types, setTypes] = useState([])
    const [errorMessage, setErrorMessage] = useState(false)
    const [validationErrors, setValidationErrors] = useState(false)

    const getRoomsFetchUrl = useMemo(() => {
        const queryParams = []

        if (guestsFilter) queryParams.push(`guests=${guestsFilter}`)
        if (typeFilter) queryParams.push(`type=${typeFilter}`)
        if (startFilter && endFilter) queryParams.push(`start=${startFilter}&end=${endFilter}`)

        return queryParams.length > 0
            ? `http://localhost:8000/api/rooms?${queryParams.join('&')}`
            : 'http://localhost:8000/api/rooms';
    }, [endFilter, guestsFilter, startFilter, typeFilter])

    useEffect(() => {
        setErrorMessage(false)
        fetchRooms(getRoomsFetchUrl)
    }, [endFilter, guestsFilter, startFilter, typeFilter]);

    useEffect(getTypes, []);

    function getTypes() {
        fetch('http://localhost:8000/api/types')
            .then(res => res.json())
            .then(data => {
                setTypes(data.data)
            })
    }

    function fetchRooms(url) {
        fetch(url, {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(errorData => {
                        setRooms([])
                        if (res.status === 422) {
                            setValidationErrors(errorData.errors)
                        }
                        throw new Error(errorData.message)
                    })
                }
                return res.json()
            })
            .then(data => {
                setRooms(data.data)
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
    }

    function resetFilters() {
        setGuestsFilter(null)
        setTypeFilter(null)
        setStartFilter(null)
        setEndFilter(null)
    }

    return (
        <>
            <div className='container mx-auto flex items-center justify-between'>
                <div>
                    <label className='mr-2' htmlFor='guests'># of guests:</label>
                    <input className='border border-1 p-2' type='number' id='guests' min='1'
                           onChange={e => setGuestsFilter(e.target.value)} value={guestsFilter ?? ''}/>
                    {validationErrors.guests && <p className='text-red-700 absolute'>{validationErrors.guests}</p>}
                </div>

                <div>
                    <label className='mr-2' htmlFor='types'>Room type:</label>
                    <select className='border border-1 p-2' id='types' onChange={e => setTypeFilter(e.target.value)}>
                        {typeFilter === null ? <option selected>Select</option> : <option>Select</option>}
                        {types.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                    </select>
                    {validationErrors.type && <p className='text-red-700 absolute'>{validationErrors.type}</p>}
                </div>

                <div className='flex'>
                    <div>
                        <label className='mr-2' htmlFor='start'>Available from:</label>
                        <input className='border border-1 p-2' type='date' id='start'
                               onChange={e => setStartFilter(e.target.value)} value={startFilter ?? 'mm/dd/yyyy'}/>
                        {validationErrors.start && <p className='text-red-700 absolute'>{validationErrors.start}</p>}
                    </div>

                    <div>
                        <label className='mr-2 ml-2' htmlFor='start'>Available to:</label>
                        <input className='border border-1 p-2' type='date' id='end'
                               onChange={e => setEndFilter(e.target.value)} value={endFilter ?? 'mm/dd/yyyy'}/>
                        {validationErrors.end && <p className='text-red-700 absolute'>{validationErrors.end}</p>}
                    </div>

                </div>

                <button className='bg-blue-400 hover:bg-blue-300 p-2 inline-block cursor-pointer' onClick={resetFilters}>Reset</button>
            </div>

            <div className='container mx-auto grid grid-cols-3 gap-5 mt-10'>
                {rooms.map(room => <RoomListItem key={room.id} id={room.id} name={room.name} min={room.min_capacity}
                                                 max={room.max_capacity} type={room.type.name} image={room.image}/>)}
            </div>
            {(errorMessage && !validationErrors) &&
                <Message message={errorMessage} error={true} />
            }
            {(rooms.length === 0 && !errorMessage) &&
                <Message message='Sorry, no rooms found matching your search' />
            }
        </>
    )
}

export default Home;