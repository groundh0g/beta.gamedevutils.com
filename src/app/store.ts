import { configureStore } from '@reduxjs/toolkit'
import projectReducer from '../features/appSlice.ts';

export default configureStore({
    reducer: {
        project: projectReducer,
    }
})