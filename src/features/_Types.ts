import {Project} from "../objects/Project.ts";

export type ImageAsset = {
    ordinal: number,
    origUrl: string,
    gameUrl: string | undefined,
};

export type ImageMap = { [key: string]: ImageAsset };

export type LookupValues = {
    imageFormat: string[],
    dataFormat: string[],
    spritePacker: string[],
    sortBy: string[],
    sizeMode: string[],
    width: string[],
    height: string[],
};

export type State = {
    settings: Project,
    lookups: LookupValues,
    console: string[],
    assets: ImageMap,
};

export type Action = {
    payload: any,
    type: string,
}