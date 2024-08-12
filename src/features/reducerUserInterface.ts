import {Action, State} from "./_Types.ts";
import {Draft} from "@reduxjs/toolkit";
import MathHelper from "../Common/MathHelper.ts";

export const ClearProgress = (state: Draft<State>, _action: Action) => {
    state.screen.progress = 0;
};

export const SetProgress = (state: Draft<State>, action: Action) => {
    // state.screen.progress = Math.min(Math.max(0.0, parseFloat(action.payload)), 1.0);
    state.screen.progress = MathHelper.Clamp(parseFloat(action.payload) || 0, 0.0, 1.0);
};

export const SetDirtyWorkspace = (state: Draft<State>, action: Action) => {
    state.screen.dirtyWorkspace = action.payload !== "false";
};

export const SetDirtyProject = (state: Draft<State>, action: Action) => {
    state.screen.dirtyProject = action.payload !== "false";
};

export const SetThumbnailBackground = (state: Draft<State>, action: Action) => {
    state.screen.thumbnailBackground = action.payload || "transparent";
};

