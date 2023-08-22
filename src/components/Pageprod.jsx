import { useEffect, useState ,useContext } from "react";
import "./Pageprod.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams ,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { yourCart } from "./Slices/Carter";
import { db } from "../Firebase";
import { doc,updateDoc,getDoc,increment,setDoc} from "firebase/firestore";
import AuthInfo from "./Context/Authuser";

function Pageprod()
{
    const [data,setData]=useState([])
    const dispatch=useDispatch()
    const {ids}=useParams()
    const {userName,userid}=useContext(AuthInfo)
    const naviC=useNavigate()
    useEffect(()=>
    {
        async function fetcher()
        {
            const prod=await fetch(`https://fakestoreapi.com/products/${ids}`)
            const getProd=await prod.json();
            setData(getProd)
        }
        fetcher()
    },[ids])


    async function btnprodAdd(ele)
    {
        dispatch(yourCart(ele))

         if(userid)
      {
        let foldId=userid+ele.id;
        const userCart=await getDoc(doc(db,"cart_data",foldId))
        if(!userCart.exists())
        {
        await setDoc(doc(db,"cart_data",foldId),{
          id:ele.id,
          name:ele.title,
          price:ele.price,
          image:ele.image,
          count:1,
          carUid:userid
        })
      }
      else
      {
        await updateDoc(doc(db,"cart_data",foldId),{
          count:increment(1)
        })
      }
      }
    }
    async function btnBuy(ele)
    {
      dispatch(yourCart(ele))

         if(userid)
      {
        let foldId=userid+ele.id;
        const userCart=await getDoc(doc(db,"cart_data",foldId))
        if(!userCart.exists())
        {
        await setDoc(doc(db,"cart_data",foldId),{
          id:ele.id,
          name:ele.title,
          price:ele.price,
          image:ele.image,
          count:1,
          carUid:userid
        })
      }
      else
      {
        await updateDoc(doc(db,"cart_data",foldId),{
          count:increment(1)
        })
      }
      
      }
      naviC("/cart");
    }
   return(
     <section id="prod-sec">
            <div className="the-prod-div w-100">
              <div className="row prod-row p-1 mt-3 w-75">
                    <div className="col-lg-3 col-md-4 col-sm-12 d-flex justify-content-center" >
                        <img className="img-prod" src={data?.image} alt="" />
                    </div>
                     <div className="col-lg-9 col-md-8 col-sm-12 p-2" >
                        <p className="prod-title">{data?.title}</p>
                        <p className="prod-categ">{data?.category}</p>
                        <div className='d-flex align-items-center justify-content-between'>
                        <p className="prod-price text-end">${data?.price}/-</p>
                        </div>
                        <p>{data?.description}</p>
                                <button className="btn btn-view" onClick={()=>btnBuy(data)}>
                            Buy Now
                        </button>
                        <button className="btn btn-warning m-2" 
                        onClick={()=>btnprodAdd(data)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
                </section>
   ) 
}
export default Pageprod