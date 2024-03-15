import {useEffect, useState} from "react";
import RoomListItem from "./RoomListItem/index.jsx";

function Home() {
    const [rooms, setRooms] = useState([])
    const [guestsFilter, setGuestsFilter] = useState(null)
    const [typeFilter, setTypeFilter] = useState(null)
    const [startFilter, setStartFilter] = useState(null)
    const [endFilter, setEndFilter] = useState(null)
    const [types, setTypes] = useState([])

    useEffect(() => {
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

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setRooms(data.data)
            })
    }, [endFilter, guestsFilter, startFilter, typeFilter]);

    useEffect(() => {
        fetch('http://localhost:8000/api/types')
            .then(res => res.json())
            .then(data => {
                setTypes(data.data)
            })
    }, []);

    return (
        <>
            <div>
                <label htmlFor='guests'># of guests</label>
                <input className='border border-1 p-2' type='number' id='guests'
                       onChange={e => setGuestsFilter(e.target.value)}/>

                <label htmlFor='types'>Room type</label>
                <select className='border border-1 p-2' id='types' onChange={e => setTypeFilter(e.target.value)}>
                    {types.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>


                <label htmlFor='start'>Available from</label>
                <input className='border border-1 p-2' type='date' id='start' onChange={e => setStartFilter(e.target.value)}/>
                <label htmlFor='start'>Available to</label>
                <input className='border border-1 p-2' type='date' id='end' onChange={e => setEndFilter(e.target.value)}/>
            </div>

            <div className='container mx-auto grid grid-cols-3 gap-5'>
                {rooms.map(room => <RoomListItem key={room.id} id={room.id} name={room.name} min={room.min_capacity}
                                                 max={room.max_capacity} type={room.type.name} image={room.image}/>)}
            </div>
        </>

    )
}

export default Home;