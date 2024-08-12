import Project from "../../objs/Project";
import {AllHeuristics, BasicPackerHeuristics, SortByTypes, SpritePackerTypes} from "../Types";
import PackerHelper from "../PackerHelper";
import BasePacker from "./BasePacker";
import Rectangle from "../../objs/Rectangle";

export default class BasicPacker extends BasePacker {

    public GetPackerDescription(): string {
        return `
The ${this.GetPackerType()} packer is essentially a modified ShelfPacker with a constant sort 
method ('${this.GetDefaultSortBy()}') and heuristic ('${this.GetHeuristic()}').
`.trim();
    }

    public GetPackerType(): SpritePackerTypes {
        return "Basic"; // this is really a ShelfPacker variant, right?
    }

    public GetDefaultSortBy(): SortByTypes {
        return "HEIGHT_DESC"; // "AREA_DESC";
    }

    // public GetDefaultHeuristic(): AllHeuristics {
    //     return "BasicDefault";
    // }


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public GetHeuristic(project?: Project): BasicPackerHeuristics {
        return "BasicDefault";
    }

    protected pack_currentX: number = 0;
    protected pack_currentY: number = 0;
    protected pack_maxY: number = 0;
    protected pack_innerPadding: number = 0;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected override OnAfterInit(project: Project, width?: number, height?: number): boolean {

        this.pack_currentX = this.pack_paddedCanvas.x;
        this.pack_maxY = this.pack_currentY = this.pack_paddedCanvas.y;

        return true;
    }

    protected override OnPlaceSprite(project: Project, hash: string, rotate?: boolean) {

        const image = project.images[hash]
        const frames = image?.frames ?? [];

        const isRotated = !!rotate && this.pack_OptAllowRotate;
        const paddingShape = this.pack_OptPaddingShape;

        for(const frame of frames) {
            const rect = Rectangle.Create(
                this.pack_currentX,
                this.pack_currentY,
                frame.spriteRect.width + this.pack_innerPadding * 2,
                frame.spriteRect.height + this.pack_innerPadding * 2,
                isRotated
            );

            if(this.pack_paddedCanvas.Contains(rect)) {
                frame.spriteRect.x = rect.x;
                frame.spriteRect.y = rect.y;
                frame.spriteRect.rotated = isRotated;
                // this.pack_currentX += rect.width + this.pack_OptPaddingShape;
                // this.pack_maxY = Math.max(this.pack_maxY, rect.bottom) + this.pack_OptPaddingShape;
                this.pack_currentX = rect.right + paddingShape;
                this.pack_maxY = Math.max(this.pack_maxY, rect.bottom) + paddingShape;
            } else {
                rect.rotated = isRotated;
                frame.spriteRect.x = rect.x = this.pack_paddedCanvas.x;
                frame.spriteRect.y = rect.y = this.pack_maxY + paddingShape;
                frame.spriteRect.rotated = !isRotated;
                if(this.pack_paddedCanvas.Contains(rect)) {
                    this.pack_currentX = rect.right;
                    this.pack_currentY = rect.top;
                    this.pack_maxY = rect.bottom;
                } else {
                    return false;
                }
            }
            if(project.options.animatedGif === "Use First Frame") { break; }
        }
        return true;
    }

    private static _registerPacker = (() => {
        return PackerHelper.RegisterPacker(new BasicPacker());
    })();

}