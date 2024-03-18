import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Message from "../../Components/Message/index.jsx";
import LinkButton from "../../Components/LinkButton/index.jsx";

function SingleRoom() {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const [rate, setRate] = useState('')
    const [error, setError] = useState(false)


    useEffect(() => {
        fetch('http://localhost:8000/api/rooms/' + id)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(errorData => {
                        throw new Error(errorData.message)
                    })
                }
                return res.json()
            })
            .then(data => {
                setName(data.data.name)
                setType(data.data.type.name)
                setDescription(data.data.description)
                setImage(data.data.image)
                setMin(data.data.min_capacity)
                setMax(data.data.max_capacity)
                setRate(data.data.rate)
            })
            .catch(error => {
                setError(error.message)
            })
    }, [id]);

    return (
        <div className='container mx-auto'>
            {error ?
                (
                    <>
                        <Message message={error} />
                        <div className='text-center mt-10'>
                            <LinkButton href='/' text='Return home' />
                        </div>
                    </>
                ) : (
                    <>
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
                            <LinkButton href={'/book/' + id} text='Book Room' />
                        </div>
                    </>
                )}

        </div>
    )
}

export default SingleRoom