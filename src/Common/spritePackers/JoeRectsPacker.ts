// import BasePacker from "./BasePacker";
// import PackerHelper from "../PackerHelper";
// import {
//     JoeRectsPackerHeuristics,
//     SortByTypes,
//     SpritePackerTypes
// } from "../Types";
// import Project from "../../objs/Project";
// import Rectangle from "../../objs/Rectangle";
// import ImageFrame from "../../objs/ImageFrame";
// import assert from "node:assert";
// import LogHelper from "../LogHelper";
//
// type PackScores = { score1: number, score2: number };
// type PlaceSpriteByHeuristicMethod = (rect?: Rectangle, scores?: PackScores) => PlaceSpriteResult;
// type PlaceSpriteByHeuristic = { [key: string]: PlaceSpriteByHeuristicMethod };
//
//
// class PlaceSpriteResult {
//     public constructor(paddedCanvas: Rectangle, scores?: PackScores) {
//         this.paddedCanvas = paddedCanvas;
//         this.scores = scores ?? { score1: Number.MAX_SAFE_INTEGER, score2: Number.MAX_SAFE_INTEGER};
//         this.rect = Rectangle.Empty;
//     }
//
//     public paddedCanvas: Rectangle;
//     public rect: Rectangle;
//     public scores: PackScores;
//
//     // public touchingPerimeterAfterPlace = 0;
//     //
//     // public calcTouchingPerimeter(rects: Rectangle[] | Rectangle) {
//     //     this.touchingPerimeterAfterPlace = 0;
//     //
//     //     // sum outer perimeter of the padded canvas
//     //     if(this.rect.x === 0 || this.rect.right === this.paddedCanvas.right) {
//     //         this.touchingPerimeterAfterPlace += this.rect.height;
//     //     }
//     //     if(this.rect.y === 0 || this.rect.bottom === this.paddedCanvas.bottom) {
//     //         this.touchingPerimeterAfterPlace += this.rect.width;
//     //     }
//     //
//     //     // Returns 0 if the two intervals i1 and i2 are disjoint, or the length of their overlap otherwise.
//     //     const calcCommonLength = (i1start: number, i1end: number, i2start: number, i2end: number) : number => {
//     //         if (i1end < i2start || i2end < i1start) { return 0; }
//     //         return Math.min(i1end, i2end) - Math.max(i1start, i2start);
//     //     };
//     //
//     //     // sum touching perimeters of given rectangles
//     //     const normalized = rects as Rectangle[] ?? [rects as Rectangle];
//     //     for(const r of normalized) {
//     //         if(r.x === this.rect.right || r.right === this.rect.left) {
//     //             this.touchingPerimeterAfterPlace += calcCommonLength(r.y, r.bottom, this.rect.y, this.rect.bottom);
//     //         }
//     //         if(r.y === this.rect.bottom || r.bottom === this.rect.top) {
//     //             this.touchingPerimeterAfterPlace += calcCommonLength(r.x, r.right, this.rect.x, this.rect.right);
//     //         }
//     //     }
//     // }
//
//     public widthAfterPlace: number = 0;
//     public heightAfterPlace: number = 0;
//     public areaAfterPlace: number = 0;
//
//     public get success(): boolean {
//         return (
//             !this.rect.isEmpty &&
//             this.paddedCanvas.Contains(this.rect) &&
//             this.scores.score1 < Number.MAX_SAFE_INTEGER &&
//             this.scores.score2 < Number.MAX_SAFE_INTEGER
//         );
//     }
// }
//
// export default class JoeRectsPacker extends BasePacker {
//
//     public GetPackerType(): SpritePackerTypes {
//         return "JoeRects";
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
//     public GetHeuristic(project: Project): JoeRectsPackerHeuristics {
//         let heuristic: JoeRectsPackerHeuristics;
//
//         if(project?.options.packerHeuristics !== "InferFromSort") {
//             return project?.options.packerHeuristics as JoeRectsPackerHeuristics ?? "BestArea";
//         }
//
//         // TODO: implement BottomLeftRule and ContactPointRule
//         switch(project?.options.sortBy ?? this.GetDefaultSortBy()) {
//             case "SHORTER_SIDE":
//             case "LONGER_SIDE_DESC": // TODO: is this right ??
//                 heuristic = "BestShortSide";
//                 break;
//             case "LONGER_SIDE":
//             case "SHORTER_SIDE_DESC": // TODO: is this right ??
//                 heuristic = "BestLongSide";
//                 break;
//             // case "AREA": // TODO: valid?
//             // case "PERIMETER": // TODO: valid?
//             case "AREA_DESC":
//             case "PERIMETER_DESC":
//             default:
//                 heuristic = "BestArea";
//                 break;
//         }
// // TODO: remove this line; here for testing only
// heuristic = "BestArea";
//         return heuristic;
//     }
//
//     // joeRectsPackerHeuristics >>> ["BestShortSide", "BestLongSide", "BestArea"] as const; // , "BottomLeftRule", "ContactPointRule"] as const;
//
//     public pack_freeRects: Rectangle[] = [] as Rectangle[];
//     public pack_newFreeRects: Rectangle[] = [] as Rectangle[];
//     public pack_usedRects: Rectangle[] = [] as Rectangle[];
//
//     public pack_frames = [] as ImageFrame[];
//
//     protected pack_PlaceSpriteByHeuristic: PlaceSpriteByHeuristic = {};
//
//     protected pack_innerPadding: number = 0;
//     protected pack_packHeuristic: JoeRectsPackerHeuristics = "BestArea";
//
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     protected override OnAfterInit(project: Project, width?: number, height?: number): boolean {
//         this.pack_newFreeRects = [] as Rectangle[];
//         this.pack_usedRects = [] as Rectangle[];
//         this.pack_freeRects = [] as Rectangle[];
//         this.pack_freeRects.push(this.pack_paddedCanvas);
//
//         // TODO: move these 3 lines into first-run logic block?
//         this.pack_frames = BasePacker.ExtractFrames(project);
//         this.pack_packHeuristic = this.GetHeuristic(project);
//         this.pack_innerPadding = project?.options?.innerPadding ?? 0;
//
//         // joeRectsPackerHeuristics >>> ["BestShortSide", "BestLongSide", "BestArea"] as const; // , "BottomLeftRule", "ContactPointRule"] as const;
//         if(!Object.keys(this.pack_PlaceSpriteByHeuristic).length) {
//             this.pack_PlaceSpriteByHeuristic["BestShortSide"] =
//                 (rect?: Rectangle, scores?: PackScores) => this.Heuristic_BestShortSide(rect, scores);
//             this.pack_PlaceSpriteByHeuristic["BestLongSide"] =
//                 (rect?: Rectangle, scores?: PackScores) => this.Heuristic_BestLongSide(rect, scores);
//             this.pack_PlaceSpriteByHeuristic["BestArea"] =
//                 (rect?: Rectangle, scores?: PackScores) => this.Heuristic_BestArea(rect, scores);
//             this.pack_PlaceSpriteByHeuristic["BottomLeftRule"] =
//                 (rect?: Rectangle, scores?: PackScores) => this.Heuristic_BottomLeftRule(rect, scores);
//             this.pack_PlaceSpriteByHeuristic["ContactPointRule"] =
//                 (rect?: Rectangle, scores?: PackScores) => this.Heuristic_ContactPointRule(rect, scores);
//         }
//
//         return true;
//     }
//
//     protected override OnPlaceSprite(project: Project, hash: string, rotate?: boolean) : boolean {
//
//         if (rotate) {
//             // we do our own rotation checks
//             return false;
//         }
//
//         const image = project.images[hash];
//         const frames = image?.frames ?? [];
//
//         if (frames.length === 0) {
//             LogHelper.LogMessage("WARN", `The image with key of '${hash}' has no frames.`)
//             return false;
//         }
//
//         // TODO: This is likely completely useless ...
//         if(this.pack_freeRects.length === 0) {
//             this.pack_freeRects.push(this.pack_paddedCanvas);
//         }
//
//         const placeSprite = this.pack_PlaceSpriteByHeuristic[this.pack_packHeuristic as string];
//
//         for (const frame of frames) {
//
//             let breakOuterLoop = false;
//
//             // for (let i = 0; i < 3; i++) {
//             //     if (i >= 2) { return false; }
//
//                 const scores: PackScores = {score1: Number.MAX_SAFE_INTEGER, score2: Number.MAX_SAFE_INTEGER};
//
//
//
//
//                 const rect = Rectangle.Empty;
//                 rect.width = frame.spriteRect.width + this.pack_innerPadding * 2;
//                 rect.height = frame.spriteRect.height + this.pack_innerPadding * 2;
//                 rect.x = this.pack_paddedCanvas.x;
//                 rect.y = this.pack_paddedCanvas.y;
//                 rect.rotated = false;
//
//                 // if(rect.rotated && !this.pack_OptAllowRotate) {
//                 //     continue;
//                 // }
//
//                 const placeSpriteResult =
//                     placeSprite(rect, scores);
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
//                     if (project.options.animatedGif === "Use First Frame") {
//                         breakOuterLoop = true;
//                         break;
//                     }
//
// this._placeRect(newRect);
// this._pruneFreeRects();
//
//                     // i++; i++; i++;
//                 }
//             // }
//
//             if (breakOuterLoop) { break; }
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
//     protected Heuristic_BestShortSide(rect?: Rectangle, scores?: PackScores) : PlaceSpriteResult {
//         const result = new PlaceSpriteResult(this.pack_paddedCanvas, scores);
//         result.rect = rect ?? Rectangle.Empty;
//         return result;
//     }
//
//     protected Heuristic_BestLongSide(rect?: Rectangle, scores?: PackScores) : PlaceSpriteResult {
//         const result = new PlaceSpriteResult(this.pack_paddedCanvas, scores);
//         result.rect = rect ?? Rectangle.Empty;
//         return result;
//     }
//
//     protected Heuristic_BestArea(rect?: Rectangle, scores?: PackScores) : PlaceSpriteResult {
//         const result = new PlaceSpriteResult(this.pack_paddedCanvas, scores);
//         let bestAreaFit: number = scores?.score1 ?? Number.MAX_SAFE_INTEGER;
//         let bestShortSideFit: number = scores?.score2 ?? Number.MAX_SAFE_INTEGER;
//         rect = rect ?? Rectangle.Empty;
//         result.rect = rect;
//         result.scores.score1 = bestAreaFit; // Number.MAX_SAFE_INTEGER
//         result.scores.score2 = bestShortSideFit; // Number.MAX_SAFE_INTEGER
//
//         if(rect.isEmpty) { return result; }
//
//         for(const freeRect of this.pack_freeRects) {
//             for(let i = 0; i < 2; i++) {
//                 let wasBetter = false;
//                 // TODO: move out of inner loop? rotated rect has the same area.
//                 const areaFit: number =
//                     freeRect.width * freeRect.height -
//                     rect.width * rect.height;
//
// // if(areaFit < 0) {
// //     result.rect = Rectangle.Empty;
// //     return result;
// // }
//
//                 if(rect.width * rect.height > this.pack_paddedCanvas.width * this.pack_paddedCanvas.height) {
//                     result.rect = Rectangle.Empty;
//                     return result;
//                 }
//
//                 rect.x = freeRect.x;
//                 rect.y = freeRect.y;
//                 rect.rotated = (i === 1);
//
//                 if(rect.rotated && !this.pack_OptAllowRotate) {
//                     // result.rect = Rectangle.Empty;
//                     // return result;
//                     continue;
//                 }
//
//                 if (freeRect.right >= rect.right && freeRect.bottom >= rect.bottom) {
//                     const leftoverHoriz: number = Math.abs(freeRect.width - rect.width);
//                     const leftoverVert: number = Math.abs(freeRect.height - rect.height);
//                     const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
//
//                     // const favorTop: boolean = (this.pack_height >= this.pack_width && freeRect.y < result.y);
//                     // const favorLeft: boolean = (this.pack_height <= this.pack_width && freeRect.x < result.x);
//
//                     // if (areaFit < bestAreaFit || (areaFit == bestAreaFit && (shortSideFit < bestShortSideFit || favorTop || favorLeft))) {
//                     if (areaFit < bestAreaFit || (areaFit == bestAreaFit && (shortSideFit < bestShortSideFit))) {
//                         // rect.x = result.x = freeRect.x;
//                         // rect.y = result.y = freeRect.y;
//                         rect.x = result.rect.x = freeRect.x; // rect.x + freeRect.x;
//                         rect.y = result.rect.y = freeRect.y; //rect.y + freeRect.y;
//                         rect.width = result.rect.width = rect.width;
//                         rect.height = result.rect.height = rect.height;
//                         rect.rotated = result.rect.rotated = rect.rotated;
//                         bestShortSideFit = shortSideFit;
//                         bestAreaFit = areaFit;
//                         // processedRect = true;
//                         // i++; // i++;
//                         // continue;
//                         wasBetter = true;
//                     }
//                 }
//
//                 if(/* result.success && */ wasBetter) {
//                     result.scores.score1 = bestAreaFit;
//                     result.scores.score2 = bestShortSideFit;
//                     i++; i++;
//                 }
//             }
//         }
//
//         if(!result.success) {
//         //     this._placeRect(result.rect);
//         //     this._pruneFreeRects();
//         // } else {
//             rect.x = result.rect.x = -1024;
//             rect.y = result.rect.y = -1024;
//         }
//
//         return result;
//     }
//
//     protected Heuristic_BottomLeftRule(rect?: Rectangle, scores?: PackScores) : PlaceSpriteResult {
//         const result = new PlaceSpriteResult(this.pack_paddedCanvas, scores);
//         result.rect = rect ?? Rectangle.Empty;
//         return result;
//     }
//
//     protected Heuristic_ContactPointRule(rect?: Rectangle, scores?: PackScores) : PlaceSpriteResult {
//         const result = new PlaceSpriteResult(this.pack_paddedCanvas, scores);
//         result.rect = rect ?? Rectangle.Empty;
//         return result;
//     }
//
// //     protected OnPack(project: Project): boolean {
// //         // // this.pack_heuristic = "BestShortSide" | "BestLongSide" | "BestArea" [| "BottomLeftRule" | "ContactPointRule"]
// //
// //         // // let wasMaxSize: boolean = false;
// //         // const frames = BasePacker.ExtractFrames(project); // TODO: optimize by extracting once?
// //         const frames = this.pack_frames?.length > 0 ? this.pack_frames : BasePacker.ExtractFrames(project);
// //
// //         while (!this.pack_complete) {
// //             const fitsConstraints =
// //                 this.pack_width <= project.options.width &&
// //                 this.pack_height <= project.options.height;
// //
// //             const padding = Math.max(this.pack_paddingBorder, this.pack_paddingShape);
// //
// //             if (fitsConstraints) { // this.pack_framesProcessed === 0) {
// //                 this.pack_freeRects = [] as Rectangle[];
// //                 this.pack_newFreeRects = [] as Rectangle[];
// //                 this.pack_usedRects = [] as Rectangle[];
// //
// //                 // const paddedCanvas =
// //                 //     Rectangle.Inflate(Rectangle.Create(0, 0, this.pack_width, this.pack_height), -padding);
// //                 const paddedCanvas =
// //                     Rectangle.Create(0, 0, this.pack_width, this.pack_height);
// //                 this.pack_freeRects.push(paddedCanvas);
// //             } else {
// //                 // TODO: DEAD CODE?
// //                 this.DoCompleteCallback(false, project);
// //                 break;
// //             }
// //
// //             let breakOuterLoop = false;
// //
// //             for(const frame of frames) {
// //                 const rect = this._placeByHeuristic(project, frame.spriteRect);
// //
// //                 if(!rect.isEmpty) {
// //                     // keep going ...
// //                 } else {
// //                     // const newWidth  = this.pack_width  + BasePacker.GROW_BY; //  /* Math.max(self.width,  frame.rectSprite.x + frame.rectSprite.width ) */ + self.paddingBorder * 2;
// //                     // const newHeight = this.pack_height + BasePacker.GROW_BY; //  /* Math.max(self.height, frame.rectSprite.y + frame.rectSprite.height) */ + self.paddingBorder * 2;
// //
// //                     if(this.DoResize(project)) {
// //                         // // TODO: DEAD CODE?
// //                         // // exit loop and start over
// //                         // if(!this.DoInit(project, this.pack_width, this.pack_height)) {
// //                         //     this.DoCompleteCallback(false, project);
// //                         //     return this.pack_success;
// //                         // }
// //                         LogHelper.LogMessage("WARN", `Restarting packer after resize to ${this.pack_width}x${this.pack_height}.`)
// //                         breakOuterLoop = true;
// //                         break;
// //                         // } else {
// //                         //     // TODO: DEAD CODE?
// //                         //     // we have a problem; won't fit; stop trying
// //                         //     LogHelper.LogMessage("ERROR", `Image ${frame.spriteRect.width}x${frame.spriteRect.height} won't fit within the specified constraints ${project.options.width}x${project.options.height}.`);
// //                         //     this.DoCompleteCallback(false, project);
// //                         //     return !!this.pack_success;
// //                     }
// //                     else {
// //                         // we have a problem; won't fit; stop trying
// //                         // LogHelper.LogMessage("ERROR", `Image '${image.fullpath}' won't fit within the specified constraints. ${project.options.width ?? 1024}x${project.options.height ?? 1024}`);
// //                         LogHelper.LogMessage("ERROR", `Image won't fit within the specified constraints. ${project.options.width ?? 1024}x${project.options.height ?? 1024}`);
// //                         this.DoCompleteCallback(false, project);
// //                         return false;
// //                     }
// //                 }
// //             }
// //
// //             if(!breakOuterLoop) {
// //                 this.DoCompleteCallback(true, project);
// //                 // break;
// //                 return this.pack_success;
// //             }
// //         }
// //
// //         // TODO: DEAD CODE?
// //         this.DoCompleteCallback(true, project);
// //         return this.pack_success;
// //     }
//
//     // private _placeRect(project: Project, rect: Rectangle) : void {
//     private _placeRect(rect: Rectangle) : void {
//         for(let i = 0; i < this.pack_freeRects.length; i++)
//         {
//             if (this._splitFreeRect(this.pack_freeRects[i], rect))
//             {
//                 this.pack_freeRects[i] = this.pack_freeRects[this.pack_freeRects.length - 1];
//                 this.pack_freeRects.pop();
//                 i--;
//             }
//         }
//
//         this._pruneFreeRects();
//
//         this.pack_usedRects.push(rect);
//     }
//
//
//
//
//     // protected Heuristic_BestWorstHelper(project: Project, rect: Rectangle, shelf?: ShelfRectangle): PlaceSpriteResult[] {
//     //     const result = [] as PlaceSpriteResult[];
//     //     rect = Rectangle.Copy(rect); // TODO: needed ??
//     //     shelf = shelf ?? this.CurrentShelf;
//     //
//     //     // // const result = new PlaceSpriteResult();
//     //     // // result.rect = Rectangle.Copy(rect);
//     //     // // result.shelf = shelf = shelf ?? this.CurrentShelf;
//     //
//     //     if(shelf.isEmpty) {
//     //         rect.bottom = this.pack_paddedCanvas.bottom;
//     //         rect.x = this.pack_paddedCanvas.x;
//     //         shelf = this.MakeNewShelf(rect);
//     //     }
//     //
//     //     //
//     //     // // result.rect.x = shelf.maxX;
//     //     // // result.rect.bottom = shelf.bottom;
//     //     // //
//     //     // // return result;
//     //
//     //     for(const target of this.pack_shelfRects) {
//     //         const placed = this.Heuristic_NextFit(project, rect, target);
//     //         if(placed.success) {
//     //             placed.widthAfterPlace = placed.rect.right;
//     //             placed.heightAfterPlace = placed.rect.top;
//     //             placed.areaAfterPlace = placed.shelf.area - rect.area;
//     //             for(const r of placed.shelf.rects) {
//     //                 placed.areaAfterPlace -= r.area;
//     //             }
//     //             result.push(placed);
//     //         }
//     //     }
//     //
//     //     return result;
//     // }
//     //
//     // protected Heuristic_BestWorstHelperFiltered(project: Project, rect: Rectangle, shelf?: ShelfRectangle, minMax?: "MIN" | "MAX", field?: "widthAfterPlace" | "heightAfterPlace" | "areaAfterPlace"): PlaceSpriteResult {
//     //     minMax = minMax ?? "MIN";
//     //     field = field ?? "areaAfterPlace";
//     //     const results = this.Heuristic_BestWorstHelper(project, rect, shelf);
//     //     let result = Rectangle.Copy(this.pack_paddedCanvas);
//     //     result[field] = minMax === "MIN" ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
//     //     for(const res of results) {
//     //         if(minMax === "MIN" && res[field] < result[field]) {
//     //             result = res;
//     //         } else if(minMax === "MAX" && res[field] > result[field]) {
//     //             result = res;
//     //         }
//     //     }
//     //     return result;
//     // }
//
//
//
//
//
// //     private _placeByHeuristic(project: Project, rect: Rectangle) : Rectangle {
// //         const scores: PackScores = { score1: Number.MAX_SAFE_INTEGER, score2: Number.MAX_SAFE_INTEGER };
// //         // const padding = Math.max(project.options.shapePadding || 0, project.options.innerPadding || 0);
// //         // // const paddedWidth  = rect.width  + padding * 2;
// //         // // const paddedHeight = rect.height + padding * 2;
// //         // // let result: Rectangle = Rectangle.Create(0, 0, paddedWidth, paddedHeight);
// //         let result: Rectangle = Rectangle.Empty;
// //
// //
// //
// //
// //
// //
// //
// //
// //         switch(this.GetHeuristic(project)) {
// //             case "BestShortSide": // short side of a free rectangle
// //                 result = this._placeByBestShortSideFit(rect, scores);
// //                 break;
// //             case "BestLongSide":      // long side of free rectangle
// //                 result = this._placeByBestLongSideFit(rect, scores);
// //                 break;
// //             // case "BottomLeftRule":       // "Tetris" placement
// //             //     result = this._placeByBottomLeftRule(rect, scores);
// //             //     break;
// //             // case "ContactPointRule":     // rectangle touches other rects as much as possible
// //             //     result = this._placeByContactPointRule(rect, scores);
// //             //     break;
// //             case "BestArea": // smallest free rect
// //             default:
// //                 result = this._placeByBestAreaFit(rect, scores, project.options.allowRotate === "Yes");
// //                 break;
// //         }
// //
// //         if (!result.isEmpty) {
// //             rect.x = result.x;
// //             rect.y = result.y;
// //             // assert(rect.width === result.width);
// //             // assert(rect.height === result.height);
// //             rect.width = result.width;
// //             rect.height = result.height;
// //             rect.rotated = result.rotated;
// //
// //             this._placeRect(project, result);
// //
// //             // // TODO: verify this  is needed ...
// //             // let rectsToProcess = this.pack_freeRects.length;
// //             // for(let i = 0; i < rectsToProcess; i++) {
// //             //     if (this._splitFreeRect(this.pack_freeRects[i], result)) {
// //             //         this.pack_freeRects.splice(i,1);
// //             //         i = 0;
// //             //         i--;
// //             //         rectsToProcess--;
// //             //     }
// //             // }
// //
// //             this._pruneFreeRects();
// //
// //             // // TODO: verify this is needed ...
// //             // const padding = Math.max(project.options.shapePadding || 0, project.options.innerPadding || 0);
// //             // Rectangle.Inflate(result, -padding);
// //             // // result.x += padding;
// //             // // result.y += padding;
// //             // // result.width  -= padding * 2;
// //             // // result.height -= padding * 2;
// //
// //         }
// //
// //
// //
// // // TODO: what was this?
// // if (!result.isEmpty) {
// //     // let rectsToProcess = this.pack_freeRects.length;
// //     // for(let i = 0; i < rectsToProcess; i++) {
// //     //     if (this._splitFreeRect(this.pack_freeRects[i], result)) {
// //     //         this.pack_freeRects.splice(i,1);
// //     //         i = 0;
// //     //         i--;
// //     //         rectsToProcess--;
// //     //     }
// //     // }
// //     this._pruneFreeRects();
// // }
// //
// // // // TODO: what was this?
// // // const padding = Math.max(project.options.shapePadding || 0, project.options.innerPadding || 0);
// // // result.x += padding;
// // // result.y += padding;
// // // result.width  -= padding * 2;
// // // result.height -= padding * 2;
// //
// //         return result;
// //     }
//
//     private _pruneFreeRects() : void {
//         for(let i = 0; i < this.pack_freeRects.length; i++) {
//             // for(var j = i+1; j < this.pack_newFreeRects.length;) { // j++) {
//             for(let j = i; j < this.pack_newFreeRects.length;) { // j++) {
//                 // TODO: make sure the contains check isn't inverted
//                 if (this.pack_freeRects[i].isEmpty || this.pack_freeRects[i].Contains(this.pack_newFreeRects[j])) {
//                 // if (/* this.pack_freeRects[i].isEmpty || */ this.pack_newFreeRects[j].ContainedIn(this.pack_freeRects[i])) {
//                     this.pack_newFreeRects[j] = this.pack_newFreeRects[this.pack_newFreeRects.length - 1] as Rectangle;
//                     this.pack_newFreeRects.pop();
//                     // this.pack_freeRects.splice(i,1);
//                     // i--;
//                     // break;
//                 } else {
//                     // TODO: make sure the contains check isn't inverted
//                     // // if (this.pack_freeRects[j].isEmpty || this.pack_freeRects[j].ContainedIn(this.pack_freeRects[i])) {
//                     //     this.pack_freeRects.splice(j,1);
//                     //     assert(!this.pack_freeRects[j].ContainedIn(this.pack_freeRects[i]));
//                     //     j++;
//                     // // }
//
//                     // since new free rects keep decreasing in size, the new free rect
//                     // can never contain an older free rect
//                     // assert(!this.pack_freeRects[i].ContainedIn(this.pack_newFreeRects[j]));
//                     assert(!this.pack_newFreeRects[j].Contains(this.pack_freeRects[i]));
//                     j++;
//                 }
//             }
//         }
//
//
//
//
//         // for(const rect of this.pack_usedRects) {
//         //     for(let i = 0; i < this.pack_newFreeRects.length; i++) {
//         //         if(this.pack_newFreeRects[i].Intersects(rect)) {
//         //             this.pack_newFreeRects[i] = this.pack_newFreeRects[this.pack_newFreeRects.length - 1];
//         //             this.pack_newFreeRects.pop();
//         //             i--;
//         //         }
//         //     }
//         //     for(let i = 0; i < this.pack_freeRects.length; i++) {
//         //         if(this.pack_freeRects[i].Intersects(rect)) {
//         //             this.pack_freeRects[i] = this.pack_freeRects[this.pack_freeRects.length - 1];
//         //             this.pack_freeRects.pop();
//         //             i--;
//         //         }
//         //     }
//         // }
//         //
//         // for(const freeRect of this.pack_freeRects) {
//         //     for(let i = 0; i < this.pack_newFreeRects.length; i++) {
//         //         if(this.pack_newFreeRects[i].Intersects(freeRect)) {
//         //             this.pack_newFreeRects[i] = this.pack_newFreeRects[this.pack_newFreeRects.length - 1];
//         //             this.pack_newFreeRects.pop();
//         //             i--;
//         //         }
//         //     }
//         // }
//
//
//
//
//         // Merge new and old free rectangles to the group of old free rectangles.
//         this.pack_freeRects = this.pack_freeRects.concat(this.pack_newFreeRects);
//         this.pack_newFreeRects = [] as Rectangle[];
//
//         // for(let i = 0; i < this.pack_freeRects.length; ++i)
//         // {
//         //     for (let j = i + 1; j < this.pack_freeRects.length; j++)
//         //     {
//         //         assert(!this.pack_freeRects[i].ContainedIn(this.pack_freeRects[j]));
//         //         assert(!this.pack_freeRects[j].ContainedIn(this.pack_freeRects[i]));
//         //     }
//         // }
//     }
//
//     private _newFreeRectsLastSize: number = 0;
//     private _splitFreeRect(freeRect: Rectangle, usedRect: Rectangle) : boolean {
//
//         // if there's no overlap between rectangles, nothing to do
//         if (usedRect.x >= freeRect.right || usedRect.right <= freeRect.x || usedRect.y >= freeRect.bottom || usedRect.bottom <= freeRect.y) {
//             return false;
//         }
//
//         // We add up to four new free rectangles to the free rectangles list below.
//         // Keep track of them to avoid testing them against each other. They cannot
//         // intersect / overlap.
//         this._newFreeRectsLastSize = this.pack_newFreeRects.length;
//         let rectsWereProcessed: boolean = false;
//
//         if (usedRect.x >= freeRect.x && usedRect.right <= freeRect.right) {
//
//             // New node at the top side of the used node.
//             if (usedRect.y > freeRect.y && usedRect.bottom <= freeRect.bottom) {
//                 const newRect = Rectangle.Copy(freeRect);
//                 newRect.height = usedRect.y - newRect.y;
//                 this._insertNewFreeRectangle(newRect);
//                 rectsWereProcessed = true;
//             }
//
//             // New node at the bottom side of the used node.
//             if (usedRect.bottom < freeRect.bottom && usedRect.y >= freeRect.y) {
//                 const newRect = Rectangle.Copy(freeRect);
//                 newRect.y = usedRect.y;
//                 newRect.height = freeRect.bottom - usedRect.bottom;
//                 this._insertNewFreeRectangle(newRect);
//                 rectsWereProcessed = true;
//             }
//         }
//
//         if (usedRect.y >= freeRect.y && usedRect.bottom <= freeRect.bottom) {
//
//             // New node at the left side of the used node.
//             if (usedRect.x > freeRect.x && usedRect.right <= freeRect.right) {
//                 const newRect = Rectangle.Copy(freeRect);
//                 newRect.width = usedRect.x - newRect.x;
//                 this._insertNewFreeRectangle(newRect);
//                 rectsWereProcessed = true;
//             }
//
//             // New node at the right side of the used node.
//             if (usedRect.right < freeRect.right && usedRect.x >= freeRect.x) {
//                 const newRect = Rectangle.Copy(freeRect);
//                 newRect.x = usedRect.right;
//                 newRect.width = freeRect.right - usedRect.right;
//                 this._insertNewFreeRectangle(newRect);
//                 rectsWereProcessed = true;
//             }
//         }
//
//         return rectsWereProcessed; // true; // rectsWereProcessed;
//     }
//
//     private _splitFreeRect_OLD(freeRect: Rectangle, usedRect: Rectangle) : boolean {
//
//         // no overlap between rectangles
//         if (usedRect.x >= freeRect.right || usedRect.right <= freeRect.x || usedRect.y >= freeRect.bottom || usedRect.bottom <= freeRect.y) {
//             return false;
//         }
//
//         // We add up to four new free rectangles to the free rectangles list below.
//         // Keep track of them to avoid testing them against each other. They cannot
//         // intersect / overlap.
//         this._newFreeRectsLastSize = this.pack_newFreeRects.length;
//         let rectsWereProcessed: boolean = false;
//
//         if (usedRect.x < freeRect.right && usedRect.right > freeRect.x) {
//
//             // New node at the top side of the used node.
//             if (usedRect.y >= freeRect.y && usedRect.y < freeRect.bottom) {
//                 const newRect = Rectangle.Copy(freeRect);
//                 newRect.height = usedRect.y - newRect.y;
//                 this._insertNewFreeRectangle(newRect);
//                 rectsWereProcessed = true;
//             }
//
//             // New node at the bottom side of the used node.
//             if (usedRect.bottom < freeRect.bottom) {
//                 const newRect = Rectangle.Copy(freeRect);
//                 // newRect.y = usedRect.bottom;
//                 newRect.y = usedRect.y;
//                 newRect.height = freeRect.bottom - usedRect.bottom;
//                 this._insertNewFreeRectangle(newRect);
//                 rectsWereProcessed = true;
//             }
//         }
//
//         if (usedRect.y < freeRect.bottom && usedRect.bottom > freeRect.y) {
//
//             // New node at the left side of the used node.
//             if (usedRect.x >= freeRect.x && usedRect.x < freeRect.right) {
//                 const newRect = Rectangle.Copy(freeRect);
//                 newRect.width = usedRect.x - newRect.x;
//                 this._insertNewFreeRectangle(newRect);
//                 rectsWereProcessed = true;
//             }
//
//             // New node at the right side of the used node.
//             if (usedRect.right <= freeRect.right) {
//                 const newRect = Rectangle.Copy(freeRect);
//                 newRect.x = usedRect.right;
//                 newRect.width = freeRect.right - usedRect.right;
//                 this._insertNewFreeRectangle(newRect);
//                 rectsWereProcessed = true;
//             }
//         }
//
//         return rectsWereProcessed; // true; // rectsWereProcessed;
//     }
//
//     private _insertNewFreeRectangle(newFreeRect: Rectangle) : void {
//
//         if (newFreeRect.isEmpty) { return; }
//
//         for(let i = 0; i < this._newFreeRectsLastSize;)
//         {
//             // This new free rectangle is already accounted for?
//             if (this.pack_newFreeRects[i].Contains(newFreeRect)) {
//                 return;
//             }
//
//             // Does this new free rectangle obsolete a previous new free rectangle?
//             if (newFreeRect.Contains(this.pack_newFreeRects[i]))
//             {
//                 // Remove i'th new free rectangle, but do so by retaining the order
//                 // of the older vs newest free rectangles that we may still be placing
//                 // in calling function SplitFreeNode()
//                 this.pack_newFreeRects[i] = this.pack_newFreeRects[--this._newFreeRectsLastSize];
//                 this.pack_newFreeRects[this._newFreeRectsLastSize] = this.pack_newFreeRects[this.pack_newFreeRects.length - 1];
//                 this.pack_newFreeRects.pop();
//             }
//             else {
//                 i++;
//             }
//         }
//
//         this.pack_newFreeRects.push(newFreeRect);
//         // TODO: is this new logic valid?
//         this._newFreeRectsLastSize = this.pack_newFreeRects.length;
//     }
//
//     private _placeByBestAreaFit(rect: Rectangle, scores: PackScores, allowRotate: boolean) : Rectangle {
//
//         // const result: Rectangle = Rectangle.Empty;
//         let bestAreaFit: number = Number.MAX_SAFE_INTEGER;
//         let bestShortSideFit: number = Number.MAX_SAFE_INTEGER;
//
//         // // TODO: is this OK? untested.
//         // // TODO: DEAD CODE?
//         // if(rect.isEmpty) {
//         //     return rect;
//         // }
//
//         const result = Object.assign(Rectangle.Empty, rect);
//
//         // let processedRect: boolean = false;
//         for(const freeRect of this.pack_freeRects) {
//             // processedRect = false;
//             const areaFit: number =
//                 freeRect.width * freeRect.height -
//                 rect.width * rect.height;
//
//             if(freeRect.width >= rect.width && freeRect.height >= rect.height) {
//                 const leftoverHoriz: number = Math.abs(freeRect.width - rect.width);
//                 const leftoverVert: number = Math.abs(freeRect.height - rect.height);
//                 const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
//
//                 // const favorTop: boolean = (this.pack_height >= this.pack_width && freeRect.y < result.y);
//                 // const favorLeft: boolean = (this.pack_height <= this.pack_width && freeRect.x < result.x);
//
//                 // if (areaFit < bestAreaFit || (areaFit == bestAreaFit && (shortSideFit < bestShortSideFit || favorTop || favorLeft))) {
//                 if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit)) {
//                     // rect.x = result.x = freeRect.x;
//                     // rect.y = result.y = freeRect.y;
//                     result.x = rect.x + freeRect.x;
//                     result.y = rect.y + freeRect.y;
// result.width = rect.width; // TODO: really?
// result.height = rect.height; // TODO: really?
// result.rotated = rect.rotated = false;
//                     bestShortSideFit = shortSideFit;
//                     bestAreaFit = areaFit;
//                     // processedRect = true;
//                 }
//             }
//
//             if(this.pack_OptAllowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width) {
//                 const leftoverHoriz: number = Math.abs(freeRect.width - rect.height);
//                 const leftoverVert: number = Math.abs(freeRect.height - rect.width);
//                 const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
//
//                 if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit)) {
//                     // rect.x = result.x = freeRect.x;
//                     // rect.y = result.y = freeRect.y;
//                     result.x = rect.x + freeRect.x;
//                     result.y = rect.y + freeRect.y;
//                     // rect.width = result.width = rect.height;
//                     // rect.height = result.height = rect.width;
// result.height = rect.width;
// result.width = rect.height;
// result.rotated = rect.rotated = true;
//                     bestShortSideFit = shortSideFit;
//                     bestAreaFit = areaFit;
//                     // processedRect = true;
//                 }
//             }
//
//             // if(!processedRect) { break; }
//         }
//
//         scores.score1 = bestAreaFit;
//         scores.score2 = bestShortSideFit;
//
//         // if(!processedRect) {
//         //     console.log(`Rect won't fit: ${JSON.stringify(rect, null, 3)}`)
//         //     LogHelper.LogMessage("WARN", `Rect won't fit: ${JSON.stringify(rect)}`);
//         // }
//         // return bestAreaFit === Number.MAX_SAFE_INTEGER ? Rectangle.Empty : rect;
//         return bestAreaFit === Number.MAX_SAFE_INTEGER ? Rectangle.Empty : result;
//         // return rect;
//     }
//
//     private _placeByBestShortSideFit(rect: Rectangle, scores: PackScores) : Rectangle {
//         const result: Rectangle = Rectangle.Empty;
//         let bestShortSideFit: number = Number.MAX_SAFE_INTEGER;
//         let bestLongSideFit: number = Number.MAX_SAFE_INTEGER;
//
//         // // TODO: is this OK? untested.
//         // if(rect.isEmpty) {
//         //     return rect;
//         // }
//
//         for(const freeRect of this.pack_freeRects) {
//             if(freeRect.width >= rect.width && freeRect.height >= rect.height) {
//                 const leftoverHoriz: number = Math.abs(freeRect.width - rect.width);
//                 const leftoverVert: number = Math.abs(freeRect.height - rect.height);
//                 const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
//                 const longSideFit: number = Math.max(leftoverHoriz, leftoverVert);
//
//
//                 // if (shortSideFit < bestShortSideFit || (shortSideFit == bestShortSideFit && longSideFit < bestLongSideFit)) {
//                 //     rect.x = result.x = freeRect.x;
//                 //     rect.y = result.y = freeRect.y;
//                 //     rect.width = result.width = rect.width; // TODO: really?
//                 //     rect.height = result.height = rect.height; // TODO: really?
//                 //     rect.rotated = result.rotated = false;
//                 //     bestShortSideFit = shortSideFit;
//                 //     bestLongSideFit = longSideFit;
//                 // }
//
//                 if (shortSideFit < bestShortSideFit) {
//                     rect.x = result.x = freeRect.x;
//                     rect.y = result.y = freeRect.y;
//                     // rect.width = result.width = rect.width; // TODO: really?
//                     // rect.height = result.height = rect.height; // TODO: really?
//                     result.width = rect.width;
//                     result.height = rect.height;
//                     rect.rotated = result.rotated = false;
//                     bestShortSideFit = shortSideFit;
//                     bestLongSideFit = longSideFit;
//                 }
//                 // if (shortSideFit == bestShortSideFit && longSideFit < bestLongSideFit) {
//                 //     rect.x = result.x = freeRect.x;
//                 //     rect.y = result.y = freeRect.y;
//                 //     rect.width = result.width = rect.width; // TODO: really?
//                 //     rect.height = result.height = rect.height; // TODO: really?
//                 //     rect.rotated = result.rotated = false;
//                 //     bestShortSideFit = shortSideFit;
//                 //     bestLongSideFit = longSideFit;
//                 // }
//             }
//
//             if(this.pack_OptAllowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width) {
//                 const leftoverHoriz: number = Math.abs(freeRect.width - rect.height);
//                 const leftoverVert: number = Math.abs(freeRect.height - rect.width);
//                 const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
//                 const longSideFit: number = Math.max(leftoverHoriz, leftoverVert);
//
//                 if (shortSideFit < bestShortSideFit || (shortSideFit == bestShortSideFit && longSideFit < bestLongSideFit)) {
//                     rect.x = result.x = freeRect.x;
//                     rect.y = result.y = freeRect.y;
//                     rect.width = result.width = rect.height;
//                     rect.height = result.height = rect.width;
//                     rect.rotated = result.rotated = true;
//                     bestShortSideFit = shortSideFit;
//                     bestLongSideFit = longSideFit;
//                 }
//             }
//         }
//
//         scores.score1 = bestShortSideFit;
//         scores.score2 = bestLongSideFit;
//
//         // TODO: compare bestLongSideFit as well ??
//         return (
//             bestShortSideFit === Number.MAX_SAFE_INTEGER &&
//             bestLongSideFit === Number.MAX_SAFE_INTEGER
//             ? Rectangle.Empty : rect);
//     }
//
//     private _placeByBestLongSideFit(rect: Rectangle, scores: PackScores) : Rectangle {
//         const result: Rectangle = Rectangle.Empty;
//         let bestShortSideFit: number = Number.MAX_SAFE_INTEGER;
//         let bestLongSideFit: number = Number.MAX_SAFE_INTEGER;
//
//         // // TODO: is this OK? untested.
//         // if(rect.isEmpty) {
//         //     return rect;
//         // }
//
//         for(const freeRect of this.pack_freeRects) {
//             if(freeRect.width >= rect.width && freeRect.height >= rect.height) {
//                 const leftoverHoriz: number = Math.abs(freeRect.width - rect.width);
//                 const leftoverVert: number = Math.abs(freeRect.height - rect.height);
//                 const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
//                 const longSideFit: number = Math.max(leftoverHoriz, leftoverVert);
//
//
//                 if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
//                     rect.x = result.x = freeRect.x;
//                     rect.y = result.y = freeRect.y;
//                     rect.width = result.width = rect.width; // TODO: really?
//                     rect.height = result.height = rect.height; // TODO: really?
//                     rect.rotated = result.rotated = false;
//                     bestShortSideFit = shortSideFit;
//                     bestLongSideFit = longSideFit;
//                 }
//             }
//
//             if(this.pack_OptAllowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width) {
//                 const leftoverHoriz: number = Math.abs(freeRect.width - rect.height);
//                 const leftoverVert: number = Math.abs(freeRect.height - rect.width);
//                 const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
//                 const longSideFit: number = Math.max(leftoverHoriz, leftoverVert);
//
//                 if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
//                     rect.x = result.x = freeRect.x;
//                     rect.y = result.y = freeRect.y;
//                     rect.width = result.width = rect.height;
//                     rect.height = result.height = rect.width;
//                     rect.rotated = result.rotated = true;
//                     bestShortSideFit = shortSideFit;
//                     bestLongSideFit = longSideFit;
//                 }
//             }
//         }
//
//         scores.score1 = bestShortSideFit;
//         scores.score2 = bestLongSideFit;
//
//         // TODO: compare bestShortSideFit as well ??
//         return (
//             bestLongSideFit === Number.MAX_SAFE_INTEGER &&
//             bestShortSideFit === Number.MAX_SAFE_INTEGER
//             ? Rectangle.Empty : rect);
//     }
//
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     private _placeByBottomLeftRule(rect: Rectangle, scores: PackScores) : Rectangle {
//         return Rectangle.Empty;
//     }
//
//     /// Returns 0 if the two intervals i1 and i2 are disjoint, or the length of their overlap otherwise.
//     // private _calcCommonIntervalLength(i1start: number, i1end: number, i2start: number, i2end: number) {
//     //     if (i1end < i2start || i2end < i1start)
//     //         return 0;
//     //
//     //     return Math.min(i1end, i2end) - Math.max(i1start, i2start);
//     // }
//
//     // private _calcContactPointScoreNode(x: number, y: number, width: number, height: number) {
//     //
//     //     let score: number = 0;
//     //
//     //     if (x == 0 || x + width == this.pack_width)
//     //         score += height;
//     //     if (y == 0 || y + height == this.pack_height)
//     //         score += width;
//     //
//     //     for (const usedRect of this.pack_usedRects) {
//     //         if (usedRect.x == x + width || usedRect.x + usedRect.width == x)
//     //             score += this._calcCommonIntervalLength(usedRect.y, usedRect.y + usedRect.height, y, y + height);
//     //         if (usedRect.y == y + height || usedRect.y + usedRect.height == y)
//     //             score += this._calcCommonIntervalLength(usedRect.x, usedRect.x + usedRect.width, x, x + width);
//     //     }
//     //
//     //     return score;
//     // }
//
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     // private _placeByContactPointRule(rect: Rectangle, scores: PackScores) : Rectangle {
//     //     const result: Rectangle = Rectangle.Empty;
//     //
//     //     let bestContactScore: number = -1;
//     //
//     //     for(const freeRect of this.pack_freeRects) {
//     //         // Try to place the rectangle in upright orientation.
//     //         if (freeRect.width >= rect.width && freeRect.height >= rect.height)
//     //         {
//     //             const score = this._calcContactPointScoreNode(freeRect.x, freeRect.y, rect.width, rect.height);
//     //
//     //             if (score > bestContactScore)
//     //             {
//     //                 rect.x = result.x = freeRect.x;
//     //                 rect.y = result.y = freeRect.y;
//     //                 rect.width = result.width = rect.width; // TODO: really?
//     //                 rect.height = result.height = rect.height; // TODO: really?
//     //                 rect.rotated = result.rotated = false;
//     //                 bestContactScore = score;
//     //             }
//     //         }
//     //         if (this.pack_OptAllowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width)
//     //         {
//     //             const score = this._calcContactPointScoreNode(freeRect.x, freeRect.y, rect.height, rect.width);
//     //
//     //             if (score > bestContactScore)
//     //             {
//     //                 rect.x = result.x = freeRect.x;
//     //                 rect.y = result.y = freeRect.y;
//     //                 rect.width = result.width = rect.height;
//     //                 rect.height = result.height = rect.width;
//     //                 rect.rotated = result.rotated = true;
//     //                 bestContactScore = score;
//     //             }
//     //         }
//     //     }
//     //     return (bestContactScore === -1) ? Rectangle.Empty : result;
//     // }
//
//     private static _registerPacker = (() => {
//         return PackerHelper.RegisterPacker(new JoeRectsPacker());
//     })();
//
// }