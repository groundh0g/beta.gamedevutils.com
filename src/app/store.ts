import { configureStore } from '@reduxjs/toolkit'
import projectReducer from '../features/projectSlice.ts';

export default configureStore({
    reducer: {
        project: projectReducer,
    }
})