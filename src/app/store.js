import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/app/features'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})