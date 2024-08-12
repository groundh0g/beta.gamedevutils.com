import {PNG, PNGWithMetadata} from 'pngjs';
import BaseParser from "./BaseParser";
import ImageItem from "../../objs/ImageItem";
import {Buffer} from "buffer";
import PathHelper from "../PathHelper";
import {v4 as UUID} from "uuid";
import LogHelper from "../LogHelper";
import {ImageFormatTypes} from "../Types";
import ParserHelper from "../ParserHelper";
import Project from "../../objs/Project";

export default class PngParser extends BaseParser {

    public GetImageFormat(): ImageFormatTypes {
        return "PNG";
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
                    result.gamma = img.gamma;
                    result.src = src;
                    result.guid = UUID();

                    this.PopulateFrames(result, img.data.buffer as Uint8Array);
                    result.populateFrameDataComplete = true;
                    result.isEmpty = false;
                }
            } catch(e) {
                LogHelper.LogMessage("WARN", `Unable to parse the ${this.GetImageFormat()} image data.\n`, e);
            }
        }

        return result;
    }

    protected DecodeImage(src: string) : PNGWithMetadata {
        let result: PNGWithMetadata = {} as PNGWithMetadata;

        // account for dataUri prefix
        if (src && src.indexOf(",") > 0) { src = src.split(",")[1]; }

        if (src && src.length) {
            try {
                const buffer = Buffer.from(src, 'base64'); // new Buffer(src, 'base64');
                result = PNG.sync.read(buffer);
            } catch { }
        }

        return result;
    }

    public PopulateFrames(imageItem: ImageItem, data?: Uint8Array, project?: Project): void {
        if (data === undefined) {
            const img = this.DecodeImage(imageItem.src ?? '');
            if(img) {
                data = img.data?.buffer as Uint8Array;
                // This path is never triggered. Commenting out to help coverage report.
                // } else {
                // LogHelper.LogMessage("ERROR", `Error parsing '${imageItem.fullpath}'.`);
            }
        }

        if (data === undefined) {
            LogHelper.LogMessage("WARN", `Unable to parse ${this.GetImageFormat()} image data.`);
        } else {
            this.AddImageFrame(imageItem, data);
        }
    }

    private static _registerParser = (() => {
        ParserHelper.RegisterParser(new PngParser());
    })();
}