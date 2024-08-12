// import Project from "../../objs/Project";
// import {
//     shelfPackerHeuristics,
//     ShelfPackerHeuristics,
//     SortByTypes,
//     SpritePackerTypes
// } from "../Types";
// import PackerHelper from "../PackerHelper";
// import BasePacker from "./BasePacker";
// import Rectangle from "../../objs/Rectangle";
// import LogHelper from "../LogHelper";
//
// type PlaceSpriteByHeuristicMethod = (project: Project, rect: Rectangle, shelf?: ShelfRectangle) => PlaceSpriteResult;
// type PlaceSpriteByHeuristic = { [key: string]: PlaceSpriteByHeuristicMethod };
//
// class ShelfRectangle extends Rectangle {
//     public constructor() {
//         super();
//         this.maxX = 0;
//         this.rects = [] as Rectangle[];
//     }
//
//     public maxX: number;
//     public rects: Rectangle[];
//
//     public static get EmptyShelfRectangle() : ShelfRectangle {
//         return new ShelfRectangle();
//     }
// }
//
// class PlaceSpriteResult {
//     public constructor(paddedCanvas : Rectangle) {
//         this.paddedCanvas = paddedCanvas;
//     }
//
//     public paddedCanvas: Rectangle = Rectangle.Empty;
//
//     public shelf: ShelfRectangle = ShelfRectangle.EmptyShelfRectangle;
//     public rect: Rectangle = Rectangle.Empty;
//
//     public widthAfterPlace: number = 0;
//     public heightAfterPlace: number = 0;
//     public areaAfterPlace: number = 0;
//
//     public get success(): boolean {
//         return !this.shelf.isEmpty && !this.rect.isEmpty &&
//             this.shelf.Contains(this.rect) &&
//             this.paddedCanvas.Contains(this.rect);
//     }
// }
//
// export default class ShelfPacker extends BasePacker {
//
//     public GetPackerDescription(): string {
//         return `
// The ${this.GetPackerType()} packer is arguably the simplest packer in function and form.
// It's similar to my BasicPacker, but it is more configurable. The default
// sort method is ('${this.GetDefaultSortBy()}') and the heuristic is
// configured within the project from the following values, with a default of "BestArea".
// ${shelfPackerHeuristics} and "InferFromSort".
// `.trim();
//     }
//
//     public GetPackerType(): SpritePackerTypes {
//         return "Shelf";
//     }
//
//     public GetDefaultSortBy(): SortByTypes {
//         return "HEIGHT_DESC"; // "AREA_DESC";
//     }
//
//     public GetHeuristic(project: Project): ShelfPackerHeuristics {
//         let heuristic: ShelfPackerHeuristics;
//
//         if(project?.options.packerHeuristics !== "InferFromSort") {
//             return project?.options.packerHeuristics as ShelfPackerHeuristics ?? "BestArea";
//         }
//
//         switch (project?.options.sortBy ?? this.GetDefaultSortBy()) {
//             case "WIDTH":
//                 heuristic = "WorstWidth";
//                 break;
//             case "WIDTH_DESC":
//                 heuristic = "BestWidth";
//                 break;
//             case "HEIGHT":
//             case "LONGER_SIDE":
//             case "SHORTER_SIDE_DESC":
//             case "SIDE_DIFF_DESC":
//             case "SIDE_RATIO_DESC":
//                 heuristic = "WorstHeight";
//                 break;
//             case "HEIGHT_DESC":
//             case "LONGER_SIDE_DESC":
//             case "SHORTER_SIDE":
//             case "SIDE_DIFF":
//             case "SIDE_RATIO":
//                 heuristic = "BestHeight";
//                 break;
//             case "AREA":
//             case "PERIMETER":
//                 heuristic = "WorstArea";
//                 break;
//             case "NAME":
//             case "NAME_DESC":
//             case "PATH":
//             case "PATH_DESC":
//                 heuristic = "FirstFit";
//                 break;
//             case "AREA_DESC":
//             case "PERIMETER_DESC":
//             default:
//                 heuristic = "BestArea";
//                 break;
//         }
//         return heuristic;
//     }
//
//     protected pack_PlaceSpriteByHeuristic: PlaceSpriteByHeuristic = {};
//
//     protected pack_innerPadding: number = 0;
//     protected pack_packHeuristic: ShelfPackerHeuristics = "BestArea";
//
//     protected pack_shelfRects = [] as ShelfRectangle[];
//
//     protected get CurrentShelf() : ShelfRectangle {
//         const index = this.pack_shelfRects.length - 1;
//         return index < 0 ? ShelfRectangle.EmptyShelfRectangle : this.pack_shelfRects[index];
//     }
//
//     protected MakeRectangleTall(rect: Rectangle) : Rectangle {
//         if(rect.width > this.pack_height && this.pack_OptAllowRotate) {
//             rect.rotated = !rect.rotated;
//         }
//         return rect;
//     }
//
//     protected MakeRectangleWide(rect: Rectangle) : Rectangle {
//         if(rect.width < this.pack_height && this.pack_OptAllowRotate) {
//             rect.rotated = !rect.rotated;
//         }
//         return rect;
//     }
//
//     protected MakeNewShelf(rect: Rectangle) : ShelfRectangle {
//         const result = ShelfRectangle.EmptyShelfRectangle;
//         result.maxX = result.x = this.pack_paddedCanvas.x;
//         result.width = this.pack_paddedCanvas.width;
//         result.height = rect.height;
//         result.bottom = this.CurrentShelf.isEmpty ? this.pack_paddedCanvas.bottom : rect.bottom; // - this.CurrentShelf.height;
//         this.pack_shelfRects.push(result);
//  //
//  //        console.warn(`
//  // == shelf:  ${this.pack_shelfRects.length} shelves, current: ${JSON.stringify(result)}
//  // == canvas: ${JSON.stringify(this.pack_paddedCanvas)}`);
//
//         return result;
//     }
//
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     protected override OnAfterInit(project: Project, width?: number, height?: number): boolean {
//
//         this.pack_innerPadding = project?.options?.innerPadding ?? 0;
//         this.pack_shelfRects = [];
//         this.pack_packHeuristic = this.GetHeuristic(project);
//
//         if(!Object.keys(this.pack_PlaceSpriteByHeuristic).length) {
//             this.pack_PlaceSpriteByHeuristic["NextFit"] =
//                 (project: Project, rect: Rectangle, shelf?: ShelfRectangle) => this.Heuristic_NextFit(project, rect, shelf);
//             this.pack_PlaceSpriteByHeuristic["FirstFit"] =
//                 (project: Project, rect: Rectangle, shelf?: ShelfRectangle) => this.Heuristic_FirstFit(project, rect, shelf);
//             this.pack_PlaceSpriteByHeuristic["BestWidth"] =
//                 (project: Project, rect: Rectangle, shelf?: ShelfRectangle) => this.Heuristic_BestWidth(project, rect, shelf);
//             this.pack_PlaceSpriteByHeuristic["BestHeight"] =
//                 (project: Project, rect: Rectangle, shelf?: ShelfRectangle) => this.Heuristic_BestHeight(project, rect, shelf);
//             this.pack_PlaceSpriteByHeuristic["BestArea"] =
//                 (project: Project, rect: Rectangle, shelf?: ShelfRectangle) => this.Heuristic_BestArea(project, rect, shelf);
//             this.pack_PlaceSpriteByHeuristic["WorstWidth"] =
//                 (project: Project, rect: Rectangle, shelf?: ShelfRectangle) => this.Heuristic_WorstWidth(project, rect, shelf);
//             this.pack_PlaceSpriteByHeuristic["WorstHeight"] =
//                 (project: Project, rect: Rectangle, shelf?: ShelfRectangle) => this.Heuristic_WorstHeight(project, rect, shelf);
//             this.pack_PlaceSpriteByHeuristic["WorstArea"] =
//                 (project: Project, rect: Rectangle, shelf?: ShelfRectangle) => this.Heuristic_WorstArea(project, rect, shelf);
//         }
//
//         return true;
//     }
//
//     protected override OnPlaceSprite(project: Project, hash: string, rotate?: boolean): boolean {
//
//         if (rotate) {
//             // we do our own rotation checks
//             return false;
//         }
//
//         const image = project.images[hash];
//         const frames = image?.frames ?? [];
//
//         if(frames.length === 0) {
//             LogHelper.LogMessage("WARN", `The image with key of '${hash}' has no frames.`)
//             return false;
//         }
//
//         if(this.CurrentShelf.isEmpty) {
//             const r = Rectangle.Copy(frames[0].spriteRect);
//             r.bottom = this.pack_paddedCanvas.bottom;
//             this.MakeNewShelf(r);
//         }
//
//         const placeSprite = this.pack_PlaceSpriteByHeuristic[this.pack_packHeuristic as string];
//
//         for (const frame of frames) {
//
//             if(this.CurrentShelf.maxX + frame.spriteRect.width > this.CurrentShelf.width) {
//                 const r = Rectangle.Copy(frame.spriteRect);
//                 r.y = this.CurrentShelf.top - r.height;
//                 this.MakeNewShelf(r);
//             }
//
//             let breakOuterLoop = false;
//
//             for(let i = 0; i < 3; i++) {
//                 if(i >= 2) { return false; }
//
//                 if (!this.pack_paddedCanvas.Contains(this.CurrentShelf)) {
//                     LogHelper.LogMessage("DEBUG", `Canvas overflow in OnPlaceSprite().`);
//                     return false;
//                 }
//
//                 const rect = Rectangle.Empty;
//                 rect.width = frame.spriteRect.width + this.pack_innerPadding * 2;
//                 rect.height = frame.spriteRect.height + this.pack_innerPadding * 2;
//                 rect.x = Math.max(this.CurrentShelf.maxX, this.pack_paddedCanvas.x);
//                 rect.bottom = this.CurrentShelf.bottom;
//                 rect.rotated = i > 0;
//
//                 if(rect.rotated && !this.pack_OptAllowRotate) {
//                     continue;
//                 }
//
//                 const placeSpriteResult =
//                     placeSprite(project, rect);
//
// console.info(`
//  >> ${JSON.stringify(placeSpriteResult, null, 2)}`);
//
//                 if (placeSpriteResult.success) {
//                     const newRect = placeSpriteResult.rect;
//                     frame.spriteRect.x = newRect.x;
//                     frame.spriteRect.y = newRect.y;
//                     frame.spriteRect.width = newRect.width;
//                     frame.spriteRect.height = newRect.height;
//                     frame.spriteRect.rotated = newRect.rotated;
//
//                     if(project.options.animatedGif === "Use First Frame") {
//                         breakOuterLoop = true;
//                         break;
//                     }
//
//                     i++; i++; i++;
//                 }
//             }
//
//             if(breakOuterLoop) { break; }
//         }
//
//         return true;
//     }
//
// // //////////////////////////////////////////////
// // //////////////////////////////////////////////
// // //////////////////////////////////////////////
// // //////////////////////////////////////////////
//
//     protected Heuristic_NextFit(project: Project, rect: Rectangle, shelf?: ShelfRectangle): PlaceSpriteResult {
//         const result = new PlaceSpriteResult(this.pack_paddedCanvas);
//         result.rect = Rectangle.Copy(rect);
//         result.shelf = shelf = shelf ?? this.CurrentShelf;
//         const willNotFit = this.CurrentShelf.maxX + rect.width > this.CurrentShelf.width;
//
//         if(shelf.isEmpty) {
//             result.rect.bottom = this.pack_paddedCanvas.bottom;
//             result.rect.x = this.pack_paddedCanvas.x;
//             result.shelf = shelf = shelf ?? this.MakeNewShelf(result.rect);
//         } else if(willNotFit) {
//             result.rect.bottom = this.CurrentShelf.top + this.pack_OptPaddingShape;
//             result.rect.x = shelf.maxX;
//             result.shelf = shelf = shelf ?? this.MakeNewShelf(result.rect);
//         }
//
//         result.rect.x = shelf.maxX;
//         result.rect.bottom = shelf.bottom;
//         result.shelf.maxX += rect.width + this.pack_OptPaddingShape;
//         result.shelf.rects.push(result.rect);
//
//         return result;
//     }
//
//     protected Heuristic_BestWorstHelper(project: Project, rect: Rectangle, shelf?: ShelfRectangle): PlaceSpriteResult[] {
//         const result = [] as PlaceSpriteResult[];
//         rect = Rectangle.Copy(rect); // TODO: needed ??
//         shelf = shelf ?? this.CurrentShelf;
//
//         // // const result = new PlaceSpriteResult();
//         // // result.rect = Rectangle.Copy(rect);
//         // // result.shelf = shelf = shelf ?? this.CurrentShelf;
//
//         if(shelf.isEmpty) {
//             rect.bottom = this.pack_paddedCanvas.bottom;
//             rect.x = this.pack_paddedCanvas.x;
//             shelf = this.MakeNewShelf(rect);
//         }
//
//         //
//         // // result.rect.x = shelf.maxX;
//         // // result.rect.bottom = shelf.bottom;
//         // //
//         // // return result;
//
//         for(const target of this.pack_shelfRects) {
//             const placed = this.Heuristic_NextFit(project, rect, target);
//             if(placed.success) {
//                 placed.widthAfterPlace = placed.rect.right;
//                 placed.heightAfterPlace = placed.rect.top;
//                 placed.areaAfterPlace = placed.shelf.area - rect.area;
//                 for(const r of placed.shelf.rects) {
//                     placed.areaAfterPlace -= r.area;
//                 }
//                 result.push(placed);
//             }
//         }
//
//         return result;
//     }
//
//     protected Heuristic_BestWorstHelperFiltered(project: Project, rect: Rectangle, shelf?: ShelfRectangle, minMax?: "MIN" | "MAX", field?: "widthAfterPlace" | "heightAfterPlace" | "areaAfterPlace"): PlaceSpriteResult {
//         minMax = minMax ?? "MIN";
//         field = field ?? "areaAfterPlace";
//         const results = this.Heuristic_BestWorstHelper(project, rect, shelf);
//         let result = new PlaceSpriteResult(this.pack_paddedCanvas);
//         result[field] = minMax === "MIN" ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
//         for(const res of results) {
//             if(minMax === "MIN" && res[field] < result[field]) {
//                 result = res;
//             } else if(minMax === "MAX" && res[field] > result[field]) {
//                 result = res;
//             }
//         }
//         return result;
//     }
//
//
//     protected Heuristic_FirstFit(project: Project, rect: Rectangle, shelf?: ShelfRectangle): PlaceSpriteResult {
//         const results = this.Heuristic_BestWorstHelper(project, rect, shelf);
//         return results.length > 0 ?
//             results[0] :
//             new PlaceSpriteResult(this.pack_paddedCanvas);
//     }
//
//     protected Heuristic_WorstWidth(project: Project, rect: Rectangle, shelf?: ShelfRectangle): PlaceSpriteResult {
//         return this.Heuristic_BestWorstHelperFiltered(project, rect, shelf, "MAX", "widthAfterPlace");
//     }
//
//     protected Heuristic_BestWidth(project: Project, rect: Rectangle, shelf?: ShelfRectangle): PlaceSpriteResult {
//         return this.Heuristic_BestWorstHelperFiltered(project, rect, shelf, "MIN", "widthAfterPlace");
//     }
//
//     protected Heuristic_WorstHeight(project: Project, rect: Rectangle, shelf?: ShelfRectangle): PlaceSpriteResult {
//         return this.Heuristic_BestWorstHelperFiltered(project, rect, shelf, "MAX", "heightAfterPlace");
//     }
//
//     protected Heuristic_BestHeight(project: Project, rect: Rectangle, shelf?: ShelfRectangle): PlaceSpriteResult {
//         return this.Heuristic_BestWorstHelperFiltered(project, rect, shelf, "MIN", "heightAfterPlace");
//     }
//
//     protected Heuristic_WorstArea(project: Project, rect: Rectangle, shelf?: ShelfRectangle): PlaceSpriteResult {
//         return this.Heuristic_BestWorstHelperFiltered(project, rect, shelf, "MAX", "areaAfterPlace");
//     }
//
//     protected Heuristic_BestArea(project: Project, rect: Rectangle, shelf?: ShelfRectangle): PlaceSpriteResult {
//         return this.Heuristic_BestWorstHelperFiltered(project, rect, shelf, "MIN", "areaAfterPlace");
//     }
//
//     private static _registerPacker = (() => {
//         return PackerHelper.RegisterPacker(new ShelfPacker());
//     })();
//
// }