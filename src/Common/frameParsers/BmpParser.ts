import BaseParser from './BaseParser';
import {NdArray} from "ndarray";
import * as BMP from "bmp-js";
import {Buffer} from "buffer";
import LogHelper from "../LogHelper";
import ImageItem from "../../objs/ImageItem";
import {v4 as UUID} from "uuid";
import PathHelper from "../PathHelper";
import {ImageFormatTypes} from "../Types";
import ParserHelper from "../ParserHelper";
import {BmpDecoder} from "bmp-js";
import Project from "../../objs/Project";

export default class BmpParser extends BaseParser {

    public GetImageFormat(): ImageFormatTypes {
        return "BMP";
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

    protected DecodeImage(src: string) : BmpDecoder {
        let result: BmpDecoder = {} as BmpDecoder;

        // account for dataUri prefix
        if (src && src.indexOf(",") > 0) { src = src.split(",")[1]; }

        if (src && src.length) {
            try {
                const buffer = Buffer.from(src, 'base64'); // new Buffer(src, 'base64');
                result = BMP.decode(buffer);
            } catch { }
        }
        return result;
    }

    // TODO: commented out the try/catch since the lib handles errors without throwing exceptions, fixed coverage
    public PopulateFrames(imageItem: ImageItem, data?: Uint8Array, project?: Project): void {
        if(data === undefined) {
            // try {
                const img = this.DecodeImage(imageItem.src || '');
                if (img && img.data) {
                    data = img.data.buffer as Uint8Array;
                } else {
                    LogHelper.LogMessage("ERROR", `Error parsing '${imageItem.fullpath}'.`);
                }
            // } catch(ex) {
            //     LogHelper.LogMessage('ERROR', `Error parsing '${imageItem.fullpath}'.`, ex);
            // }
        }

        if(data === undefined || data.length === 0) {
            LogHelper.LogMessage("WARN", `Unable to parse ${this.GetImageFormat()} image data.`);
        } else {
            this.AddImageFrame(imageItem, data.slice(0));
        }
    }

    private static _registerParser = (() => {
        ParserHelper.RegisterParser(new BmpParser());
    })();

}