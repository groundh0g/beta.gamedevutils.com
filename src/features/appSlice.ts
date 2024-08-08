import {createSlice} from '@reduxjs/toolkit'
import {MakeEmptyProject} from "../objects/Project";
import {State} from "./_Types.ts";
import {INITIAL_ASSETS, INITIAL_CONSOLE_VALUES, INITIAL_LOOKUP_VALUES} from "./_Constants.ts";
import {AddLogEntry, ClearLogEntries} from "./reducerConsole.ts";
import {AddImage, RemoveImages, SwapImages} from "./reducerAssets.ts";
import { SetAnyValue, SetBoolean, SetEnum, SetNumber, SetString, Toggle } from "./reducerSettings.ts";

// const updateObject = (oldObj: any, newObj: any) : any => {
//     return Object.assign({}, oldObj, newObj);
// }

export const appSlice = createSlice({
    name: 'project',
    initialState: {
        settings: MakeEmptyProject(),
        lookups: INITIAL_LOOKUP_VALUES,
        console: INITIAL_CONSOLE_VALUES,
        assets: INITIAL_ASSETS,
    } as State,
    reducers: {

        // Report Status
        log: AddLogEntry,
        clearLog: ClearLogEntries,

        // Manage Assets
        addImage: AddImage,
        removeImages: RemoveImages,
        swapAssets: SwapImages,

        // Manage Settings
        setEnum: SetEnum,
        setBoolean: SetBoolean,
        setString: SetString,
        setNumber: SetNumber,
        toggle: Toggle,
        setValue: SetAnyValue,
    }
})

// Action creators are generated for each case reducer function
export const {
    log,
    clearLog,

    addImage,
    removeImages,
    swapAssets,

    toggle,
    // setNumber,
    // setString,
    // setBoolean,
    setEnum,
    setValue,
} = appSlice.actions

export default appSlice.reducer
