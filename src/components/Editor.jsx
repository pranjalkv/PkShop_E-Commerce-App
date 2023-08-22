import "./Editor.css"
import { addData, prodData ,delData ,updata} from "./Slices/Sorter";
import { useDispatch ,useSelector} from "react-redux";
import { useEffect, useState } from "react";


function Editor()
{
    const dispatch=useDispatch()
    const[editable,setEditable]=useState(false)
    const[uppId,setupId]=useState(0)
    const[Loader,setLoader]=useState(false)
    const[newProd,setNewprod]=useState(
      {
        title:"",
        category:"",
         price:"",
         image:"",

      }
    )
     const editorData=useSelector((state)=>state.nameSort.data)
    useEffect(()=>{
        function getEditData() 
        {
            try
            {
                dispatch(prodData("https://fakestoreapi.com/products"))
            }
            catch(err)
            {
                console.log(err);
            }
        }
        getEditData()
    },[])
    
    function handleChange(e)
    {
      setNewprod({...newProd,
      [e.target.name]:e.target.value})
    }



    function btnaddData(e)
    {
      e.preventDefault()
      dispatch(addData(newProd))
      setNewprod({
        title:"",
        category:"",
         price:"",
         image:"",
      })
    }


        function btnUpdate(e)
    {
      e.preventDefault()
      setLoader(true)
      dispatch(updata({newProd,id:uppId}))
      setNewprod({
        title:"",
        category:"",
         price:"",
         image:"",
      })
        setEditable(false)
        setLoader(false)
    }
    

    function delThatProd(delid)
    {
      setLoader(true)
      dispatch(delData(delid))
      setLoader(false)
    }

    function editThatProd(edit)
    {
      setEditable(true)
      setLoader(true)
      setNewprod({
         title:edit.title,
        category:edit.category,
         price:edit.price,
         image:edit.image,
      })
      setupId(edit.id)
      setLoader(false)
    }

    

    return(
        <section id="editor-sec">
            <div className="editor-form" >
              <form className="row g-3">
  <div className="col-md-6">
    <label className="form-label">
      Tilte {!newProd.title && <span style={{ color: 'red' }}>*</span>}
    </label>
    <input type="text" name="title" value={newProd.title} onChange={handleChange}
    className="form-control"   placeholder="Name of the Product" required/>
    
  </div>
   <div className="col-md-6">
    <label className="form-label">
      Category {!newProd.category && <span style={{ color: 'red' }}>*</span>}
    </label>
    <input type="text" name="category" value={newProd.category} onChange={handleChange}
    className="form-control"  placeholder="Enter Category" required/>
    
  </div>
  <div className="col-12">
    <label  className="form-label">
      Image Url
    </label>
    <input
      type="text"
      className="form-control"
      placeholder="Image URL"
       name="image" 
       value={newProd.image} 
       onChange={handleChange}
    />
  </div>

  <div className="col-md-6">
    <label  className="form-label">
      Price {!newProd.price && <span style={{ color: 'red' }}>*</span>}
    </label>
    <input type="number" className="form-control"  
    name="price" value={newProd.price} onChange={handleChange}  
    placeholder="Enter Price" required/>
  </div>
  <div className="col-12">
    <button  className="btn btn-primary" onClick={btnaddData}>
      Add
    </button>
     {editable && <button  className="btn btn-success mx-2" onClick={btnUpdate}>
      Update
    </button>}
  </div>
</form>

            </div>
         <div className="editor-flex w-100">
            {editorData?.map((ele,i)=><div className="editor-all-items m-1" key={i}>
                <div className="editor-image-div">
                <img className="edit-img" src={ele?.image} alt="" />
                                <button className="btn btn-danger editor-btn-edit"
                                onClick={()=>delThatProd(ele.id)}>Delete</button>
                <button  className="btn btn-warning editor-btn-delete"
                onClick={()=>editThatProd(ele)}>Edit</button>
                </div>
                <div className="editor-text text-center mt-1"><p>{ele?.title}</p>
                <p>{ele?.category}</p>
                <p>${ele?.price}/-</p>
                </div>
            </div>)}
        </div>
        {Loader && <div className="w-100 spin-div d-flex justify-content-center align-items-center">
        <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
        </div>}

        </section>
        
    )
}

export default Editor;
