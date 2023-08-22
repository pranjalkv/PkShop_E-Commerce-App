import './App.css'
import Navbar from './components/Navbar'
import Cor from './components/Cor'
import Electronics from './components/Alllinks/Electronics'
import Cloth from './components/Alllinks/Cloth'
import {Route,Routes ,Navigate} from "react-router-dom"
import Datadis from './components/Datadis'
import All from './components/Alllinks/All'
import { useState ,useEffect} from 'react'
import Cart from './components/Cart'
import Pageprod from './components/Pageprod'
import Login from './components/Login'
import Signup from './components/Signup'
import Adminpanel from './components/Adminpanel'
import {auth} from "./Firebase"
import AuthInfo from "./components/Context/Authuser"
import { onAuthStateChanged } from "firebase/auth"
import Spinner from './components/Spinner'
import Editor from './components/Editor'
import Footer from './components/Footer'


function App() {
   const [userName, setUserName] = useState(null);
    const [userid,setUserid]=useState(null);
    const[loader,setLoader]=useState(true);
      // const[foldId,setfoldId]=useState("")
      //  const[picId,setpicId]=useState("")

  useEffect(() => {
    const log= onAuthStateChanged(auth,(user) => {
      if (user) {
        setUserName(user.displayName);
        setUserid(user.uid)
      } else
       setUserid("");
       setLoader(false)
    });
     return () => log();
  }, []);

  if(loader)
  {
    return <Spinner/>
  }

  return (
    <>
    <AuthInfo.Provider value={{userName ,userid}}>
    <Navbar></Navbar> 
    <Routes>
    <Route
    path="/login"
    element={ userid  ? <Navigate to="/" />:<Login />  }
/>;
    <Route
    path="/signup"
    element={ userid ?  <Navigate to="/" />:<Signup /> }
/>;
      <Route path="/" element={<><Cor/>
      <div style={{marginTop:"1%"}}><Datadis propApi={"https://fakestoreapi.com/products?limit=9"}/>
      </div></>}/>
      <Route path='/all' element={<All propApi={"https://fakestoreapi.com/products"}/>}></Route>
      <Route path="/cloth" element={<Cloth propApi={"https://fakestoreapi.com/products/category/men's%20clothing"}/>}/>
      <Route path="/electronics" element={<Electronics 
      propApi={"https://fakestoreapi.com/products/category/electronics"}/>}/>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/product/:ids" element={<Pageprod/>}></Route>
      <Route path='/adminpanel/v2' element={userid ? <Adminpanel/>:<Navigate to="/" />}></Route>
      <Route path='/editproducts' element={ userid ?  <Editor/>:<Navigate to="/" />}></Route>
    </Routes>
    <Footer></Footer>
    </AuthInfo.Provider>
    </>
  )
}

export default App
