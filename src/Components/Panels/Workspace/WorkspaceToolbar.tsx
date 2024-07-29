import "./WorkspaceToolbar.css";
import NavBarButton from "../../NavBarButton.tsx";
import WorkspaceToolbarProgress from "./WorkspaceToolbarProgress.tsx";
import {PanelVisibility} from "../_Types.ts";

export type WorkspaceToolbarProps = {
    panelVisibility: PanelVisibility,
};

export default function WorkspaceToolbar(props: WorkspaceToolbarProps) {
    const classPanelLeft = props.panelVisibility.isAboutVisible || props.panelVisibility.isSettingsVisible ? "" : "fill-left";
    const classPanelRight = props.panelVisibility.isConsoleVisible || props.panelVisibility.isAssetsVisible ? "" : "fill-right";

    return (
        <>
            <div className={`panel-workspace-toolbar ${classPanelLeft} ${classPanelRight}`}>
                <NavBarButton title="Zoom Out" icon="search-minus" onClick={() => {}} />
                <NavBarButton title="Zoom In" icon="search-plus" onClick={() => {}} />
                <NavBarButton title="Fit Width" icon="arrows-alt-h" onClick={() => {}} />
                <NavBarButton title="Fit Height" icon="arrows-alt-v" onClick={() => {}} />
                <NavBarButton title="Fit Workspace" icon="arrows-alt" onClick={() => {}} />
                <WorkspaceToolbarProgress />
            </div>
        </>
    )
}
