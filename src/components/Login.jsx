import "./Login.css"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth,provider,db } from "../Firebase";
import { signInWithEmailAndPassword  ,signInWithPopup} from "firebase/auth";
import { collection,addDoc} from "firebase/firestore";

function Login({notLog})
{
     const [cred, setCred] = useState( {
    email: "",
    password: ""})

     const[errorMsg,setErrormsg]=useState("")
    const[disbtn,setDisbtn]=useState(false);

     function changer(e)
    {
        setCred({...cred,[e.target.name]:e.target.value})
        console.log(cred)
        setErrormsg("");
    }

    function handleSubmit(e)
    {
      if(cred.email ==="" || cred.password === "")
      {
        setErrormsg("Please fill all the feilds")
        setDisbtn(false)
        return;
      }
       setDisbtn(true);
    signInWithEmailAndPassword(auth, cred.email, cred.password)
      .then(async (res) => {
        setDisbtn(false);
        console.log("uid",res)
      })
      .catch((err) => {
        setDisbtn(false);
        setErrormsg(err.message);
      });
  };

  function handleGlog(e)
  {
    e.preventDefault()

    signInWithPopup(auth,provider).then(async (datalog)=>{

      if(datalog._tokenResponse.isNewUser){
      await addDoc(collection(db, "user_data"),{
        email:datalog.user.email,
        name:datalog.user.displayName,
        uid:datalog.user.uid,
      cart:[],
      orders:[]
      });
      }
      console.log("da",datalog)
    })
    .catch((err)=>{
      setErrormsg(err.message)
    })

  }
    return(

        <section id="login-sec">
        <div className={`login-page ${notLog ?"overlay-login":""}`}>
        <form>                                              
      
      <input
          label="Email"
          type="email"
          name="email"
          value={cred.email}
          placeholder="Enter email address"
        onChange={changer}
        />
        <input
          label="Password"
          type="password"
          name="password"
          value={cred.password}
          placeholder="Enter password"
          onChange={changer}
        />
            <button className="login-btn" onClick={handleSubmit} disabled={disbtn}>
            Login
          </button>
          <p className="error-msg">{errorMsg}</p>
         <hr />
           <button className="google-btn" onClick={handleGlog} disabled={disbtn}>
            <FcGoogle/> Continue with Google
          </button>
        <p>Don't have an account <Link to="/signup">Signup</Link></p>      

    </form>
    </div>
    </section>
    )
}
export default Login