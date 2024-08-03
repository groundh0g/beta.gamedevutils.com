export class Project {
    // Output
    name: string = "Untitled";
    imageFormat: string = "PNG";
    dataFormat: string = "XML";
    stripExtension: boolean = true;
    // Algorithm
    spritePacker: string = "JoeRects";
    sortBy: string = "AREA_DESC";
    allowRotate: boolean = false;
    // Dimensions
    width: number = 1024;
    height: number = 1024;
    sizeMode: string = "Max";
    powerOf2: boolean = true;
    forceSquare: boolean = false;
    includeAt2x: boolean = false;
    // Padding
    borderPadding: number = 2;
    shapePadding: number = 2;
    innerPadding: number = 0;
    // Filters
    cleanAlpha: boolean = true;
    colorMask: boolean = false;
    aliasSprites: boolean = false;
    debugMode: boolean = false;
    trimSprites: boolean = true;
    trimThreshold: number = 1;
    // Advanced
    gifExtractFrames: boolean = false;
    compressProject: boolean = false;

    public static get Empty(): Project {
        return new Project();
    }

    public get Clone() {
        return Object.assign({}, this) as Project;
    }
}

// export const DEFAULT_PROJECT = {
//     // Output
//     name: "Untitled",
//     imageFormat: "PNG",
//     dataFormat: "XML",
//     stripExtension: true,
//     // Algorithm
//     spritePacker: "JoeRects",
//     sortBy: "AREA_DESC",
//     allowRotate: false,
//     // Dimensions
//     width: 1024,
//     height: 1024,
//     sizeMode: "Max",
//     powerOf2: true,
//     forceSquare: false,
//     includeAt2x: false,
//     // Padding
//     borderPadding: 2,
//     shapePadding: 2,
//     innerPadding: 0,
//     // Filters
//     cleanAlpha: false,
//     colorMask: false,
//     aliasSprites: false,
//     debugMode: false,
//     trimSprites: false,
//     trimThreshold: 1,
//     // Advanced
//     gifExtractFrames: false,
//     compressProject: false,
// } as Project;