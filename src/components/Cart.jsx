import 'bootstrap/dist/css/bootstrap.min.css';
import "./Cart.css"
import { useSelector ,useDispatch } from 'react-redux';
import { yourCart ,removeCart ,removeAll ,remove} from './Slices/Carter';
import { useState ,useEffect ,useContext } from 'react';
import Success from './Success';
import AuthInfo from "./Context/Authuser";
import { db } from "../Firebase";
import { doc,collection,query,where,updateDoc,getDocs,addDoc,
  increment,deleteDoc,onSnapshot ,writeBatch} from "firebase/firestore";

function Cart()
{
    const disp=useDispatch()
    const carts=useSelector(state=>state.nameCart)
    const redTotal=carts.reduce((sum,ft)=>sum+(ft.count*ft.price),0)
    const[orderId,setOrderId]=useState();
    const[onSuc,setonSuc]=useState(false);
    const [cartFire,setCartfire]=useState([])

      const {userName ,userid}=useContext(AuthInfo)


    const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };


          useEffect(()=>{
    const currUser=query(collection(db,"cart_data"),where("carUid","==",userid))
          const imgData= onSnapshot(currUser,(snap)=>{
                setCartfire(snap.docs.map((doc) => ({...doc.data(),docid:doc.id})))
                })    
                return ()=>imgData;
  },[userid])

    async function handlePay()
    {
                const ctime={
    year: 'numeric',
 	month: 'long',
 	day: 'numeric',
  hour:'numeric',
  minute:'numeric'
  }

  const ctimefomrat=new Date().toLocaleDateString("en-GB",ctime)
  
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');



    if (!res) {
      alert('Failed to load Razorpay script. Please try again later.');
      return;
    }

    const options = {
      key: 'rzp_test_URYrVPEKWa5G3A', // Replace with your Razorpay key
      amount: Math.ceil(finTotal) * 100, // Amount in paise
      currency: 'USD',
      name: 'PkSHOP',
      description: 'Payment for Order',
      image:"/shop/pay-img1.jpg",
      handler: async(response) => {
        // Handle the payment success response here
        disp(remove())
        setOrderId(response.razorpay_payment_id);
        setonSuc(true);

                       await addDoc(collection(db, "app_orders"),{
                        odId:response.razorpay_payment_id,
          odPrice:Math.ceil(finTotal),
          odName:userName,
          odUid:userid,
          odDate:ctimefomrat
        })
      },

      prefill: {
        // Pre-fill customer details if needed
        name: userName,
        email: "sampletest@test.com",
        contact:"1111111111"
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    }

    function roundItem(num)
    {
        return num.toFixed(2);
    }
     function roundT(numT)
    {
        return Math.ceil(numT);
    }

    function adderFn(item)
    {
      if(userid)
      {
          updateDoc(doc(db,"cart_data",item.docid),{
          count:increment(1)
          })
      }
      else
      {
        disp(yourCart({id:item.id}))
      }
    }

    function subFn(item)
    {
       if(userid)
      {
          updateDoc(doc(db,"cart_data",item.docid),{
          count:increment(-1)
          })
      }
      else
      {
        disp(removeCart(item))
      }
    }

    async function removeWhole(item)
    {
      if(userid)
      {
        await deleteDoc(doc(db, "cart_data", item.docid));
      }
      else
      {
        disp(removeAll({id:item.id}))
      }
    }

     async function emptyCart()
     {
      if(userid)
      {
        const currUser=query(collection(db,"cart_data"),where("carUid","==",userid))
        const batch = writeBatch(db);
         const objectsToDelete = await getDocs(currUser)
            objectsToDelete.forEach((doc)=>{
              batch.delete(doc.ref)
            });
        await batch.commit();
      }
      else
      {
        disp(remove())
      }
     }

    const fireCart=cartFire.reduce((sum,f)=>sum+(f.count*f.price),0)

    let mapData=userid ? cartFire : carts
    let finTotal =userid ? fireCart : redTotal

    return(
        <section id="cart-sec">
            <h2 className='text-center'>Your Cart</h2>
            <div className="the-cart-div">
                {mapData.map((item,i)=><div className="row cart-row p-1 mt-3 d-flex align-items-center" key={i}>
                    <div className="col-lg-3 col-md-4 col-sm-12 d-flex justify-content-center" >
                        <img className="img-cart" src={item?.image} alt="" />
                    </div>
                     <div className="col-lg-9 col-md-8 col-sm-12 p-2" >
                        <p className="cart-title">{item?.title}</p>
                        <p className="cart-categ">{item?.category}</p>
                        <div className='d-flex align-items-center justify-content-between'>
                        <div className="d-flex align-items-center">
                            {item.count>1 && <button className="each-changer" 
                            onClick={()=>subFn(item)}>-</button>}
                            <div className="each-count"><p>{item?.count}</p></div>
                            <button className="each-changer" onClick={()=>adderFn(item)}>+</button>
                        </div>
                        <p className="cart-price text-end"><span>{item?.count} X</span> {item?.price}/-</p>
                        </div>
                        <p className="cart-price-total text-end">={roundItem(item.count*item.price)}/-</p>
                        <div>
                                <button className="btn btn-view">
                            View Product
                        </button>
                        <button className="btn btn-danger m-2" 
                        onClick={()=>removeWhole(item)}>Remove</button>
                        </div>
                    </div>
                </div>)}
            </div>
            {mapData.length==0 && <h4 className="ifempty">No items Added yet</h4>}
            {mapData.length!=0 &&<div className="d-flex justify-content-around total-fixed p-1">
                <div>
                    <button className="btn btn-danger m-2"  onClick={emptyCart}>Remove All</button>
                    <button className="btn btn-view " onClick={handlePay}>Checkout</button>
                </div>
                <div>
                    <p className="cart-price-total"><span style={{color:"black",
                fontWeight:"400"}}>Total</span> = $ {roundT(finTotal)}/-</p>
                </div>
            </div>}
            {onSuc && <Success propId={orderId}></Success>}
        </section>
    )
}
export default Cart;