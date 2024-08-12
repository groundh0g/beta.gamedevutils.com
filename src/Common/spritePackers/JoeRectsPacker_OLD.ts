import BasePacker from "./BasePacker";
import PackerHelper from "../PackerHelper";
import {
    JoeRectsPackerHeuristics,
    SortByTypes,
    SpritePackerTypes
} from "../Types";
import Project from "../../objs/Project";

type PackScores = { score1: number, score2: number };

export default class JoeRectsPacker_OLD extends BasePacker {

    public GetPackerType(): SpritePackerTypes {
        return "JoeRects";
    }

    public GetDefaultSortBy(): SortByTypes {
        return "AREA_DESC";
    }

    public GetPackerDescription(): string {
        return "";
    }

    public GetHeuristic(project: Project): JoeRectsPackerHeuristics {
        let heuristic: JoeRectsPackerHeuristics;

        if(project.options.packerHeuristics !== "InferFromSort") {
            return project.options.packerHeuristics as JoeRectsPackerHeuristics ?? "BestArea";
        }

        // TODO: implement BottomLeftRule and ContactPointRule
        switch(project.options.sortBy ?? this.GetDefaultSortBy()) {
            case "SHORTER_SIDE":
            case "LONGER_SIDE_DESC": // TODO: is this right ??
                heuristic = "BestShortSide";
                break;
            case "LONGER_SIDE":
            case "SHORTER_SIDE_DESC": // TODO: is this right ??
                heuristic = "BestLongSide";
                break;
            case "AREA":
            case "AREA_DESC":
            case "PERIMETER":
            case "PERIMETER_DESC":
            default:
                heuristic = "BestArea";
                break;
        }

        return heuristic;
    }

    protected override OnPlaceSprite(project: Project, key: string, rotate?: boolean): boolean {
        return super.OnPlaceSprite(project, key, rotate);
    }

//
//     public static get BIG_NUMBER() : number { return Number.MAX_SAFE_INTEGER; }
//
//     public pack_freeRects: Rectangle[] = [] as Rectangle[];
//     public pack_newFreeRects: Rectangle[] = [] as Rectangle[];
//     public pack_usedRects: Rectangle[] = [] as Rectangle[];
//
//     public pack_frames = [] as ImageFrame[];
//
//     protected OnInit(project: Project): boolean {
//         this.pack_frames = BasePacker.ExtractFrames(project);
//         return true;
//     }
//
//     // protected pack_currentX: number = 0;
//     // protected pack_currentY: number = 0;
//
//     protected OnPack(project: Project): boolean {
//         // // this.pack_heuristic = "BestShortSide" | "BestLongSide" | "BestArea" [| "BottomLeftRule" | "ContactPointRule"]
//
//         // // let wasMaxSize: boolean = false;
//         // const frames = BasePacker.ExtractFrames(project); // TODO: optimize by extracting once?
//         const frames = this.pack_frames?.length > 0 ? this.pack_frames : BasePacker.ExtractFrames(project);
//
//         while (!this.pack_complete) {
//             const fitsConstraints =
//                 this.pack_width <= project.options.width &&
//                 this.pack_height <= project.options.height;
//
//             const padding = Math.max(this.pack_paddingBorder, this.pack_paddingShape);
//
//             if (fitsConstraints) { // this.pack_framesProcessed === 0) {
//                 this.pack_freeRects = [] as Rectangle[];
//                 this.pack_newFreeRects = [] as Rectangle[];
//                 this.pack_usedRects = [] as Rectangle[];
//
//                 // const paddedCanvas =
//                 //     Rectangle.Inflate(Rectangle.Create(0, 0, this.pack_width, this.pack_height), -padding);
//                 const paddedCanvas =
//                     Rectangle.Create(0, 0, this.pack_width, this.pack_height);
//                 this.pack_freeRects.push(paddedCanvas);
//             } else {
//                 // TODO: DEAD CODE?
//                 this.DoCompleteCallback(false, project);
//                 break;
//             }
//
//             let breakOuterLoop = false;
//
//             for(const frame of frames) {
//                 const rect = this._placeByHeuristic(project, frame.spriteRect);
//
//                 if(!rect.isEmpty) {
//                     // keep going ...
//                 } else {
//                     // const newWidth  = this.pack_width  + BasePacker.GROW_BY; //  /* Math.max(self.width,  frame.rectSprite.x + frame.rectSprite.width ) */ + self.paddingBorder * 2;
//                     // const newHeight = this.pack_height + BasePacker.GROW_BY; //  /* Math.max(self.height, frame.rectSprite.y + frame.rectSprite.height) */ + self.paddingBorder * 2;
//
//                     if(this.DoResize(project)) {
//                         // // TODO: DEAD CODE?
//                         // // exit loop and start over
//                         // if(!this.DoInit(project, this.pack_width, this.pack_height)) {
//                         //     this.DoCompleteCallback(false, project);
//                         //     return this.pack_success;
//                         // }
//                         LogHelper.LogMessage("WARN", `Restarting packer after resize to ${this.pack_width}x${this.pack_height}.`)
//                         breakOuterLoop = true;
//                         break;
//                         // } else {
//                         //     // TODO: DEAD CODE?
//                         //     // we have a problem; won't fit; stop trying
//                         //     LogHelper.LogMessage("ERROR", `Image ${frame.spriteRect.width}x${frame.spriteRect.height} won't fit within the specified constraints ${project.options.width}x${project.options.height}.`);
//                         //     this.DoCompleteCallback(false, project);
//                         //     return !!this.pack_success;
//                     }
//                     else {
//                         // we have a problem; won't fit; stop trying
//                         // LogHelper.LogMessage("ERROR", `Image '${image.fullpath}' won't fit within the specified constraints. ${project.options.width ?? 1024}x${project.options.height ?? 1024}`);
//                         LogHelper.LogMessage("ERROR", `Image won't fit within the specified constraints. ${project.options.width ?? 1024}x${project.options.height ?? 1024}`);
//                         this.DoCompleteCallback(false, project);
//                         return false;
//                     }
//                 }
//             }
//
//             if(!breakOuterLoop) {
//                 this.DoCompleteCallback(true, project);
//                 // break;
//                 return this.pack_success;
//             }
//         }
//
//         // TODO: DEAD CODE?
//         this.DoCompleteCallback(true, project);
//         return this.pack_success;
//     }
//
//     private _placeRect(project: Project, rect: Rectangle) : void {
//         for(let i = 0; i < this.pack_freeRects.length;)
//         {
//             if (this._splitFreeRect(this.pack_freeRects[i], rect))
//             {
//                 this.pack_freeRects[i] = this.pack_freeRects[this.pack_freeRects.length - 1];
//                 this.pack_freeRects.pop();
//             }
//             else {
//                 i++;
//             }
//         }
//
//         this._pruneFreeRects();
//
//         this.pack_usedRects.push(rect);
//     }
//
//     private _placeByHeuristic(project: Project, rect: Rectangle) : Rectangle {
//         const scores: PackScores = { score1: JoeRectsPacker.BIG_NUMBER, score2: JoeRectsPacker.BIG_NUMBER };
//         // const padding = Math.max(project.options.shapePadding || 0, project.options.innerPadding || 0);
//         // // const paddedWidth  = rect.width  + padding * 2;
//         // // const paddedHeight = rect.height + padding * 2;
//         // // let result: Rectangle = Rectangle.Create(0, 0, paddedWidth, paddedHeight);
//         let result: Rectangle = Rectangle.Empty;
//
//         switch(this.GetHeuristic(project)) {
//             case "BestShortSide": // short side of a free rectangle
//                 result = this._placeByBestShortSideFit(rect, scores);
//                 break;
//             case "BestLongSide":      // long side of free rectangle
//                 result = this._placeByBestLongSideFit(rect, scores);
//                 break;
//             // case "BottomLeftRule":       // "Tetris" placement
//             //     result = this._placeByBottomLeftRule(rect, scores);
//             //     break;
//             // case "ContactPointRule":     // rectangle touches other rects as much as possible
//             //     result = this._placeByContactPointRule(rect, scores);
//             //     break;
//             case "BestArea": // smallest free rect
//             default:
//                 result = this._placeByBestAreaFit(rect, scores, project.options.allowRotate === "Yes");
//                 break;
//         }
//
//         if (!result.isEmpty) {
//             rect.x = result.x;
//             rect.y = result.y;
//             // assert(rect.width === result.width);
//             // assert(rect.height === result.height);
//             rect.width = result.width;
//             rect.height = result.height;
//             rect.rotated = result.rotated;
//
//             this._placeRect(project, result);
//
//             // // TODO: verify this  is needed ...
//             // let rectsToProcess = this.pack_freeRects.length;
//             // for(let i = 0; i < rectsToProcess; i++) {
//             //     if (this._splitFreeRect(this.pack_freeRects[i], result)) {
//             //         this.pack_freeRects.splice(i,1);
//             //         i = 0;
//             //         i--;
//             //         rectsToProcess--;
//             //     }
//             // }
//
//             this._pruneFreeRects();
//
//             // // TODO: verify this is needed ...
//             // const padding = Math.max(project.options.shapePadding || 0, project.options.innerPadding || 0);
//             // Rectangle.Inflate(result, -padding);
//             // // result.x += padding;
//             // // result.y += padding;
//             // // result.width  -= padding * 2;
//             // // result.height -= padding * 2;
//
//         }
//
//
//
// // TODO: what was this?
// if (!result.isEmpty) {
//     // let rectsToProcess = this.pack_freeRects.length;
//     // for(let i = 0; i < rectsToProcess; i++) {
//     //     if (this._splitFreeRect(this.pack_freeRects[i], result)) {
//     //         this.pack_freeRects.splice(i,1);
//     //         i = 0;
//     //         i--;
//     //         rectsToProcess--;
//     //     }
//     // }
//     this._pruneFreeRects();
// }
//
// // // TODO: what was this?
// // const padding = Math.max(project.options.shapePadding || 0, project.options.innerPadding || 0);
// // result.x += padding;
// // result.y += padding;
// // result.width  -= padding * 2;
// // result.height -= padding * 2;
//
//         return result;
//     }
//
//     private _pruneFreeRects() : void {
//         for(let i = 0; i < this.pack_freeRects.length; i++) {
//             // for(var j = i+1; j < this.pack_newFreeRects.length;) { // j++) {
//             for(let j = 0; j < this.pack_newFreeRects.length;) { // j++) {
//                 // TODO: make sure the contains check isn't inverted
//                 if (this.pack_freeRects[i].isEmpty || this.pack_freeRects[i].Contains(this.pack_newFreeRects[j])) {
//                 // if (/* this.pack_freeRects[i].isEmpty || */ this.pack_newFreeRects[j].ContainedIn(this.pack_freeRects[i])) {
//                     this.pack_newFreeRects[j] = this.pack_newFreeRects[this.pack_newFreeRects.length - 1] as Rectangle;
//                     this.pack_newFreeRects.pop();
//                     // this.pack_freeRects.splice(i,1);
//                     // i--;
//                     // break;
//                 }
//                 else {
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
//         // if (usedRect.x < freeRect.right && usedRect.right > freeRect.x) {
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
//                 newRect.y = usedRect.bottom;
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
//         // assert(!newFreeRect.isEmpty);
//
//         for(let i = 0; i < this._newFreeRectsLastSize;)
//         {
//             // This new free rectangle is already accounted for?
//             if (this.pack_newFreeRects[i].Contains(newFreeRect)) {
//             // if (newFreeRect.ContainedIn(this.pack_newFreeRects[i])) {
//                 return;
//             }
//
//             // Does this new free rectangle obsolete a previous new free rectangle?
//             if (newFreeRect.Contains(this.pack_newFreeRects[i]))
//             {
//                 // Remove i'th new free rectangle, but do so by retaining the order
//                 // of the older vs newest free rectangles that we may still be placing
//                 // in calling function SplitFreeNode().
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
//         let bestAreaFit: number = JoeRectsPacker.BIG_NUMBER;
//         let bestShortSideFit: number = JoeRectsPacker.BIG_NUMBER;
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
//             if(this.pack_allowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width) {
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
//         // return bestAreaFit === JoeRectsPacker.BIG_NUMBER ? Rectangle.Empty : rect;
//         return bestAreaFit === JoeRectsPacker.BIG_NUMBER ? Rectangle.Empty : result;
//         // return rect;
//     }
//
//     private _placeByBestShortSideFit(rect: Rectangle, scores: PackScores) : Rectangle {
//         const result: Rectangle = Rectangle.Empty;
//         let bestShortSideFit: number = JoeRectsPacker.BIG_NUMBER;
//         let bestLongSideFit: number = JoeRectsPacker.BIG_NUMBER;
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
//             if(this.pack_allowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width) {
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
//             bestShortSideFit === JoeRectsPacker.BIG_NUMBER &&
//             bestLongSideFit === JoeRectsPacker.BIG_NUMBER
//             ? Rectangle.Empty : rect);
//     }
//
//     private _placeByBestLongSideFit(rect: Rectangle, scores: PackScores) : Rectangle {
//         const result: Rectangle = Rectangle.Empty;
//         let bestShortSideFit: number = JoeRectsPacker.BIG_NUMBER;
//         let bestLongSideFit: number = JoeRectsPacker.BIG_NUMBER;
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
//             if(this.pack_allowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width) {
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
//             bestLongSideFit === JoeRectsPacker.BIG_NUMBER &&
//             bestShortSideFit === JoeRectsPacker.BIG_NUMBER
//             ? Rectangle.Empty : rect);
//     }
//
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     private _placeByBottomLeftRule(rect: Rectangle, scores: PackScores) : Rectangle {
//         return Rectangle.Empty;
//     }
//
//     /// Returns 0 if the two intervals i1 and i2 are disjoint, or the length of their overlap otherwise.
//     private _calcCommonIntervalLength(i1start: number, i1end: number, i2start: number, i2end: number) {
//         if (i1end < i2start || i2end < i1start)
//             return 0;
//
//         return Math.min(i1end, i2end) - Math.max(i1start, i2start);
//     }
//
//     private _calcContactPointScoreNode(x: number, y: number, width: number, height: number) {
//
//         let score: number = 0;
//
//         if (x == 0 || x + width == this.pack_width)
//             score += height;
//         if (y == 0 || y + height == this.pack_height)
//             score += width;
//
//         for (const usedRect of this.pack_usedRects) {
//             if (usedRect.x == x + width || usedRect.x + usedRect.width == x)
//                 score += this._calcCommonIntervalLength(usedRect.y, usedRect.y + usedRect.height, y, y + height);
//             if (usedRect.y == y + height || usedRect.y + usedRect.height == y)
//                 score += this._calcCommonIntervalLength(usedRect.x, usedRect.x + usedRect.width, x, x + width);
//         }
//
//         return score;
//     }
//
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     private _placeByContactPointRule(rect: Rectangle, scores: PackScores) : Rectangle {
//         const result: Rectangle = Rectangle.Empty;
//
//         let bestContactScore: number = -1;
//
//         for(const freeRect of this.pack_freeRects) {
//             // Try to place the rectangle in upright orientation.
//             if (freeRect.width >= rect.width && freeRect.height >= rect.height)
//             {
//                 const score = this._calcContactPointScoreNode(freeRect.x, freeRect.y, rect.width, rect.height);
//
//                 if (score > bestContactScore)
//                 {
//                     rect.x = result.x = freeRect.x;
//                     rect.y = result.y = freeRect.y;
//                     rect.width = result.width = rect.width; // TODO: really?
//                     rect.height = result.height = rect.height; // TODO: really?
//                     rect.rotated = result.rotated = false;
//                     bestContactScore = score;
//                 }
//             }
//             if (this.pack_allowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width)
//             {
//                 const score = this._calcContactPointScoreNode(freeRect.x, freeRect.y, rect.height, rect.width);
//
//                 if (score > bestContactScore)
//                 {
//                     rect.x = result.x = freeRect.x;
//                     rect.y = result.y = freeRect.y;
//                     rect.width = result.width = rect.height;
//                     rect.height = result.height = rect.width;
//                     rect.rotated = result.rotated = true;
//                     bestContactScore = score;
//                 }
//             }
//         }
//         return (bestContactScore === -1) ? Rectangle.Empty : result;
//     }
//
//     private static _registerPacker = (() => {
//         return PackerHelper.RegisterPacker(new JoeRectsPacker());
//     })();

}