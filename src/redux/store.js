import { configureStore } from '@reduxjs/toolkit'
import campersReducer from './campersSlice'
import favoritesReducer from './favoritesSlice';

const store = configureStore({
  reducer: {
    campers: campersReducer,
    favorites: favoritesReducer,
  },
})

export default store
