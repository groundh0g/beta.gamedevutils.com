import BaseParser from "./frameParsers/BaseParser";

export type Parsers = { [key: string]: BaseParser };

export default class ParserHelper {

    public static RegisteredParsers: Parsers = {} as Parsers;

    public static RegisterParser(parser: BaseParser) : void {
        const key = parser.GetImageFormat();
        if(key) {
            if(!ParserHelper.RegisteredParsers[key]) {
                ParserHelper.RegisteredParsers[key] = parser;
            }
        }
    }
}