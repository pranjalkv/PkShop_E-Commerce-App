import "./Signup.css"
import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { auth,db } from "../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection,addDoc } from "firebase/firestore";

function Signup()
{
  const navigate=useNavigate();
     const [cred, setCred] = useState( {name: "",
    email: "",
    password: ""})

    const[errorMsg,setErrormsg]=useState("")
    const[disbtn,setDisbtn]=useState(false);

    function changer(e)
    {
        setCred({...cred,[e.target.name]:e.target.value})

        setErrormsg("");
    }
    async function handleSubmit(e)
    {
      e.preventDefault()
      if(cred.name === "" || cred.password ==="" || cred.email === "")
      {
        setErrormsg("Please fill all the feilds")
        setDisbtn(false)
        return;
      }
       setDisbtn(true);

       createUserWithEmailAndPassword(auth, cred.email, cred.password)
      .then(async (resNew) => {
        setDisbtn(false);
        const user = resNew.user;

        await updateProfile(user, {
          displayName: cred.name,
        });
        await addDoc(collection(db, "user_data"),{
        email:resNew.user.email,
        name:resNew.user.displayName,
        uid:resNew.user.uid,
          cart:[],
         orders:[]
      })
        window.location.reload();
      })
      .catch((err) => {
        setDisbtn(false);
        setErrormsg(err.message);
      });          
  };
  
    return(
        
        <section id="signup">
        <div className="div-signup">
          <h3>Sign up now ,its easy & free</h3>
          <hr />
        <form>
         <input
          label="Name"
          name="name"
          type="text"
          value={cred.name}
          placeholder="Enter your name"
          onChange={changer}
        />
    
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
        <p className="error-msg">{errorMsg}</p>
        <button className="btn-signup" onClick={handleSubmit} disabled={disbtn}>
            Signup
          </button>
          </form>

          <p style={{textAlign:"center"}}>Already have an account or Gmail?<Link to="/login">Login</Link></p>
          </div>
          </section>
    )
}

export default Signup;