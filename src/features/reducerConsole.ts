import {Draft} from "@reduxjs/toolkit";
import {Action, State} from "./_Types.ts";

export const AddLogEntry = (state: Draft<State>, action: Action) => {
    state.console.push(action.payload);
};

export const ClearLogEntries = (state: Draft<State>, _action: Action) => {
    state.console.splice(0, state.console.length);
};
