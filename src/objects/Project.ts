export type Project = {
    // Output
    name: string,
    imageFormat: string,
    dataFormat: string,
    stripExtension: boolean,
    // Algorithm
    spritePacker: string,
    sortBy: string,
    allowRotate: boolean,
    // Dimensions
    width: number,
    height: number,
    sizeMode: string,
    powerOf2: boolean,
    forceSquare: boolean,
    includeAt2x: boolean,
    // Padding
    borderPadding: number,
    shapePadding: number,
    innerPadding: number,
    // Filters
    cleanAlpha: boolean,
    colorMask: boolean,
    aliasSprites: boolean,
    debugMode: boolean,
    trimSprites: boolean,
    trimThreshold: number,
    // Advanced
    gifExtractFrames: boolean,
    compressProject: boolean,
}

export const MakeEmptyProject = () => {
    return {
        // Output
        name: "Untitled",
        imageFormat: "PNG",
        dataFormat: "XML",
        stripExtension: true,
        // Algorithm
        spritePacker: "JoeRects",
        sortBy: "AREA_DESC",
        allowRotate: false,
        // Dimensions
        width: 1024,
        height: 1024,
        sizeMode: "Max",
        powerOf2: true,
        forceSquare: false,
        includeAt2x: false,
        // Padding
        borderPadding: 2,
        shapePadding: 2,
        innerPadding: 0,
        // Filters
        cleanAlpha: true,
        colorMask: false,
        aliasSprites: false,
        debugMode: false,
        trimSprites: true,
        trimThreshold: 1,
        // Advanced
        gifExtractFrames: false,
        compressProject: false,
    } as Project;
}
