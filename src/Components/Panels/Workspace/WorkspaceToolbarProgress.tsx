import "./WorkspaceToolbarProgress.css";
import {useSelector} from "react-redux";
import {ScreenState} from "../../../features/_Types.ts";

export default function WorkspaceToolbarProgress() {
    const screenState = useSelector(state => (state as any).project.screen as ScreenState);

    return (
        <>
            <div className="panel-workspace-progress-bar">
                <div className="progress-bar-progress" style={{ width: `${100.0 * screenState.progress}%`}}>
                </div>
            </div>
        </>
    )
}
