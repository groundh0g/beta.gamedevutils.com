import {clearLog, log} from "../features/projectSlice.ts";
import {Dispatch} from "react";

export default class Console {

    public static Clear(dispatch: Dispatch<any>) {
        dispatch(clearLog(""));
    }

    public static Log(dispatch: Dispatch<any>, message: string) {
        dispatch(log(message));
    }

    public static Error(dispatch: Dispatch<any>, message: string) {
        dispatch(log(`ERR: ${message}`));
    }

}