import 'bootstrap/dist/css/bootstrap.min.css';

function Spinner()
{
    return(
        <div className='w-100 vh-100 d-flex justify-content-center align-items-center '>
        <div className="spinner-border text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
</div>
    )
}

export default Spinner;