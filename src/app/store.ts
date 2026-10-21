import { configureStore } from '@reduxjs/toolkit'
import generationsReducer from '../features/generations/generationsSlice'
import generationDetailReducer from '../features/generationDetail/generationDetailSlice'

export const store = configureStore({
  reducer: {
    generations: generationsReducer,
    generationDetail: generationDetailReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
