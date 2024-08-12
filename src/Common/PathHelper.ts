
export type FileParts = {
    filename: string | undefined,
    fileonly: string | undefined,
    filetype: string | undefined,
    pathfull: string | undefined,
    pathonly: string | undefined,
    isValid: boolean,
};

export default class PathHelper {

    public static ParsePath(path: string) : FileParts {
        const filenameRegEx = /(?=~\/|\.\/|\..\/|\/|file:\/\/\/|\w)[\w\-\._\(\)\[\] ]+$/gim;
        const result = { isValid: false } as FileParts;

        // TODO: determine root of asset's path ?? e.g. /x/y/{pwd}/toons/image.png -> ./toons/image.png ??

        if(path) {
            result.pathfull = path;
            result.filename = filenameRegEx.exec(path)?.at(0);
            if(result.filename) {
                result.filetype = result.filename.split('.').pop();
                if(result.filetype) {
                    result.fileonly = result.filename.slice(0, -(result.filetype.length + 1));
                }
                result.pathonly = result.pathfull.slice(0, -(result.filename.length));
                result.isValid = true;
            } else {
                result.filename = undefined;
                result.isValid = false;
            }
        }

        return result;
    }
}
