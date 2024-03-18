import {useEffect, useState} from "react";
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
    const [errors, setErrors] = useState(false)

    useEffect(() => {
        setErrorMessage(false)
        let url = 'http://localhost:8000/api/rooms'

        if (guestsFilter || typeFilter || startFilter || endFilter) {
            url += '?'
        }

        if (guestsFilter) {
            url += `guests=${guestsFilter}&`
        }

        if (typeFilter) {
            url += `type=${typeFilter}&`
        }

        if (startFilter && endFilter) {
            url += `start=${startFilter}&end=${endFilter}&`
        }


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
                            setErrors(errorData.errors)
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
    }, [endFilter, guestsFilter, startFilter, typeFilter]);

    useEffect(() => {
        fetch('http://localhost:8000/api/types')
            .then(res => res.json())
            .then(data => {
                setTypes(data.data)
            })
    }, []);

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
                    {errors.guests && <p className='text-red-700 absolute'>{errors.guests}</p>}
                </div>

                <div>
                    <label className='mr-2' htmlFor='types'>Room type:</label>
                    <select className='border border-1 p-2' id='types' onChange={e => setTypeFilter(e.target.value)}>
                        {typeFilter === null ? <option selected>Select</option> : <option>Select</option>}
                        {types.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                    </select>
                    {errors.type && <p className='text-red-700 absolute'>{errors.type}</p>}
                </div>

                <div className='flex'>
                    <div>
                        <label className='mr-2' htmlFor='start'>Available from:</label>
                        <input className='border border-1 p-2' type='date' id='start'
                               onChange={e => setStartFilter(e.target.value)} value={startFilter ?? 'mm/dd/yyyy'}/>
                        {errors.start && <p className='text-red-700 absolute'>{errors.start}</p>}
                    </div>

                    <div>
                        <label className='mr-2 ml-2' htmlFor='start'>Available to:</label>
                        <input className='border border-1 p-2' type='date' id='end'
                               onChange={e => setEndFilter(e.target.value)} value={endFilter ?? 'mm/dd/yyyy'}/>
                        {errors.end && <p className='text-red-700 absolute'>{errors.end}</p>}
                    </div>

                </div>

                <button className='bg-blue-400 p-2 inline-block cursor-pointer' onClick={resetFilters}>Reset</button>
            </div>

            <div className='container mx-auto grid grid-cols-3 gap-5 mt-10'>
                {rooms.map(room => <RoomListItem key={room.id} id={room.id} name={room.name} min={room.min_capacity}
                                                 max={room.max_capacity} type={room.type.name} image={room.image}/>)}
            </div>
            {(errorMessage && !errors) &&
                <Message message={errorMessage} error={true} />
            }
            {(rooms.length === 0 && !errorMessage) &&
                <Message message='Sorry, no rooms found matching your search' />
            }
        </>
    )
}

export default Home;