import { createSlice } from '@reduxjs/toolkit'

const initialState=[];

export const cartSlice = createSlice({
  name: 'nameCart',
  initialState,
  reducers: {
    yourCart:(state, action)=>{
        const addcart=action.payload;
        const same=state.find((item)=>item.id==addcart.id)

        if(same)
        {
            same.count+=1
        }
        else
        {
      state.push({...addcart,count:1})
        }
    },
    // for removing with "-" button
    removeCart:(state,action)=>{
        const {id}=action.payload;
        const getItem=state.find((rem)=>rem.id==id)
        getItem.count-=1
    },

    // for removing one whole item
    removeAll:(state,action)=>{
        const {id}=action.payload
        return state.filter((del)=>del.id!=id)
    },

       // for removing total cart
    remove:()=>{
        return [];
    }
}
})

// Action creators are generated for each case reducer function
export const {yourCart,removeCart ,removeAll ,remove} = cartSlice.actions

export default cartSlice.reducer