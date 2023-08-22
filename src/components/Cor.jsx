import "./Cor.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Cor()
{
 const naviAll=useNavigate()

    return(
      <>
        <section id="front-slide">
          <div className="car-slider w-100 d-flex justify-content-center p-2 row">
            <div className="header-div col-lg-6 col-md-12 d-flex flex-column justify-content-center
             align-items-center my-3">
              <p>
                Get best products at lesser price
              </p>
              <button className="btn btn-primary btn-lg" onClick={()=>naviAll("/all")}>Shop Now</button>
            </div>
            <div className="col-lg-6 col-md-12">
              <img className="car-img" src="/shop/newback.jpg" alt="" />
            </div>
          </div>
        </section>
      </>
    )
}


export default Cor;