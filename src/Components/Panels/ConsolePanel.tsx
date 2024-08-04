import './Panel.css';
import './PanelAnimations.css';
import './ConsolePanel.css';
import {PanelVisibility} from "./_Types.ts";
import ConsolePanelMiniToolbar from "./ConsolePanelMiniToolbar.tsx";
import {useSelector} from "react-redux";

export type ConsolePanelProps = {
    panelVisibility: PanelVisibility,
};

export default function ConsolePanel(props: ConsolePanelProps) {
    const console = useSelector(state => (state as any).project.console as string[]);

    let classPanel = "";

    const newlyVisible = props.panelVisibility.isConsoleVisible && !props.panelVisibility.wasConsoleVisible;
    const newlyHidden = props.panelVisibility.wasConsoleVisible && !props.panelVisibility.isConsoleVisible;
    const newlyVisibleAssets = props.panelVisibility.isAssetsVisible && !props.panelVisibility.wasAssetsVisible;
    const newlyHiddenAssets = props.panelVisibility.wasAssetsVisible && !props.panelVisibility.isAssetsVisible;
    const isConsoleVisible = props.panelVisibility.isConsoleVisible;
    const isAssetsVisible = props.panelVisibility.isAssetsVisible;
    const areBothVisible = isConsoleVisible && isAssetsVisible;
    const wereBothVisible = props.panelVisibility.wasConsoleVisible && props.panelVisibility.wasAssetsVisible;

    if(isConsoleVisible && newlyHiddenAssets) {
        classPanel = "grow-to-top";
    } else if(isConsoleVisible && newlyVisibleAssets) {
        classPanel = "shrink-to-bottom";
    } else if(newlyVisible) {
        classPanel = isAssetsVisible ? "enter-from-bottom" : "enter-from-right";
    } else if(newlyHidden) {
        classPanel = isAssetsVisible ? "exit-to-bottom" : "exit-to-right";
    } else if(areBothVisible || wereBothVisible) {
        classPanel = "panel-bottom";
    } else if(!isConsoleVisible) {
        classPanel = "panel-hidden";
    }

    return (
        <div className={`panel panel-console ${classPanel}`}>
            <div className="panel-header"><ConsolePanelMiniToolbar /></div>
            <div className="panel-content">
                {console.map((item, i) => {
                    const classError = item.startsWith("ERR:") ? "console-item-error" : "";
                    return <div className={`panel-label ${classError}`} key={`console-item-${i}`}>{item}</div>;
                })}
            </div>
        </div>
    );
}
