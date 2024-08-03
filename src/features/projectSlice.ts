import { createSlice } from '@reduxjs/toolkit'
import { Project } from "../objects/Project";

const NumberFields = ["width", "height", "borderPadding", "shapePadding", "innerPadding", "trimThreshold"];
const StringFields = ["name", "imageFormat", "dataFormat", "spritePacker", "sortBy", "sizeMode", ];
const BooleanFields = ["stripExtension", "allowRotate", "powerOf2", "forceSquare", "includeAt2x", "cleanAlpha", "colorMask", "aliasSprites", "debugMode", "trimSprites", "gifExtractFrames", "compressProject"];

const imageFormatValues = ["PNG", "GIF", "JPG", "BMP"];
const dataFormatValues = ["XML", "JSON", "CSS"];
const spritePackerValues = ["JoeRects", "Basic", "Shelf", "Skyline"];
const sortByValues = ["AREA", "AREA_DESC", "HEIGHT", "HEIGHT_DESC", "NAME", "NAME_DESC", "WIDTH", "WIDTH_DESC"];
const sizeModeValues = ["Fixed", "Max"];

const AllEnumValues = {
    imageFormat: imageFormatValues,
    dataFormat: dataFormatValues,
    spritePacker: spritePackerValues,
    sortBy: sortByValues,
    sizeMode: sizeModeValues,
};

const setBooleanValue = (state: any, field: string, value: string) => {
    if(BooleanFields.indexOf(field) >= 0) {
        let typedValue = false;
        switch(value.toLowerCase()) {
            case "true": typedValue = true; break;
            case "false": typedValue = false; break;
        }
        (state.project as any)[field] = typedValue;
    }
}

const setNumberValue = (state: any, field: string, value: string) => {
    if(NumberFields.indexOf(field) >= 0) {
        (state.project as any)[field] = Number.parseInt(value) || 1;
    }
}

const setStringValue = (state: any, field: string, value: string) => {
    if (StringFields.indexOf(field) >= 0) {
        (state.project as any)[field] = value || "";
    }
}


export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        project: Project.Empty,
        lookups: AllEnumValues,
    },
    reducers: {
        setEnum: ((state, action) => {
            const parts = (action.payload as String).split(":");
            const field = parts[0];
            const allowedValues = (AllEnumValues as any)[field];
            if(allowedValues.indexOf(field) >= 0) {
                let value = parts[1] || "";
                (state.project as any)[field] = value;
            }
        }),
        setBoolean: ((state, action) => {
            const parts = (action.payload as String).split(":");
            setBooleanValue(state, parts[0], parts[1]);
        }),
        setString: ((state, action) => {
            const parts = (action.payload as String).split(":");
            setStringValue(state, parts[0], parts[1]);
        }),
        setNumber: ((state, action) => {
            const parts = (action.payload as String).split(":");
            setNumberValue(state, parts[0], parts[1]);
        }),
        toggle: ((state, action) => {
            const field = action.payload;
            if(BooleanFields.indexOf(field) >= 0) {
                const value = (state.project as any)[field] as boolean;
                (state.project as any)[field] = !value;
            }
        }),
        setValue: ((state, action) => {
            const parts = (action.payload as String).split(":");
            setBooleanValue(state, parts[0], parts[1]);
            setStringValue(state, parts[0], parts[1]);
            setNumberValue(state, parts[0], parts[1]);
        }),
    }
})

// Action creators are generated for each case reducer function
export const { toggle, setNumber, setString, setBoolean, setEnum, setValue } = projectSlice.actions
export default projectSlice.reducer