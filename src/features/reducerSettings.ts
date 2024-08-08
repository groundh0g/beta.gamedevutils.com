import {Action, State} from "./_Types.ts";
import {Draft} from "@reduxjs/toolkit";
import {INITIAL_LOOKUP_VALUES} from "./_Constants.ts";


//////////////////////
// FIELD/TYPE MAPPINGS
//////////////////////

const NumberFields = ["width", "height", "borderPadding", "shapePadding", "innerPadding", "trimThreshold"];
const StringFields = ["name", "imageFormat", "dataFormat", "spritePacker", "sortBy", "sizeMode"];
const BooleanFields = ["stripGroups", "stripExtension", "allowRotate", "powerOf2", "forceSquare", "includeAt2x", "cleanAlpha", "colorMask", "aliasSprites", "debugMode", "trimSprites", "gifExtractFrames", "compressProject"];


//////////
// HELPERS
//////////

const setBooleanValue = (state: Draft<State>, field: string, value: string) => {
    if(BooleanFields.indexOf(field) >= 0) {
        let typedValue = false;
        switch(value.toLowerCase()) {
            case "true": typedValue = true; break;
            case "false": typedValue = false; break;
        }
        (state.settings as any)[field] = typedValue;
    }
};

const setNumberValue = (state: Draft<State>, field: string, value: string) => {
    if(NumberFields.indexOf(field) >= 0) {
        (state.settings as any)[field] = Number.parseInt(value) || 1;
    }
};

const setStringValue = (state: Draft<State>, field: string, value: string) => {
    if (StringFields.indexOf(field) >= 0) {
        (state.settings as any)[field] = value || "";
    }
};

const setAnyValue = (state: Draft<State>, field: string, value: string) => {
    setBooleanValue(state, field, value);
    setStringValue(state, field, value);
    setNumberValue(state, field, value);
};


//////////////////
// REDUCER METHODS
//////////////////

export const SetEnum = (state: Draft<State>, action: Action) => {
    const parts = (action.payload as String).split(":");
    const field = parts[0];
    const allowedValues = (INITIAL_LOOKUP_VALUES as any)[field];
    if(allowedValues.indexOf(field) >= 0) {
        (state.settings as any)[field] = parts[1] || "";
    }
};

export const SetBoolean = (state: Draft<State>, action: Action) => {
    const parts = (action.payload as String).split(":");
    setBooleanValue(state, parts[0], parts[1]);
};

export const SetString = (state: Draft<State>, action: Action) => {
    const parts = (action.payload as String).split(":");
    setStringValue(state, parts[0], parts[1]);
};

export const SetNumber = (state: Draft<State>, action: Action) => {
    const parts = (action.payload as String).split(":");
    setNumberValue(state, parts[0], parts[1]);
};

export const Toggle = (state: Draft<State>, action: Action) => {
    const field = action.payload;
    if(BooleanFields.indexOf(field) >= 0) {
        const value = (state.settings as any)[field] as boolean;
        (state.settings as any)[field] = !value;
    }
};

export const SetAnyValue = (state: Draft<State>, action: Action) => {
    const parts = (action.payload as String).split(":");
    setAnyValue(state, parts[0], parts[1]);
};
