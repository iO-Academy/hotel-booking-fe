import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function SingleRoom() {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const [rate, setRate] = useState('')


    useEffect(() => {
        fetch('http://localhost:8000/api/rooms/' + id)
            .then(res => res.json())
            .then(data => {
                setName(data.data.name)
                setType(data.data.type.name)
                setDescription(data.data.description)
                setImage(data.data.image)
                setMin(data.data.min_capacity)
                setMax(data.data.max_capacity)
                setRate(data.data.rate)
            })
    }, []);

    return (
        <div className='container mx-auto'>
            <div className='flex gap-5 mb-6'>
                <div className='w-1/2'>
                    <div className='flex items-center mb-5 gap-10'>
                        <h1 className='text-4xl'>{name} Room</h1>
                        <span className='text-xl bg-blue-400 p-2 inline-block'>{type}</span>
                    </div>
                    <h3 className='text-2xl mb-1 mt-3'>Accommodates</h3>
                    <p>{min} - {max} guests</p>
                    <h3 className='text-2xl mb-1 mt-3'>Rate</h3>
                    <p>£{rate} per night</p>
                    <h3 className='text-2xl mb-1 mt-3'>Description</h3>
                    <p>{description}</p>
                </div>

                <div className='w-1/2 flex justify-center'>
                    <img src={image}/>
                </div>
            </div>
            <div className='text-center'>
                <Link className='bg-emerald-400 text-2xl px-4 py-2 inline-block ' to={'/book/' + id}>Book Room</Link>
            </div>
        </div>
    )
}

export default SingleRoom