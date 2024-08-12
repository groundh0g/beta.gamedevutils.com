// import BasePacker from "./BasePacker";
// import {GuillotinePackerHeuristics, SortByTypes, SpritePackerTypes} from "../Types";
// import Project from "../../objs/Project";
// import PackerHelper from "../PackerHelper";
//
// export default class GuillotinePacker extends BasePacker {
//
//     public GetPackerType(): SpritePackerTypes {
//         return "Guillotine";
//     }
//
//     public GetDefaultSortBy(): SortByTypes {
//         return "AREA_DESC";
//     }
//
//     public GetPackerDescription(): string {
//         return "";
//     }
//
//     public GetHeuristic(project: Project): GuillotinePackerHeuristics {
//         let heuristic: GuillotinePackerHeuristics;
//
//         if(project.options.packerHeuristics !== "InferFromSort") {
//             return project.options.packerHeuristics as GuillotinePackerHeuristics ?? "BestArea";
//         }
//
//         // TODO: implement BottomLeftRule and ContactPointRule
//         switch(project.options.sortBy ?? this.GetDefaultSortBy()) {
//             case "SHORTER_SIDE":
//             case "LONGER_SIDE_DESC": // TODO: is this right ??
//                 heuristic = "BestShortSide";
//                 break;
//             case "LONGER_SIDE":
//             case "SHORTER_SIDE_DESC": // TODO: is this right ??
//                 heuristic = "BestLongSide";
//                 break;
//             case "AREA":
//             case "AREA_DESC":
//             case "PERIMETER":
//             case "PERIMETER_DESC":
//             default:
//                 heuristic = "BestArea";
//                 break;
//         }
//
//         return heuristic;
//     }
//
//     protected override OnPlaceSprite(project: Project, key: string, rotate?: boolean): boolean {
//         return super.OnPlaceSprite(project, key, rotate);
//     }
//
// //     public GetPackerType(): SpritePackerTypes {
// //         return "Guillotine";
// //     }
//
// //     GetDefaultSortBy(): SortByTypes {
// //         return "AREA_DESC";
// //     }
//
// //     public GetHeuristic(project: Project): GuillotinePackerHeuristics {
// //         let heuristic: GuillotinePackerHeuristics;
//
// //         if(project.options.packerHeuristics !== "InferFromSort") {
// //             return project.options.packerHeuristics as GuillotinePackerHeuristics ?? "BestArea";
// //         }
//
// //         // TODO: verify inferences
// //         switch(project.options.sortBy ?? this.GetDefaultSortBy()) {
// //             case "HEIGHT":
// //             case "HEIGHT_DESC":
// //             case "WIDTH":
// //             case "WIDTH_DESC":
// //                 heuristic = "WorstLongSide";
// //                 break;
// //             case "SIDE_DIFF":
// //             case "SIDE_DIFF_DESC":
// //                 heuristic = "WorstShortSide";
// //                 break;
// //             case "AREA":
// //             case "PERIMETER":
// //             case "SIDE_RATIO":
// //                 heuristic = "WorstArea";
// //                 break;
// //             case "SHORTER_SIDE_DESC":
// //             case "LONGER_SIDE": // TODO: is this right ??
// //                 heuristic = "BestShortSide";
// //                 break;
// //             case "LONGER_SIDE_DESC":
// //             case "SHORTER_SIDE": // TODO: is this right ??
// //                 heuristic = "BestLongSide";
// //                 break;
// //             case "AREA_DESC":
// //             case "PERIMETER_DESC":
// //             case "SIDE_RATIO_DESC":
// //             default:
// //                 heuristic = "BestArea";
// //                 break;
// //         }
//
// //         return heuristic;
// //     }
//
// //     protected OnInit(project: Project): boolean {
// //         // TODO: implement
// //         return true;
// //     }
//
// //     protected OnPack(project: Project): boolean {
// //         // TODO: implement
// //         this.DoCompleteCallback(true, project);
// //         return true;
// //     }
//
// //     protected OnResize(project: Project, oldWidth: number, oldHeight: number, newWidth: number, newHeight: number, changed: boolean): boolean {
// //         // TODO: implement
// //         return changed;
// //     }
//
// //     protected OnProgressCallback(progress: number): boolean {
// //         // TODO: implement
// //         return true;
// //     }
//
// //     protected OnCompleteCallback(success: boolean): void {
// //         // TODO: implement
// //     }
//
//     private static _registerParser = (() => {
//         PackerHelper.RegisterPacker(new GuillotinePacker());
//     })();
//
// }