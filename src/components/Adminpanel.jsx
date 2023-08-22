import "./Adminpanel.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { collection,getDocs,query,orderBy} from "firebase/firestore";

function Adminpanel()
{
    const navi=useNavigate();
    const[orders,setOrders]=useState([])
    
    useEffect(()=>
    {
        
        async function adminDocs()
        {
            const col=await getDocs(query(collection(db,"app_orders"),orderBy("odDate","asc")))
            setOrders(col.docs.map((x)=>({...x.data()})))
        }
        adminDocs();
    },[])

    function setUnsign(credin)
    {
        if(!credin)
        {
            return "Not-Logged"
        }
        return credin
    }
    return(
        <section id="admin-sec">
            <div className="d-flex justify-content-between mx-4">
                <h2 className="text-center my-3"></h2>
            <h2 className="text-center my-3">All Orders</h2>
            <button className="btn btn-warning" onClick={()=>navi("/editproducts")}>Edit Products</button>
            </div>
        <table className="table w-100">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Order date</th>
      <th scope="col">User Name</th>
      <th scope="col">userId</th>
      <th scope="col">Actions</th>
      <th scope="col">Od Price</th>
      <th scope="col">OrderID</th>
    </tr>
  </thead>
  {orders.map((ele,i)=><tbody className={`table-${i%2==0 ? "success":"light"}`} key={i}>
    <tr>
      <th scope="row">{i+1}</th>
      <td>{ele?.odDate}</td>
      <td>{setUnsign(ele?.odName)}</td>
      <td>{setUnsign(ele?.odUid)}</td>
      <td>     <select>
                  <option value="Ordered">Ordered</option>
  <option value="Dispatched">Dispatched</option>
  <option value="Delivered">Delivered</option>
</select></td>
<td>${ele?.odPrice}/-</td>
<td>{ele?.odId}</td>
    </tr>
    </tbody>)}
    </table>
        </section>
    )
}

export default Adminpanel