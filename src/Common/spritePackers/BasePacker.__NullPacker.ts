import BasePacker from "./BasePacker";
import {AllHeuristics, SortByTypes, SpritePackerTypes} from "../Types";
import Project from "../../objs/Project";

export default class NullPacker extends BasePacker {

    GetPackerDescription(): string {
        return `
The NullPacker is a do-nothing implementation of the BasePacker class whose sort
method and heuristic are ignored.
`.trim();
    }

    GetDefaultSortBy(): SortByTypes {
        return "AREA_DESC";
    }

    GetHeuristic(project: Project): AllHeuristics { //} | string {
        return "BestArea";
    }

    GetPackerType(): SpritePackerTypes {
        return "Null";
    }

}
