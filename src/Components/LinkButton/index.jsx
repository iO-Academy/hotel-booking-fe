import {Link} from "react-router-dom";

function LinkButton({href, text}) {
    return (
        <Link className='bg-emerald-400 hover:bg-emerald-300 text-2xl px-4 py-2 inline-block' to={href}>{text}</Link>
    )
}

export default LinkButton