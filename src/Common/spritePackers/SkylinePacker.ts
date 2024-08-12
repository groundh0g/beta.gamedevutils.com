import BasePacker from "./BasePacker";
import PackerHelper from "../PackerHelper";
import {
    CallbackStatusTypes,
    GuillotinePackerHeuristics,
    SkylinePackerHeuristics,
    SortByTypes,
    SpritePackerTypes
} from "../Types";
import Project from "../../objs/Project";

// export default class SkylinePacker extends BasePacker {

//     public GetPackerType(): SpritePackerTypes {
//         return "Skyline";
//     }

//     GetDefaultSortBy(): SortByTypes {
//         return "HEIGHT_DESC";
//     }

//     public GetHeuristic(project: Project): SkylinePackerHeuristics {
//         let heuristic: SkylinePackerHeuristics;

//         if(project.options.packerHeuristics !== "InferFromSort") {
//             return project.options.packerHeuristics as SkylinePackerHeuristics ?? "LevelMinWaste";
//         }

//         // TODO: verify inferences
//         switch(project.options.sortBy ?? this.GetDefaultSortBy()) {
//             case "SHORTER_SIDE":
//             case "SHORTER_SIDE_DESC":
//             case "LONGER_SIDE":
//             case "LONGER_SIDE_DESC":
//             case "HEIGHT":
//             case "HEIGHT_DESC":
//             case "WIDTH":
//             case "WIDTH_DESC":
//             case "SIDE_RATIO":
//             case "SIDE_RATIO_DESC":
//             case "SIDE_DIFF":
//             case "SIDE_DIFF_DESC":
//                 heuristic = "LevelBottomLeft";
//                 break;
//             case "AREA":
//             case "AREA_DESC":
//             case "PERIMETER":
//             case "PERIMETER_DESC":
//             default:
//                 heuristic = "LevelMinWaste";
//                 break;
//         }

//         return heuristic;
//     }

//     protected OnInit(project: Project): boolean {
//         // TODO: implement
//         return true;
//     }

//     protected OnPack(project: Project): boolean {
//         // TODO: implement
//         this.DoCompleteCallback(true, project);
//         return true;
//     }

//     protected OnResize(project: Project, oldWidth: number, oldHeight: number, newWidth: number, newHeight: number, changed: boolean): boolean {
//         // TODO: implement
//         return changed;
//     }

//     protected OnProgressCallback(progress: number): boolean {
//         // TODO: implement
//         return true;
//     }

//     protected OnCompleteCallback(success: boolean): void {
//         // TODO: implement
//     }

//     private static _registerParser = (() => {
//         PackerHelper.RegisterPacker(new SkylinePacker());
//     })();

// }