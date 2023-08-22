import "./Sideopt.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaTimes ,FaFilter} from "react-icons/fa"
import { useDispatch } from "react-redux";
import { sortAb,sortBa ,clearState,above0 ,above21 ,above100, prodData} from "../Slices/Sorter";
import { useEffect, useState } from "react";

function Sideopt({propApi})
{
    const currurl=window.location.pathname;
    const[btnactive ,setBtnactive]=useState(false);
    const[openFilter,setOpenfilter]=useState(false)
    const[priceBtn ,setProicebtn]=useState("");

    function winsize()
    {
        if(window.innerWidth<=768)
        {
            setOpenfilter(false)
        }
        else
        {
            setOpenfilter(true)
        }
    }

    useEffect(()=>
    {
        window.addEventListener("resize",winsize)
        return()=>window.removeEventListener("resize",winsize)
    },[openFilter])
    function abov0Click(e)
    {
        disSort(clearState())
        disSort(above0())
       setProicebtn(e.target.id)  
    }

       function abov21Click(e)
    {
         disSort(clearState())
        disSort(above21())
        setProicebtn(e.target.id)  
    }

        function abov100Click(e)
    {
         disSort(clearState())
         disSort(above100())
         setProicebtn(e.target.id)  
    }
    function menClick()
    {
        disSort(prodData(propApi))
        setBtnactive(false);

    }
    function womenClick()
    {
        disSort(prodData("https://fakestoreapi.com/products/category/women's%20clothing"))
        setBtnactive(true);
    }

    const disSort=useDispatch()
    return(
           <>
        {openFilter && <section id="side-op">
        <div className="opt-div d-flex flex-column justify-content-center">
            {currurl==="/cloth" && <div className="text-center">
               <button  className={`btn btn-outline-dark m-1 ${btnactive ? "":"active"}`}
                 onClick={menClick}>Men's</button>
                  <button  className={`btn btn-outline-dark m-1 ${btnactive ? "active":""}`}
              onClick={womenClick}
              >Women's</button>
            </div>}
            <div className="price-sort d-flex flex-column w-75 pt-5">
            <h5>Sort by Price</h5>
            <button className="price-btn mb-2"  onClick={()=>disSort(sortAb())}>Low to High</button>
            <button className="price-btn"  onClick={()=>disSort(sortBa())}>High to Low</button>
            </div>
            <div className="rating-sort d-flex flex-column w-75 py-5">
                <p>Price Filter</p>
                <button className={`btn btn-outline-dark ${priceBtn == "u20" ? "active":""}`} id="u20"
                onClick={abov0Click}>Under $20</button>
                <button  className={`btn btn-outline-dark my-2 ${priceBtn == "u100" ? "active":""}`} id="u100"
                onClick={abov21Click}>$21-$100</button>
                <button  className={`btn btn-outline-dark ${priceBtn == "abv100" ? "active":""}`} id="abv100"
                 onClick={abov100Click}>Above $100</button>
                 <button type="button" className="btn btn-link my-2 w-25"
             onClick={()=>{disSort(clearState()),setProicebtn("")}}>Clear</button> 
            </div>
        </div>
        <button className="closer" onClick={()=>setOpenfilter(false)}><FaTimes/></button>
        </section>}
        <button className="filter" onClick={()=>setOpenfilter(true)}><FaFilter/></button>
        </>
    )
}

export default Sideopt;