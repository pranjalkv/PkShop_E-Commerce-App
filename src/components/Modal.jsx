import "./Modal.css"
import 'bootstrap/dist/css/bootstrap.min.css';
function Modal({msgprop,btnprop})
{
    return(
        <div className="modal-des w-25">
            <div className="head-alert">
                <h2>Alert!</h2>
            </div>
            <div className="msg-alert my-2">
                <p>{msgprop}</p>
            </div>
            <div className="my-2">
                <button className="btn btn-danger mb-2 w-25">{btnprop}</button>
                <button className="btn btn-primary mb-2 mx-2 w-25">No</button>
            </div>
        </div>
    )
}

export default Modal;