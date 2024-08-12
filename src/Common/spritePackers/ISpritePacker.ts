import Project from "../../objs/Project";
import {CallbackStatusTypes, SortByTypes, SpritePackerTypes} from "../Types";

export type ProgressCallback = (progress: number) => boolean;
export type CompleteCallback = (success: boolean) => void;

export interface ISpritePacker {
    GetPackerType() : SpritePackerTypes;
    GetDefaultSortBy() : SortByTypes;
    GetHeuristic(project: Project) : string; // calculated; packer-specific
    DoPack(project: Project): CallbackStatusTypes;
}
