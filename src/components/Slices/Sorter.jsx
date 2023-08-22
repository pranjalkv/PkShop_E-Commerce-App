import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit'

const initialState={
    data:[],
    orignalData:[],
    value:0
}

export const prodData=createAsyncThunk(
  "prod",
  async (prod,thunkAPI)=>
  {
          
    try{
      const res=await fetch(prod)
   const dataGet=await res.json();
   return dataGet;
    }
    catch(err)
  {
    console.log(err)
  }
  })

  export const addData=createAsyncThunk(
  "add",
  async (addprod,thunkAPI)=>
  {
    try{
      const resAdd= await fetch('https://fakestoreapi.com/products',{
            method:"POST",
            headers:{
               "Content-Type": "application/json",
            },
            body:JSON.stringify({
              title:addprod.title,
              image:addprod.image,
              category:addprod.category,
              price:addprod.price,
              description:"No description nedded",
            })
        })
       const getAdd=await resAdd.json();
       return getAdd;
    }
    catch(err)
  {
    console.log(err)
  }
  })

   export const delData=createAsyncThunk(
  "delete",
  async (delprod,thunkAPI)=>
  {
    try{
      const resAdd= await fetch(`https://fakestoreapi.com/products/${delprod}`,{
            method:"DELETE",
            headers:{
               "Content-Type": "application/json",
            },
        })
       const getDel=await resAdd.json();
       return getDel;
    }
    catch(err)
  {
    console.log(err)
  }
  })

     export const updata=createAsyncThunk(
  "update",
  async (allupData,thunkAPI)=>
  {
    const{newProd,id}=allupData
    try{
      const resgetUp= await fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"PUT",
            headers:{
               "Content-Type": "application/json",
            },
             body:JSON.stringify(
                {
                     title:newProd.title,
              image:newProd.image,
              category:newProd.category,
              price:newProd.price,
                }
            )
        })
       const getUp=await resgetUp.json();
       return getUp;
    }
    catch(err)
  {
    console.log(err)
  }
  })



export const counterSlice = createSlice({
  name: 'nameSort',
  initialState,
  reducers: {
    clearState:(state)=>{
      state.data=[...state.orignalData];
    },
    sortAb: (state) => {
      state.data= state.data.sort((a, b) => a.price - b.price);
    },
    sortBa: (state) => {
      state.data= state.data.sort((a, b) => b.price - a.price);
    },
        above0: (state) => {
      state.data= state.data.filter((ele)=>ele.price<21);
    },
       above21: (state) => {
      state.data= state.data.filter((ele)=>ele.price>20 && ele.price<101);
    },
     above100: (state) => {
      state.data= state.data.filter((ele)=>ele.price>100);
    },
  },
   extraReducers: (builder) => {
    builder
      .addCase(prodData.fulfilled, (state, action) => {
         state.data=action.payload
         state.orignalData=action.payload
         state.pending = false;
      })
      .addCase(prodData.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(prodData.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(addData.fulfilled, (state, action) => {
         state.data.push(action.payload)
         state.orignalData.push(action.payload)
         state.pending = false;
      })
      .addCase(addData.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(addData.rejected, (state, action) => {
        state.error = action.error;
      })
        .addCase(delData.fulfilled, (state, action) => {
         const {id}=action.payload;
         state.data = state.data.filter((ele) => ele.id !== id);
         state.orignalData = state.orignalData.filter((ele) => ele.id !== id);
         state.pending = false;
      })
      .addCase(delData.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(delData.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(updata.fulfilled, (state, action) => {
         state.data=state.data.map((ups)=>action.payload.id==ups.id ? action.payload:ups)
         state.pending = false;
      })
      .addCase(updata.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(updata.rejected, (state, action) => {
        state.error = action.error;
      })

  },
  //    extraReducers: (builder) => {
  //   builder
  //     .addCase(addData.fulfilled, (state, action) => {
  //        state.data=action.payload
  //        state.orignalData=action.payload
  //        state.pending = false;
  //     })
  //     .addCase(addData.pending, (state, action) => {
  //       state.pending = true;
  //     })
  //     .addCase(addData.rejected, (state, action) => {
  //       state.error = action.error;
  //     });
  // },
})

// Action creators are generated for each case reducer function
export const {clearState, sortAb, sortBa ,above0 ,above21 ,above100 } = counterSlice.actions

export default counterSlice.reducer