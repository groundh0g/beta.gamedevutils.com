import {clearProgress, setDirtyProject, setDirtyWorkspace, setProgress, setThumbnailBackground} from "../features/appSlice.ts";
import {Dispatch} from "react";

export default class GUI {

    public static ClearProgress(dispatch: Dispatch<any>) {
        dispatch(clearProgress(Number.NaN));
    };

    public static SetProgress(dispatch: Dispatch<any>, progress: number) {
        dispatch(setProgress(progress));
    };

    public static SetDirtyWorkspace(dispatch: Dispatch<any>, isDirty: boolean) {
        dispatch(setDirtyWorkspace(isDirty));
    };

    public static SetDirtyProject(dispatch: Dispatch<any>, isDirty: boolean) {
        dispatch(setDirtyProject(isDirty));
    };

    public static SetThumbnailBackground(dispatch: Dispatch<any>, background: string) {
        dispatch(setThumbnailBackground(background));
    };

}