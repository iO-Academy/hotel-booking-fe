function Message({message, error = false}) {
    return <div className={'container mx-auto mt-20 text-center' + (error ? ' text-red-700' : '')}><span className='text-4xl'>{message}</span></div>
}

export default Message