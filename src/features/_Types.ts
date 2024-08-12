import {Project} from "../objects/Project.ts";

export type ImageAsset = {
    ordinal: number,
    origUrl: string,
    // gameUrl: string | undefined,
};

export type ImageMap = { [key: string]: ImageAsset };

export type Rectangle = {
    x: number,
    y: number,
    width: number,
    height: number,
};

export type ImageMeta = {
    rect: Rectangle,
    frameUrls: string[],
};

export type FrameMap = { [key: string]: ImageMeta };

export type LookupValues = {
    imageFormat: string[],
    dataFormat: string[],
    spritePacker: string[],
    sortBy: string[],
    sizeMode: string[],
    width: string[],
    height: string[],
};

export type ScreenState = {
    progress: number,
    dirtyProject: boolean,
    dirtyWorkspace: boolean,
    thumbnailBackground: string,
};

export type State = {
    settings: Project,
    lookups: LookupValues,
    console: string[],
    assets: ImageMap,
    frames: FrameMap,
    screen: ScreenState,
};

export type Action = {
    payload: any,
    type: string,
}