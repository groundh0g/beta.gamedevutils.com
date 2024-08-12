import BaseParser from "./BaseParser";
import ImageItem from "../../objs/ImageItem";
import {ImageFormatTypes} from "../Types";
import ParserHelper from "../ParserHelper";
import Project from "../../objs/Project";

// export default class SvgParser extends BaseParser {

//     GetImageFormat(): ImageFormatTypes {
//         return "SVG";
//     }

//     ParseImageData(src: string, path?: string, project?: Project): ImageItem {
//         // TODO: implement?
//         return ImageItem.Empty;
//     }

//     PopulateFrames(imageItem: ImageItem, data?: Uint8Array, project?: Project): void {
//         // TODO: implement?
//     }

//     private static _registerParser = (() => {
//         ParserHelper.RegisterParser(new SvgParser());
//     })();

// }