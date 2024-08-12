
export type ExportableImageFormatTypes = "BMP" | "GIF" | "JPG" | "PNG" | undefined;
export type ImageFormatTypes = ExportableImageFormatTypes | "SVG" | undefined;
export type DataFormatTypes = "CSS" | "JSON" | "XML" | undefined;
export type YesNoTypes = "Yes" | "No" | undefined;
export type NameInSheetTypes = "Keep Extension" | "Strip Extension" | undefined;
export type SpritePackerTypes = "Null" | "Basic" | "Shelf" | "Guillotine" | "JoeRects" | "Skyline";
export const sortByTypes = ["AREA", "AREA_DESC", "HEIGHT", "HEIGHT_DESC", "NAME", "NAME_DESC", "PATH", "PATH_DESC", "WIDTH", "WIDTH_DESC", "SHORTER_SIDE", "SHORTER_SIDE_DESC", "LONGER_SIDE", "LONGER_SIDE_DESC", "PERIMETER", "PERIMETER_DESC", "SIDE_DIFF", "SIDE_DIFF_DESC", "SIDE_RATIO", "SIDE_RATIO_DESC"];
export type SortByTypes = typeof sortByTypes[number] | undefined;
export type SizeModeTypes = "Fixed Size" | "Max Size" | undefined;
export type ConstraintTypes = "Any Size" | "Power of Two" | undefined;
export type TrimModeTypes = "None" | "Trim" | undefined;
export type AnimatedGifTypes = "Extract Frames" | "Use First Frame" | undefined;

export type CallbackStatusTypes = "Canceled" | "Completed" | "Failed" | undefined;

export type InferHeuristics = "InferFromSort";
export const nullPackerHeuristics = ["NullDefault"] as const;
export type  NullPackerHeuristics = typeof nullPackerHeuristics[number] | InferHeuristics;
export const basicPackerHeuristics = ["BasicDefault"] as const;
export type  BasicPackerHeuristics = typeof basicPackerHeuristics[number] | InferHeuristics;
export const shelfPackerHeuristics = ["BestArea", "BestHeight", "BestWidth", "WorstArea", "WorstHeight", "WorstWidth", "NextFit", "FirstFit"] as const;
export type  ShelfPackerHeuristics = typeof shelfPackerHeuristics[number] | InferHeuristics;
export const skylinePackerHeuristics = ["LevelBottomLeft", "LevelMinWaste"] as const;
export type  SkylinePackerHeuristics = typeof skylinePackerHeuristics[number] | InferHeuristics;
export const joeRectsPackerHeuristics = ["BestShortSide", "BestLongSide", "BestArea"] as const; // , "BottomLeftRule", "ContactPointRule"] as const;
export type  JoeRectsPackerHeuristics = typeof joeRectsPackerHeuristics[number] | InferHeuristics;
export const guillotinePackerHeuristics = ["BestShortSide", "BestLongSide", "BestArea", "WorstArea", "WorstShortSide", "WorstLongSide"] as const;
export type  GuillotinePackerHeuristics = typeof guillotinePackerHeuristics[number] | InferHeuristics;
export type AllHeuristics = NullPackerHeuristics | BasicPackerHeuristics | ShelfPackerHeuristics | SkylinePackerHeuristics | JoeRectsPackerHeuristics | GuillotinePackerHeuristics;

// TODO: unused. use.
// based on https://github.com/remshams/ts-literal-and-lookup-types [derived-array.ts]
export type PackerHeuristicsMapType = { [key in SpritePackerTypes]: readonly string[]; };
export const PackerHeuristicsMap: PackerHeuristicsMapType = {
    "Null": nullPackerHeuristics,
    "Basic": basicPackerHeuristics,
    "Shelf": shelfPackerHeuristics,
    "Skyline": skylinePackerHeuristics,
    "JoeRects": joeRectsPackerHeuristics,
    "Guillotine": guillotinePackerHeuristics,
};

export type PackerToSortToHeuristicsMapType = { [key in SpritePackerTypes] : { [key in typeof sortByTypes[number]]: readonly AllHeuristics[]; } };
export const PackerToSortToHeuristicMap : PackerToSortToHeuristicsMapType = {
    "Null": {
        "AREA": ["NullDefault"],
        "AREA_DESC": ["NullDefault"],
        "HEIGHT": ["NullDefault"],
        "HEIGHT_DESC": ["NullDefault"],
        "WIDTH": ["NullDefault"],
        "WIDTH_DESC": ["NullDefault"],
        "NAME": ["NullDefault"],
        "NAME_DESC": ["NullDefault"],
        "PATH": ["NullDefault"],
        "PATH_DESC": ["NullDefault"],
        "SHORTER_SIDE": ["NullDefault"],
        "SHORTER_SIDE_DESC": ["NullDefault"],
        "LONGER_SIDE": ["NullDefault"],
        "LONGER_SIDE_DESC": ["NullDefault"],
        "PERIMETER": ["NullDefault"],
        "PERIMETER_DESC": ["NullDefault"],
        "SIDE_DIFF": ["NullDefault"],
        "SIDE_DIFF_DESC": ["NullDefault"],
        "SIDE_RATIO": ["NullDefault"],
        "SIDE_RATIO_DESC": ["NullDefault"],
    },
    "Basic": {
        "AREA": ["BasicDefault"],
        "AREA_DESC": ["BasicDefault"],
        "HEIGHT": ["BasicDefault"],
        "HEIGHT_DESC": ["BasicDefault"],
        "WIDTH": ["BasicDefault"],
        "WIDTH_DESC": ["BasicDefault"],
        "NAME": ["BasicDefault"],
        "NAME_DESC": ["BasicDefault"],
        "PATH": ["BasicDefault"],
        "PATH_DESC": ["BasicDefault"],
        "SHORTER_SIDE": ["BasicDefault"],
        "SHORTER_SIDE_DESC": ["BasicDefault"],
        "LONGER_SIDE": ["BasicDefault"],
        "LONGER_SIDE_DESC": ["BasicDefault"],
        "PERIMETER": ["BasicDefault"],
        "PERIMETER_DESC": ["BasicDefault"],
        "SIDE_DIFF": ["BasicDefault"],
        "SIDE_DIFF_DESC": ["BasicDefault"],
        "SIDE_RATIO": ["BasicDefault"],
        "SIDE_RATIO_DESC": ["BasicDefault"],
    },
// TODO: incorporate ["NextFit", "FirstFit"]
    "Shelf": { // TODO: verify mappings
        "AREA": ["WorstArea"],
        "AREA_DESC": ["BestArea"],
        "HEIGHT": ["WorstHeight"],
        "HEIGHT_DESC": ["BestHeight"],
        "WIDTH": ["WorstWidth"],
        "WIDTH_DESC": ["BestWidth"],
        "NAME": ["BestArea"],
        "NAME_DESC": ["BestArea"],
        "PATH": ["BestArea"],
        "PATH_DESC": ["BestArea"],
        "SHORTER_SIDE": ["BestArea"],
        "SHORTER_SIDE_DESC": ["BestArea"],
        "LONGER_SIDE": ["BestArea"],
        "LONGER_SIDE_DESC": ["BestArea"],
        "PERIMETER": ["WorstArea"],
        "PREIMETER_DESC": ["BestArea"],
        "SIDE_DIFF": ["WorstArea"],
        "SIDE_DIFF_DESC": ["BestArea"],
        "SIDE_RATIO": ["WorstArea"],
        "SIDE_RATIO_DESC": ["BestArea"],
    },
    "Skyline": { // TODO: verify mappings
        "AREA": ["LevelBottomLeft"],
        "AREA_DESC": ["LevelMinWaste"],
        "HEIGHT": ["LevelBottomLeft"],
        "HEIGHT_DESC": ["LevelMinWaste"],
        "WIDTH": ["LevelBottomLeft"],
        "WIDTH_DESC": ["LevelMinWaste"],
        "NAME": ["LevelMinWaste"],
        "NAME_DESC": ["LevelMinWaste"],
        "PATH": ["LevelMinWaste"],
        "PATH_DESC": ["LevelMinWaste"],
        "SHORTER_SIDE": ["LevelBottomLeft"],
        "SHORTER_SIDE_DESC": ["LevelMinWaste"],
        "LONGER_SIDE": ["LevelBottomLeft"],
        "LONGER_SIDE_DESC": ["LevelMinWaste"],
        "PERIMETER": ["LevelBottomLeft"],
        "PREIMETER_DESC": ["LevelMinWaste"],
        "SIDE_DIFF": ["LevelBottomLeft"],
        "SIDE_DIFF_DESC": ["LevelMinWaste"],
        "SIDE_RATIO": ["LevelBottomLeft"],
        "SIDE_RATIO_DESC": ["LevelMinWaste"],
    },
// TODO: incorperate ["BottomLeftRule", "ContactPointRule"]
    "JoeRects": { // TODO: verify mappings
        "AREA": ["BestArea"],
        "AREA_DESC": ["BestArea"],
        "HEIGHT": ["BestShortSide"],
        "HEIGHT_DESC": ["BestLongSide"],
        "WIDTH": ["BestShortSide"],
        "WIDTH_DESC": ["BestLongSide"],
        "NAME": ["BestArea"],
        "NAME_DESC": ["BestArea"],
        "PATH": ["BestArea"],
        "PATH_DESC": ["BestArea"],
        "SHORTER_SIDE": ["BestLongSide"],
        "SHORTER_SIDE_DESC": ["BestShortSide"],
        "LONGER_SIDE": ["BestShortSide"],
        "LONGER_SIDE_DESC": ["BestLongSide"],
        "PERIMETER": ["BestShortSide"],
        "PREIMETER_DESC": ["BestLongSide"],
        "SIDE_DIFF": ["BestShortSide"],
        "SIDE_DIFF_DESC": ["BestLongSide"],
        "SIDE_RATIO": ["BestShortSide"],
        "SIDE_RATIO_DESC": ["BestLongSide"],
    },
    "Guillotine": { // TODO: verify mappings
        "AREA": ["WorstArea"],
        "AREA_DESC": ["BestArea"],
        "HEIGHT": ["BestShortSide"],
        "HEIGHT_DESC": ["BestLongSide"],
        "WIDTH": ["BestShortSide"],
        "WIDTH_DESC": ["BestLongSide"],
        "NAME": ["BestArea"],
        "NAME_DESC": ["BestArea"],
        "PATH": ["BestArea"],
        "PATH_DESC": ["BestArea"],
        "SHORTER_SIDE": ["WorstShortSide"],
        "SHORTER_SIDE_DESC": ["BestShortSide"],
        "LONGER_SIDE": ["WorstLongSide"],
        "LONGER_SIDE_DESC": ["BestLongSide"],
        "PERIMETER": ["BestArea"],
        "PREIMETER_DESC": ["BestLongSide"],
        "SIDE_DIFF": ["BestArea"],
        "SIDE_DIFF_DESC": ["BestLongSide"],
        "SIDE_RATIO": ["WorstArea"],
        "SIDE_RATIO_DESC": ["BestArea"],
    },
    // "some-new-packer": {
    //     "AREA": [""],
    //     "AREA_DESC": [""],
    //     "HEIGHT": [""],
    //     "HEIGHT_DESC": [""],
    //     "WIDTH": [""],
    //     "WIDTH_DESC": [""],
    //     "NAME": [""],
    //     "NAME_DESC": [""],
    //     "PATH": [""],
    //     "PATH_DESC": [""],
    //     "SHORTER_SIDE": [""],
    //     "SHORTER_SIDE_DESC": [""],
    //     "LONGER_SIDE": [""],
    //     "LONGER_SIDE_DESC": [""],
    //     "PERIMETER": [""],
    //     "PREIMETER_DESC": [""],
    //     "SIDE_DIFF": [""],
    //     "SIDE_DIFF_DESC": [""],
    //     "SIDE_RATIO": [""],
    //     "SIDE_RATIO_DESC": [""],
    // },
};