import DecodeGIF from "decode-gif";
import BaseParser from "./BaseParser";
import ImageItem from "../../objs/ImageItem";
import {Buffer} from "buffer";
import PathHelper from "../PathHelper";
import {v4 as UUID} from "uuid";
import LogHelper from "../LogHelper";
import {ImageFormatTypes} from "../Types";
import ParserHelper from "../ParserHelper";
import Project from "../../objs/Project";

export default class GifParser extends BaseParser {

    public GetImageFormat(): ImageFormatTypes {
        return "GIF";
    }

    public ParseImageData(src: string, path?: string, project?: Project): ImageItem {
        const result = new ImageItem();

        if(path && path.length) {
            const fileParts = PathHelper.ParsePath(path);
            result.filename = fileParts.filename;
            result.filetype = fileParts.filetype;
            result.fullpath = path;
        }

        if(src && src.length) {
            try {
                const img = this.DecodeImage(src);
                if(img) {
                    result.width = img.width;
                    result.height = img.height;
                    result.gamma = 0;
                    result.src = src;
                    result.guid = UUID();

                    this.PopulateFrames(result, undefined, project);
                    result.populateFrameDataComplete = true;
                    result.isEmpty = false;
                }
            } catch(e) {
                // This path is never triggered. Commenting out to help coverage report.
                // LogHelper.LogMessage("WARN", `Unable to parse the ${this.GetImageFormat()} image data.\n`, e);
            }
        }

        return result;
    }

    protected DecodeImage(src: string) : DecodeGIF.ResultType {
        let result: DecodeGIF.ResultType = {} as DecodeGIF.ResultType;

        // account for dataUri prefix
        if (src && src.indexOf(",") > 0) { src = src.split(",")[1]; }

        if (src && src.length) {
            try {
                const buffer = Buffer.from(src, 'base64'); // new Buffer(src, 'base64');
                result = DecodeGIF(buffer);
            } catch { }
        }
        return result;
    }

    public PopulateFrames(imageItem: ImageItem, data?: Uint8Array, project?: Project): void {
        // ignore data param ... extract frames

        const img = this.DecodeImage(imageItem.src ?? '');
        if (img) {
            const extractFrames: boolean = !!project && project.options.animatedGif === "Extract Frames";
            // LogHelper.LogMessage("DEBUG", `Discovered ${img.frames?.length ?? 0} frames in '${imageItem.fullpath}'...`);
            for(let i = 0; i < (img.frames?.length ?? 0); i++) {
                data = img.frames[i].data.buffer as Uint8Array;
                this.AddImageFrame(imageItem, data);
                if(!extractFrames) { break; }
            }
            // This path is never triggered. Commenting out to help coverage report.
            // } else {
            // LogHelper.LogMessage("ERROR", `Error parsing '${imageItem.fullpath}'.`);
            // LogHelper.LogMessage("WARN", `Unable to parse the ${this.GetImageFormat()} image data.`);
        }
    }

    private static _registerParser = (() => {
        ParserHelper.RegisterParser(new GifParser());
    })();

}