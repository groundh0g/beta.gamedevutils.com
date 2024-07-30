import './Panel.css';
import './PanelAnimations.css';
import './ConsolePanel.css';
import {PanelVisibility} from "./_Types.ts";
import ConsolePanelMiniToolbar from "./ConsolePanelMiniToolbar.tsx";

export type ConsolePanelProps = {
    panelVisibility: PanelVisibility,
};

export default function ConsolePanel(props: ConsolePanelProps) {
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
                <div className="panel-label">Thing  1</div>
                <div className="panel-label">Thing  2</div>
                <div className="panel-label">Thing  3</div>
                <div className="panel-label">Thing  4</div>
                <div className="panel-label">Thing  5</div>
                <div className="panel-label">Thing  6</div>
                <div className="panel-label">Thing  7</div>
                <div className="panel-label">Thing  8</div>
                <div className="panel-label">Thing  9</div>
                <div className="panel-label">Thing 10</div>
                <div className="panel-label">Thing 11</div>
                <div className="panel-label">Thing 12</div>
                <div className="panel-label">Thing 13</div>
                <div className="panel-label">Thing 14</div>
                <div className="panel-label">Thing 15</div>
                <div className="panel-label">Thing 16</div>
                <div className="panel-label">Thing 17</div>
                <div className="panel-label">Thing 18</div>
                <div className="panel-label">Thing 19</div>
                <div className="panel-label">Thing 20</div>
            </div>
        </div>
    );
}
