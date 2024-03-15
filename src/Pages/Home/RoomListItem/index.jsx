import {Link} from "react-router-dom";

function RoomListItem({id, name, min, max, type, image}) {
    return (
        <div className='flex flex-col justify-center'>
            <Link to={'/room/' + id}>
                <h3 className='text-3xl'>{name}</h3>
                <p>{min} - {max} guests</p>
                <div className='relative mt-5'>
                    <img src={image}/>
                    <span className='absolute top-0 left-0 bg-blue-400 p-2 inline-block'>{type}</span>
                </div>
            </Link>
        </div>
    )
}

export default RoomListItem