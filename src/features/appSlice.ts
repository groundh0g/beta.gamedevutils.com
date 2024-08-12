import {createSlice} from '@reduxjs/toolkit'
import {MakeEmptyProject} from "../objects/Project";
import {FrameMap, State} from "./_Types.ts";
import {INITIAL_ASSETS, INITIAL_CONSOLE_VALUES, INITIAL_LOOKUP_VALUES, INITIAL_SCREEN_STATE} from "./_Constants.ts";
import {AddLogEntry, ClearLogEntries} from "./reducerConsole.ts";
import {AddImage, RemoveImages, SwapImages} from "./reducerAssets.ts";
import {SetAnyValue, SetBoolean, SetEnum, SetNumber, SetString, Toggle} from "./reducerSettings.ts";
import {
    ClearProgress,
    SetDirtyProject,
    SetDirtyWorkspace,
    SetProgress,
    SetThumbnailBackground
} from "./reducerUserInterface.ts";
import {clearFrames, populateFrame, populateFrames} from "./reducerFilters.ts";
// import {Buffer} from 'node:buffer';
// import {PNG} from 'pngjs';

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
        frames: {} as FrameMap,
        screen: INITIAL_SCREEN_STATE,
    } as State,
    reducers: {

        // Report Status
        log: AddLogEntry,
        clearLog: ClearLogEntries,

        // Update GUI
        clearProgress: ClearProgress,
        setProgress: SetProgress,
        setDirtyWorkspace: SetDirtyWorkspace,
        setDirtyProject: SetDirtyProject,
        setThumbnailBackground: SetThumbnailBackground,

        // Manage Assets
        addImage: AddImage,
        removeImages: RemoveImages,
        swapAssets: SwapImages,

        // Manage Asset Frames
        clearFrames: clearFrames,
        populateFrames: populateFrames,
        populateFrame: populateFrame,

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

    clearProgress,
    setProgress,
    setDirtyWorkspace,
    setDirtyProject,
    setThumbnailBackground,

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
