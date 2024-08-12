import {NdArray} from "ndarray";
import {createHash, Hash, HashOptions} from "crypto";
import {v4 as UUID} from "uuid";
import {Buffer} from "buffer";
import {FileParts} from "../PathHelper";
import LogHelper from "../LogHelper";
import Project from '../../objs/Project';
import ImageItem from "../../objs/ImageItem";
import ImageFrame from "../../objs/ImageFrame";
import {ImageFormatTypes} from "../Types";
import Rectangle from "../../objs/Rectangle";

export const PREAMBLE_TEMPLATE = 'data:image/xxx;base64,';

export interface IBaseParser {
    ParseImageData(src: string, path?: string, project?: Project) : ImageItem;
    GetImageFormat() : ImageFormatTypes;
}

export default abstract class BaseParser implements IBaseParser {

    public abstract ParseImageData(src: string, path?: string, project?: Project): ImageItem;
    public abstract GetImageFormat(): ImageFormatTypes;

    // protected static HashSHA256: Hash = createHash('sha256');
    // protected static HashMD5: Hash = createHash('md5');

    public abstract PopulateFrames(imageItem: ImageItem, data?: Uint8Array, project?: Project) : void;

    public AddImageFrame(imageItem: ImageItem, data: Uint8Array) : void {
        const result = new ImageFrame();
        result.spriteRect = Rectangle.Create(0, 0, 0, 0, false);

        if(imageItem && !imageItem.isEmpty) {
            const width = imageItem.width;
            const height = imageItem.height;

            result.spriteRect = Rectangle.Create(0, 0, width!, height!, false);

            // LogHelper.LogMessage("DEBUG", `Building ${width}x${height} frame for ${imageItem.fullpath} ...`)
            if (width && height && data) { //} && data.length) {
                // result.spriteRect.width = width;
                // result.spriteRect.height = height;
                result.gamma = imageItem.gamma!; // TODO: populate from the one parser that supports it
                result.data = data;
                result.dataSrc = data.slice(0);

                const hashSHA256: Hash = createHash('sha256');
                const hashMD5: Hash = createHash('md5');
                const bufferString = Buffer.from(data).toString("base64");
                result.hashSHA256 = hashSHA256.update(bufferString).digest('hex');
                result.hashMD5 = hashMD5.update(bufferString).digest('hex');

                // LogHelper.LogMessage("DEBUG", `- SHA: ${result.hashSHA256}`);
                // LogHelper.LogMessage("DEBUG", `- MD5: ${result.hashMD5}`);
                result.filterAppliedAliasHash = false;
                result.filterAppliedTrimRect = false;
                result.filterAppliedPaddingInner = false;
                result.isDuplicate = false;
                if(!imageItem.frames || !imageItem.frames.length) { imageItem.frames = [] as ImageFrame[]; }
                imageItem.frames.push(result);
                // This path is never triggered. Commenting out to help coverage report.
                // } else {
                // LogHelper.LogMessage("WARN", `- Cannot process empty image frame, '${imageItem.fullpath}'.`);
            }
            // LogHelper.LogMessage("DEBUG", `- Done.`);
        }
    }
}