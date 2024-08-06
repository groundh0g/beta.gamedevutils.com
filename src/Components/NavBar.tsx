import './NavBar.css';
import NavBarButton from "./NavBarButton.tsx";
import NavBarSpacer from "./NavBarSpacer.tsx";
import {PanelVisibility} from "./Panels/_Types.ts";

export type NavBarProps = {
    panelVisibility: PanelVisibility,
    toggleAssetsPanel: () => void,
    toggleConsolePanel: () => void,
    toggleSettingsPanel: () => void,
    toggleAboutPanel: () => void,
};

const BUG_REPORT_BODY = `
Tell us how we can reproduce this issue. For example:

I cannot remove an asset if it's the only item in the list.

1. Start a new project.
2. Add a single asset.
3. Select the asset.
4. The delete button should be enabled, but it's not.

`.trim().replace(/\n/gim, "%0A");

export default function NavBar(props: NavBarProps) {
    return (
        <div className='navbar-panel'>
            <NavBarButton title="New Project" icon="file" />
            <NavBarButton title="Open Project" icon="folder-open" />
            <NavBarButton title="Save Project" icon="save" />
            <NavBarSpacer />
            <NavBarButton title="Refresh Pack" icon="sync" />
            <NavBarButton title="Publish Sprites" icon="share-square" />
            <NavBarSpacer />
            <NavBarButton title="Show Settings" icon="sliders-h" isActive={props.panelVisibility.isSettingsVisible} onClick={props.toggleSettingsPanel} />
            <NavBarButton title="Show About" icon="info-circle" isActive={props.panelVisibility.isAboutVisible} onClick={props.toggleAboutPanel} />
            <NavBarSpacer isDotted={true} />
            <NavBarButton title="Show Assets" icon="images" isActive={props.panelVisibility.isAssetsVisible} onClick={props.toggleAssetsPanel} />
            <NavBarButton title="Show Console" icon="terminal" isActive={props.panelVisibility.isConsoleVisible} onClick={props.toggleConsolePanel} />
            <NavBarSpacer />
            <NavBarButton
                title="Report a Bug"
                icon="bug"
                href={`https://github.com/groundh0g/beta.gamedevutils.com/issues/new?labels=bug&title=[BUG]+Short Description&body=${BUG_REPORT_BODY}`}
                target="_blank"
            />
            <NavBarButton
                title="Documentation"
                icon="question-circle"
                href="https://docs.jekyllfaces.com/"
                target="_blank"
            />
        </div>
    );
}
