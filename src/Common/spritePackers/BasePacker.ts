import ImageFrame from "../../objs/ImageFrame";
import {ISpritePacker} from "./ISpritePacker";
import {AllHeuristics, CallbackStatusTypes, SortByTypes, SpritePackerTypes} from "../Types";
import Project from "../../objs/Project";
import LogHelper, {MessageTypes} from "../LogHelper";
import ParserHelper from "../ParserHelper";
import ProjectOptions from "../../objs/ProjectOptions";
import MathHelper from "../MathHelper";
import Rectangle from "../../objs/Rectangle";
import SortHelper from "../SortHelper";
import PackerHelper from "../PackerHelper";

// export type FrameHashesType = { [key: string]: ImageFrame[] };

export default abstract class BasePacker implements ISpritePacker {

    // values used for the current packing task
    public pack_width: number = 0;
    public pack_height: number = 0;

    // project options as simple types
    protected pack_OptAllowRotate: boolean = false;
    protected pack_OptPaddingBorder: number = 0;
    protected pack_OptPaddingShape: number = 0;
    protected pack_OptPaddingInner: number = 0;
    // public pack_OptHeuristic: AllHeuristics = "InferFromSort";
    protected pack_OptUseAllFrames: boolean = false;

    // frame state
    protected pack_frameCount: number = 0;
    protected pack_framesProcessed: number = 0;
    protected pack_frameArea: number = 0;
    protected pack_visitedHashes = [] as string[];

    // public pack_frameHashes: FrameHashesType = {} as FrameHashesType;

    // timing logic support
    public pack_start: number | undefined = undefined;
    public pack_end: number | undefined = undefined;
    public pack_duration: number | undefined = undefined;

    public pack_success: boolean = false;
    public pack_complete: boolean = false;
    public pack_canceled: boolean = false;

    public pack_paddedCanvas: Rectangle = Rectangle.Empty;

    public abstract GetPackerType(): SpritePackerTypes;
    public abstract GetDefaultSortBy(): SortByTypes;
    // public abstract GetDefaultHeuristic(): AllHeuristics;
    public abstract GetHeuristic(project?: Project): AllHeuristics;
    public abstract GetPackerDescription(): string;

    protected secondsFormat = Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2
    });

    public GetSortedKeys(project: Project): string[] {
        return SortHelper.SortByMethods[project.options.sortBy ?? this.GetDefaultSortBy() ?? "AREA_DESC"](project);
    }

    public get GetOccupancy(): number {
        return Math.min(this.pack_frameArea / Math.min(this.pack_width * this.pack_height, 1.0), 1.0);
    }

    public static get GROW_BY() : number { return 8; }

    public static get MIN_SIZE() : number { return 8; }

    public static get DEFAULT_PADDING() : number { return 2; }


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnBeforePack(project: Project) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnAfterPack(project: Project) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnBeforeInit(project: Project, width?: number, height?: number) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnAfterInit(project: Project, width?: number, height?: number) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnBeforeResize(project: Project, width?: number, height?: number) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnAfterResize(project: Project, width?: number, height?: number) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnBeforeGuessSize(project: Project) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnAfterGuessSize(project: Project) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnComplete(project: Project, success: boolean) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnBeforeValidatePlacements(project: Project) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnAfterValidatePlacements(project: Project) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnBeforeRender(project: Project) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnAfterRender(project: Project) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnBeforeBumpSize(project: Project) { return true; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnAfterBumpSize(project: Project) { return true; }
    // protected OnPlaceSprite: BeforeOrAfterCallbackWithString = this.DoNothingCallbackWithString;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected OnPlaceSprite(project: Project, key: string, rotate?: boolean) {
        LogHelper.LogMessage("ERROR", `${this.GetPackerType()}Packer not yet implemented.`);
        return false;
    }

    // public static get BIG_NUMBER() : number { return Number.MAX_SAFE_INTEGER; }
    // public static get SMALL_NUMBER() : number { return Number.MIN_SAFE_INTEGER; }

    public DoPack(project: Project): CallbackStatusTypes {
        let result: CallbackStatusTypes = "Completed";
        const options = project.options;

        const keys = this.GetSortedKeys(project);

        if(!keys || keys.length < 1) {
            LogHelper.LogMessage("ERROR", `Failure in GetSortedKeys() - found ${keys?.length ?? 0} keys`);
            result = "Failed";
            this.DoComplete(project, true);
        } else if(this.OnBeforePack(project)){
            if(this.DoInit(project)) {
                if(this.DoGuessSize(project)) {

                    LogHelper.LogMessage("INFO", `Packing ${this.pack_frameCount} frames using the ${this.GetPackerType()} sprite packer into ${this.pack_width}x${this.pack_height}.`);
                    LogHelper.LogMessage("INFO", this.GetPackerDescription());

                    this.pack_success = false;

                    while(!this.CanceledOrComplete) {
                        this.pack_framesProcessed = 0;
                        for(let i = 0; i < keys.length; i++) { // const key of keys) {
                            const key = keys[i];
                            const nowSize = `${this.pack_width}x${this.pack_height}`;
                            const maxSize = `${options.width}x${options.height}`;
                            LogHelper.LogMessage("DEBUG", `   In OnPlaceSprite() for imageKey: '[${this.pack_framesProcessed}]: ${key}'; count: ${this.pack_framesProcessed + 1}/${keys.length}; size: ${nowSize}; maxSize: ${maxSize}`);

                            const image = project.images[key];
                            const frames = image ? image.frames ?? [] : [];
                            const rect = frames.length ? frames[0].spriteRect : Rectangle.Empty;

                            // this logic should short-circuit so that an initial success will bypass the
                            // second check. In the case where the packer does its own check for rotated
                            // fit, the worst case would be two calls, each with two checks before failing.
                            const placed =
                                this.OnPlaceSprite(project, key) ||
                                (rect.height != rect.width && this.OnPlaceSprite(project, key, true));

                            if (placed) {
                                if (this.Canceled) {
                                    LogHelper.LogMessage("WARN", `Packing was canceled by the user - ${this.pack_framesProcessed} frames processed`);
                                    result = "Canceled";
                                    this.pack_canceled = true;
                                    this.DoComplete(project, false);
                                    break;
                                }
                                // // TODO: Anything Else?
                                // this.pack_framesProcessed++;
                                // if(this.pack_framesProcessed === keys.length) {
                                //     result = "Completed";
                                //     this.pack_complete = true;
                                //     this.DoComplete(project, true);
                                //     break;
                                // }
                            }
                        }

                        if(!this.CanceledOrComplete) {
                            const w = this.pack_width;
                            const h = this.pack_height;
                            const allFrames = this.pack_framesProcessed === this.pack_frameCount;
                            if(allFrames) {
                                LogHelper.LogMessage("DEBUG", `Attempt to resize after successful packing to ${w}x${h}px`);
                                result = this.pack_canceled ? "Canceled" : "Completed";
                                this.DoComplete(project, true);
                                break;
                            }
                            if(!this.pack_success && !this.BumpSize(project)) {
                                LogHelper.LogMessage("ERROR", `Failure in BumpSize() for ${w}x${h}px`);
                                result = "Failed";
                                this.DoComplete(project, false);
                                break;
                            }

                            if(this.DoInit(project, this.pack_width, this.pack_height)) {
                                LogHelper.LogMessage("DEBUG", `Packing restarted due to canvas resize to ${this.pack_width}x${this.pack_height}`);
                            } else {
                                LogHelper.LogMessage("ERROR", `Failure in DoInit() after packing restarted due to canvas resize to ${this.pack_width}x${this.pack_height}`);
                                result = "Failed";
                                this.DoComplete(project, false);
                                break;
                            }
                        }
                    }
                } else {
                    LogHelper.LogMessage("ERROR", `Failure in DoGuessSize() for area of ${this.pack_frameArea}`);
                    result = "Failed";
                    this.DoComplete(project, false);
                }
            } else {
                LogHelper.LogMessage("ERROR", 'Failure in DoInit()');
                result = "Failed";
                this.DoComplete(project, false);
            }
        } else {
            LogHelper.LogMessage("ERROR", 'Failure in OnBeforePack()');
            result = "Failed";
            this.DoComplete(project, false);
        }

        if(!this.OnAfterPack(project)) {
            LogHelper.LogMessage("ERROR", 'Failure in OnAfterPack()');
            result = "Failed";
            this.DoComplete(project, false);
        }

        // set progress to 100%; we're done
        this.pack_framesProcessed = this.pack_frameCount;

        if(this.pack_success) {
            if (this.DoValidatePlacements(project)) {
                if(this.DoRender(project)) {
                    // do nothing; everything appears to have worked as expected
                } else {
                    LogHelper.LogMessage("ERROR", `Failure in DoRender()`);
                    result = "Failed";
                    this.DoComplete(project, false);
                }
            } else {
                LogHelper.LogMessage("ERROR", `Failure in DoValidatePlacements()`);
                result = "Failed";
                this.DoComplete(project, false);
            }
        }

        this.DoComplete(project, this.pack_success);

        // stop timer
        this.pack_start = this.pack_start ?? Date.now();
        this.pack_end = Date.now();
        this.pack_duration = (this.pack_end - this.pack_start) / 1000.0;

        LogHelper.LogMessage("LOG", `Processed ${this.pack_framesProcessed} frames in ${this.secondsFormat.format(this.pack_duration)} seconds ...`);
        if(this.pack_success) {
            LogHelper.LogMessage("LOG", 'There were no errors.');
        } else {
            LogHelper.LogMessage("ERROR", 'There was a problem processing some frames.');
        }

        return result;
    }

    protected DoComplete(project: Project, success: boolean) {
        this.pack_success = success;
        this.pack_complete = true;
        this.OnComplete(project, success);
    }

    protected BumpSize(project: Project): boolean {
        const originalWidth = this.pack_width;
        const originalHeight = this.pack_height;
        const options = project.options;
        let result = false;

        if(this.OnBeforeBumpSize(project)) {
            const width = this.pack_width || BasePacker.MIN_SIZE;
            const height = this.pack_height || BasePacker.MIN_SIZE;
            const newWidth = Math.min(options.width, width + BasePacker.GROW_BY);
            const newHeight = Math.min(options.height, height + BasePacker.GROW_BY);
            if(width > height) {
                result = this.DoResize(project, width, newHeight);
                const changed = width !== this.pack_width || height != this.pack_height;
                if(!result || !changed) { // && height < options.height) {
                    result = this.DoResize(project, newWidth, height);
                }
            } else if(height >= width) {
                result = this.DoResize(project, newWidth, height);
                const changed = width !== this.pack_width || height != this.pack_height;
                if(!result || !changed) { // && height < options.height) {
                    result = this.DoResize(project, width, newHeight);
                }
            }

            if(result) {
                if(!this.OnAfterBumpSize(project)) {
                    LogHelper.LogMessage("ERROR", 'Failure in OnAfterBumpSize()');
                    result = false;
                }
            }
        } else {
            LogHelper.LogMessage("ERROR", 'Failure in OnBeforeBumpSize()');
            result = false;
        }

        if(result) {
            this.pack_paddedCanvas = Rectangle.Inflate(Rectangle.Create(0, 0, this.pack_width, this.pack_height), -this.pack_paddedCanvas.x);
        }

        return result && (originalWidth != this.pack_width || originalHeight != this.pack_height);
    }

    protected DoResize(project: Project, width: number, height: number, isDoGuessSize?: boolean): boolean {
        const options = project?.options;
        const isFixedSize = (options?.sizeMode ?? "Max Size") === "Fixed Size"
        const isPowerOfTwo = (options?.constraint ?? "Any Size") === "Power of Two";
        const isForceSquare = (options?.forceSquare ?? "No") === "Yes";
        const errorType = (isDoGuessSize ? "DEBUG" : "ERROR") as MessageTypes;

        let result = true;

        if(this.OnBeforeResize(project, width, height)) {
            width = Math.max(width, BasePacker.MIN_SIZE);
            height = Math.max(height, BasePacker.MIN_SIZE);

            // enforce constraints
            if(isFixedSize) {
                width = options.width ?? BasePacker.MIN_SIZE;
                height = options.height ?? BasePacker.MIN_SIZE;
            }

            if(isForceSquare) {
                width = height = Math.max(width, height);
            }

            if(isPowerOfTwo) {
                width = MathHelper.IsPowerOfTwo(width) ? width : MathHelper.RoundUpToPowerOfTwo(width);
                height = MathHelper.IsPowerOfTwo(height) ? height : MathHelper.RoundUpToPowerOfTwo(height);
            }

            // validate constraints
            if(isFixedSize && (width != options.width || height != options.height)) {
                LogHelper.LogMessage(errorType, `Failure in DoResize() - fixed-size constraint not met for ${width}x${height}`);
                result = false;
            }

            if(isForceSquare && (width != height)) {
                LogHelper.LogMessage(errorType, `Failure in DoResize() - force-square constraint not met for ${width}x${height}`);
                result = false;
            }

            if(isPowerOfTwo && (!MathHelper.IsPowerOfTwo(width) || !MathHelper.IsPowerOfTwo(height))) {
                LogHelper.LogMessage(errorType, `Failure in DoResize() - power-of-two constraint not met for ${width}x${height}`);
                result = false;
            }

            // ensure no canvas overflow
            if(width > options.width || height > options.height) {
                LogHelper.LogMessage(errorType, `Failure in DoResize() - canvas overflow for ${width}x${height}`);
                result = false;
            }

            if(result) {
                if(!this.OnAfterResize(project, width, height)) {
                    LogHelper.LogMessage(errorType, 'Failure in OnAfterResize()');
                    result = false;
                }
            }
        } else {
            LogHelper.LogMessage(errorType, 'Failure in OnBeforeResize()');
            result = false;
        }

        if(result) {
            this.pack_width = width;
            this.pack_height = height;
        }

        return result;
    }

    public get Progress(): number {
        return Math.min(
            1.0,
            Math.abs((this.pack_framesProcessed) / (this.pack_frameCount || this.pack_framesProcessed || 1))
        );
    }

    public get Canceled(): boolean {
        return this.pack_canceled;
    }

    public get Complete(): boolean {
        return this.pack_complete;
    }

    public get CanceledOrComplete(): boolean {
        return this.pack_canceled || this.pack_complete;
    }

    protected DoInit(project: Project, width?: number, height?: number): boolean {
        const options = project.options;
        const isFirstInvocation = width === undefined || height === undefined;

        this.OnBeforeInit(project, width, height);

        // first call to DoInit()
        if(isFirstInvocation) {

            // start with a fresh log
            LogHelper.Clear();

            // reset canceled and complete flags
            this.pack_canceled = false; // TODO: this one might need to be static for web and desktop as multi-threaded?
            this.pack_complete = false;

            // enforce option constraints
            if(options.trimMode === "Trim" && options.trimThreshold === 255) {
                LogHelper.LogMessage("WARN", "TrimMode enabled, but with a trim threshold of 255.");
                LogHelper.LogMessage("WARN", "All sprites would be eliminated.");
                LogHelper.LogMessage("WARN", "Using a trim threshold of 1 instead.");
                options.trimThreshold = 1;
            }

            if(options.sizeMode === "Fixed Size") {
                width = options.width = Math.max(options.width || BasePacker.MIN_SIZE, BasePacker.MIN_SIZE);
                height = options.height = Math.max(options.height || BasePacker.MIN_SIZE, BasePacker.MIN_SIZE);
                LogHelper.LogMessage("INFO", `Enforcing fixed size of ${width}x${height}.`);
            }

            if(options.sizeMode === "Fixed Size" && options.constraint === "Power of Two" && (!MathHelper.IsPowerOfTwo(options.width) || !MathHelper.IsPowerOfTwo(options.height))) {
                const newWidth =
                    MathHelper.IsPowerOfTwo(options.width) ? options.width : MathHelper.RoundUpToPowerOfTwo(options.width);
                const newHeight =
                    MathHelper.IsPowerOfTwo(options.height) ? options.height : MathHelper.RoundUpToPowerOfTwo(options.height);
                LogHelper.LogMessage("WARN", `Power of Two constraint is enabled with Fixed Size, but the`);
                LogHelper.LogMessage("WARN", `width or height are not powers of two at ${options.width}x${options.height}.`);
                LogHelper.LogMessage("WARN", `Resizing would fail. Using a size of ${newWidth}x${newHeight} instead.`);
                width = options.width = newWidth;
                height = options.height = newHeight;
            }

            if(options.forceSquare === "Yes" && options.sizeMode == "Fixed Size" && options.width != options.height) {
                const newSize = Math.max(options.width, options.height);
                LogHelper.LogMessage("WARN", `Force Square is enabled with Fixed Size, but width and height don't match at ${options.width}x${options.height}.`);
                LogHelper.LogMessage("WARN", `Resizing would fail. Using a size of ${newSize}x${newSize} instead.`);
                width = height = options.width = options.height = newSize;
            }

            // start timer
            this.pack_start = Date.now();
            this.pack_end = undefined;
            this.pack_duration = undefined;

            // capture some properties as simpler types or backfill sensible defaults
            this.pack_OptAllowRotate = options.allowRotate === "Yes";
            this.pack_OptPaddingBorder = options.borderPadding ?? BasePacker.DEFAULT_PADDING;
            this.pack_OptPaddingShape = options.shapePadding ?? BasePacker.DEFAULT_PADDING;
            this.pack_OptUseAllFrames = options.animatedGif === "Extract Frames";

            const images = project.images;
            for(const hash in images) { images[hash].frames = [] as ImageFrame[]; }
        }

        // start packing again from scratch
        this.pack_framesProcessed = 0;

        // reset [x, y] for frames just to avoid stale data if things go wrong on the next pass
        for (const key in project.images) {
            const img = project.images[key];
            if(img.frames) {
                for (const frame of img.frames) {
                    frame.spriteRect.x = frame.spriteRect.y = 0;
                }
            }
        }

        // set padded canvas dimensions
        width = width ?? BasePacker.MIN_SIZE;
        height = height ?? BasePacker.MIN_SIZE;
        this.pack_paddedCanvas = PackerHelper.PaddedCanvas(project, width, height);

        let result = this.DoResize(project, width ?? BasePacker.MIN_SIZE, height ?? BasePacker.MIN_SIZE);

        result = this.OnAfterInit(project, width, height) && result;

        if(isFirstInvocation && result) {
            // (re)populate image frames
            if(!this.EnsureImageFramesArePopulated(project)) {
                LogHelper.LogMessage("ERROR", "Failure in EnsureImageFramesArePopulated()");
                return false;
            }
        }

        return result;
    }

    protected DoGuessSize(project: Project): boolean {
        this.OnBeforeGuessSize(project);
        if(project.options.sizeMode !== "Fixed Size") {
            while((this.pack_width * this.pack_height) < this.pack_frameArea) {
                if(!this.BumpSize(project)) {
                    LogHelper.LogMessage("ERROR", `Failure in call to BumpSize from DoGuessSize for ${this.pack_width}x${this.pack_height}`);
                    return false;
                }
            }
        }
        this.OnAfterGuessSize(project);
        return true;
    }

    protected EnsureImageFramesArePopulated(project: Project): boolean {
        this.pack_frameCount = 0;
        this.pack_framesProcessed = 0;
        this.pack_frameArea = 0;
        this.pack_visitedHashes = [] as string[];

        for (const hash in project?.images) {
            const image = project.images[hash];
            if ((image.frames ?? []).length === 0) {
                const filetype = image.filetype?.toUpperCase();
                const imageFormat = filetype === "JPEG" ? "JPG" : filetype;
                if (imageFormat) {
                    image.frames = [] as ImageFrame[];
                    const parser = ParserHelper.RegisteredParsers[imageFormat];
                    parser?.PopulateFrames(image, undefined, project);
                    for (const frame of image.frames) {
                        this.ApplyTrimFilter(frame, project.options);
                        this.ApplyInnerPaddingFilter(frame, project.options);
                        this.ApplyAliasSpritesFilter(frame, project);
                        this.pack_frameCount++;
                        this.pack_frameArea += frame.spriteRect.width * frame.spriteRect.height;
                    }
                }
            }
        }

        return this.pack_frameCount > 0 && this.pack_frameArea > 0;
    }

    protected DoValidatePlacements(project: Project): boolean {
        let result = true;
        if(this.OnBeforeValidatePlacements(project)) {
            const rects = BasePacker.ExtractFrameSpriteRects(project);
                if (!rects || rects.length < 1) {
                    LogHelper.LogMessage("WARN", 'No frames to pack. Nothing to do.');
                    result = false;
                }

                if(result) {
                    // check for collisions with padded canvas
                    const canvas = this.pack_paddedCanvas;
                    for (let i = 0; i < rects.length; i++) {
                        const rect = rects[0];
                        if (!this.pack_paddedCanvas.Contains(rect)) {
                            LogHelper.LogMessage("ERROR", `Rectangle rect[${i}] (${rect.x}, ${rect.y}, ${rect.width}, ${rect.height}) does not fit the padded canvas (${canvas.x}, ${canvas.y}, ${canvas.width}, ${canvas.height})`);
                            result = false;
                            break;
                        }
                    }
                    if (result) {
                        LogHelper.LogMessage("LOG", `All ${rects.length} frames fit constraints of the padded canvas (${canvas.x}, ${canvas.y}, ${canvas.width}, ${canvas.height}).`);
                    }

                    // check for collisions with peer rectangles
                    for (let i = 0; i < rects.length; i++) {
                        const rect = rects[i];
                        for (let i2 = 0; i2 < rects.length; i2++) {
                            const rect2 = rects[i2];
                            if (i2 !== i && (rect2.Intersects(rect) || rect.Contains(rect2) || rect2.Contains(rect))) {
                                LogHelper.LogMessage("ERROR", `Rectangle rect[${i}] (${rect.x}, ${rect.y}, ${rect.width}, ${rect.height}) intersects or contains rectangle rect[${i2}] (${rect2.x}, ${rect2.y}, ${rect2.width}, ${rect2.height})`);
                                result = false;
                                break;
                            }
                        }
                        if (!result) {
                            break;
                        }
                    }
                    if (result) {
                        LogHelper.LogMessage("LOG", `None of the ${rects.length} frames intersect or contain each other.`);
                    }
                }

                if(!this.OnAfterValidatePlacements(project)) {
                    LogHelper.LogMessage("ERROR", 'Failure in call to OnAfterValidatePlacements()')
                    result = false;
                }
        } else {
            LogHelper.LogMessage("ERROR", 'Failure in call to OnBeforeValidatePlacements()')
            result = false;
        }

        return result;
    }

    protected DoRender(project: Project): boolean {
        let result = this.OnBeforeRender(project);

        if(result) {
            // TODO: implment
            // TODO: actually create/draw the canvas image
            // TODO: project.canvas = base64 of sheet png (bmp?), with sprites
            result = result && true;
        }

        return result && this.OnAfterRender(project);
    }

    protected ApplyTrimFilter(frame: ImageFrame, options: ProjectOptions) : void {
        if(options.trimMode === "Trim") {
            // TODO: implement
            // const threshold: number = options.trimThreshold === 255 ? 1 : (options.trimThreshold ?? 1);
        }
        frame.filterAppliedTrimRect = true;
    }

    protected ApplyInnerPaddingFilter(frame: ImageFrame, options: ProjectOptions) : void {
        const innerPadding: number = options.innerPadding ?? 0;
        if(innerPadding > 0) {
            // TODO: implement
        }
        frame.filterAppliedPaddingInner = true;
    }

    protected ApplyAliasSpritesFilter(frame: ImageFrame, project: Project) { // }, options: ProjectOptions, frameHashes: FrameHashesType) {
        const options = project.options;
        const isOptAliasSprites = options.aliasSprites === "Yes";
        if(isOptAliasSprites) {
            const bigHash: string = 'bigHash:' + (frame.hashSHA256 ?? '[sha256]') + (frame.hashMD5 ?? '[md5]');
            const isDuplicate = this.pack_visitedHashes.indexOf(bigHash) >= 0;
            frame.isDuplicate = isDuplicate;
            if(!isDuplicate) { this.pack_visitedHashes.push(bigHash); }
        }
        frame.filterAppliedAliasHash = isOptAliasSprites;
    }

    // protected ApplyAliasSpritesFilter(frame: ImageFrame, options: ProjectOptions, frameHashes: FrameHashesType) {
    //     if(options.aliasSprites === "Yes") {
    //         const bigHash: string = 'bigHash:' + (frame.hashSHA256 ?? '[sha256]') + (frame.hashMD5 ?? '[md5]');
    //         if(Object.getOwnPropertyNames(frameHashes).indexOf(bigHash) >= 0) {
    //             frame.isDuplicate = true;
    //         } else {
    //             frame.isDuplicate = false;
    //             frameHashes[bigHash] = [] as ImageFrame[];
    //         }
    //         frameHashes[bigHash].push(frame);
    //     }
    //     frame.filterAppliedAliasHash = true;
    // }









    public static ExtractFrameSpriteRects(project: Project) : Rectangle[] {
        const rects = [] as Rectangle[];
        for(const imgKey of Object.getOwnPropertyNames(project.images)) {
            const frames = project.images[imgKey].frames;
            if(frames) {
                for (const frame of frames) {
                    if(frame.spriteRect) {
                        rects.push(frame.spriteRect);
                    }
                    if (project.options.animatedGif !== "Extract Frames") { break; }
                }
            }
        }
        return rects;
    }

    public static ExtractFrames(project: Project) : ImageFrame[] {
        const keys: string[] = SortHelper.SortByMethods[project.options.sortBy ?? "AREA_DESC"](project);
        const result = [] as ImageFrame[];
        // for(let imgKey of Object.getOwnPropertyNames(project.images)) {
        for(const key of keys) {
            const frames = project.images[key].frames;
            if(frames) {
                for (const frame of frames) {
                    if(!frame.spriteRect.isEmpty) {
                        result.push(frame);
                    }
                    if (project.options.animatedGif !== "Extract Frames") { break; }
                }
            }
        }
        return result;
    }

}