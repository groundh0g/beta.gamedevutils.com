import { createSlice } from '@reduxjs/toolkit'
import {DEFAULT_PROJECT} from "../objects/Project";

export const projectSlice = createSlice({
    name: 'project',
    // initialState: {
    //     project: DEFAULT_PROJECT,
    // },
    // reducers: {
    //     toggle: ((state, action: {payload: string, type: string}) => {
    //         console.log(state, action);
    //         switch (action.payload) {
    //             case 'toggleOne':
    //                 console.log(state.project.toggleOne);
    //                 state.project.toggleOne = !state.project.toggleOne;
    //                 break;
    //             case 'toggleTwo':
    //             case 'toggleThree':
    //             case 'toggleFour':
    //             case 'toggleFive':
    //                 state.project[action.payload] = !state.project[action.payload];
    //             break;
    //         }
    //     }),
    // }
    // name: 'toggles',
    initialState: {
        toggleOne: DEFAULT_PROJECT.toggleOne,
        toggleTwo: DEFAULT_PROJECT.toggleTwo,
        toggleThree: DEFAULT_PROJECT.toggleThree,
        toggleFour: DEFAULT_PROJECT.toggleFour,
        toggleFive: DEFAULT_PROJECT.toggleFive,
    },
    reducers: {
        toggle: ((state, action) => {
            // console.log(state, action);
            switch (action.payload) {
                case 'toggleOne':
                    state.toggleOne = !state.toggleOne; //action.payload;
                    break;
                case 'toggleTwo':
                    state.toggleTwo = !state.toggleTwo; //action.payload;
                    break;
                case 'toggleThree':
                    state.toggleThree = !state.toggleThree; //action.payload;
                    break;
                case 'toggleFour':
                    state.toggleFour = !state.toggleFour; //action.payload;
                    break;
                case 'toggleFive':
                    state.toggleFive = !state.toggleFive; //action.payload;
                    break;
                    //state.project[action.type] = action.payload;
                    // break;
            }
        }),
    }
})

// Action creators are generated for each case reducer function
export const { toggle } = projectSlice.actions
export default projectSlice.reducer
