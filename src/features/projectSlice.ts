import { createSlice } from '@reduxjs/toolkit'
import { MakeEmptyProject } from "../objects/Project";

const NumberFields = ["width", "height", "borderPadding", "shapePadding", "innerPadding", "trimThreshold"];
const StringFields = ["name", "imageFormat", "dataFormat", "spritePacker", "sortBy", "sizeMode", ];
const BooleanFields = ["stripGroups", "stripExtension", "allowRotate", "powerOf2", "forceSquare", "includeAt2x", "cleanAlpha", "colorMask", "aliasSprites", "debugMode", "trimSprites", "gifExtractFrames", "compressProject"];

const imageFormatValues = ["PNG", "GIF", "JPG", "BMP"];
const dataFormatValues = ["XML", "JSON", "CSS"];
const spritePackerValues = ["JoeRects", "Basic", "Shelf", "Skyline"];
const sortByValues = ["AREA", "AREA_DESC", "HEIGHT", "HEIGHT_DESC", "NAME", "NAME_DESC", "WIDTH", "WIDTH_DESC"];
const sizeModeValues = ["Fixed", "Max"];
const SIZE_VALUES = ["128", "256", "512", "1024", "2048", "4096", "8192"];

const AllEnumValues = {
    imageFormat: imageFormatValues,
    dataFormat: dataFormatValues,
    spritePacker: spritePackerValues,
    sortBy: sortByValues,
    sizeMode: sizeModeValues,
    width: SIZE_VALUES,
    height: SIZE_VALUES,
};

const setBooleanValue = (state: any, field: string, value: string) => {
    if(BooleanFields.indexOf(field) >= 0) {
        let typedValue = false;
        switch(value.toLowerCase()) {
            case "true": typedValue = true; break;
            case "false": typedValue = false; break;
        }
        (state.settings as any)[field] = typedValue;
    }
}

const setNumberValue = (state: any, field: string, value: string) => {
    if(NumberFields.indexOf(field) >= 0) {
        (state.settings as any)[field] = Number.parseInt(value) || 1;
    }
}

const setStringValue = (state: any, field: string, value: string) => {
    if (StringFields.indexOf(field) >= 0) {
        (state.settings as any)[field] = value || "";
    }
}

const setAnyValue = (state: any, field: string, value: string) => {
    setBooleanValue(state, field, value);
    setStringValue(state, field, value);
    setNumberValue(state, field, value);
}

type ImageMap = { [key: string]: string }

const consoleLogEntries = [] as string[];

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        settings: MakeEmptyProject(),
        lookups: AllEnumValues,
        console: consoleLogEntries,
        assets: {} as ImageMap,
    },
    reducers: {
        log: (state, action) => {
            state.console.push(action.payload);
        },
        clearLog: (state, _action) => {
            state.console.splice(0, state.console.length);
        },
        addImage: (state, action) => {
            const parts = action.payload.split("|");
            state.assets[parts[0]] = parts[1];
        },
        removeImage: (state, action) => {
            delete state.assets[action.payload];
        },
        setEnum: ((state, action) => {
            const parts = (action.payload as String).split(":");
            const field = parts[0];
            const allowedValues = (AllEnumValues as any)[field];
            if(allowedValues.indexOf(field) >= 0) {
                let value = parts[1] || "";
                (state.settings as any)[field] = value;
            }
        }),
        setBoolean: ((state, action) => {
            console.log('setBoolean');
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
                const value = (state.settings as any)[field] as boolean;
                (state.settings as any)[field] = !value;
            }
        }),
        setValue: ((state, action) => {
            const parts = (action.payload as String).split(":");
            setAnyValue(state, parts[0], parts[1]);
        }),
    }
})

// Action creators are generated for each case reducer function
export const { toggle, setNumber, setString, setBoolean, setEnum, setValue, log, clearLog } = projectSlice.actions
export default projectSlice.reducer
