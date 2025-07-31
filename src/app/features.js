import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action) => {
      const id = action.payload
      const currentCount = state.value[id] || 1
      if (currentCount < 5) {              
        state.value[id] = currentCount + 1
      }
    },
    decrement: (state, action) => {
      const id = action.payload
      const currentCount = state.value[id] || 1
      if (currentCount > 1) {            
        state.value[id] = currentCount - 1
      }
    },
    incrementByAmount: (state, action) => {
     
    
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
