import "./WorkspacePanel.css";
import {PanelVisibility} from "../_Types.ts";

export type WorkspacePanelProps = {
    panelVisibility: PanelVisibility,
};

export default function WorkspacePanel(props: WorkspacePanelProps) {
    const classPanelLeft = props.panelVisibility.isAboutVisible || props.panelVisibility.isSettingsVisible ? "" : "fill-left";
    const classPanelRight = props.panelVisibility.isConsoleVisible || props.panelVisibility.isAssetsVisible ? "" : "fill-right";

    return (
        <>
            <div className={`panel-workspace ${classPanelLeft} ${classPanelRight}`}>
                <div className="workspace"> </div>
            </div>
        </>
    )
}
