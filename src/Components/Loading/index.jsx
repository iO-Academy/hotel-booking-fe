import spinner from '../../assets/spinner.gif'
function Loading() {
    return (
        <div className='flex justify-center'>
            <img src={spinner} />
        </div>
    )
}

export default Loading