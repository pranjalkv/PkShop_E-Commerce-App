import 'bootstrap/dist/css/bootstrap.min.css';
import "./Success.css"
import { FcApproval } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

function Success({propId})
{
    const navi=useNavigate()
    return(
        <>
        <div className='d-flex justify-content-center flex-column align-items-center success-div w-100'>
            <p><FcApproval/></p>
            <h2 className='text-center m-1'>Your Order has been placed Successfully with ID:{propId}</h2>
            <button className='btn btn-primary btn-lg mt-4' onClick={()=>navi("/")}>Go Home</button>
        </div>
        </>
    )
}

export default Success