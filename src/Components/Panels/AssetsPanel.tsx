import './Panel.css';
import './PanelAnimations.css';
import './AssetsPanel.css';
import {PanelVisibility} from "./_Types.ts";

export type AssetsPanelProps = {
    panelVisibility: PanelVisibility,
};

export default function AssetsPanel(props: AssetsPanelProps) {
    let classPanel = "";

    const newlyVisible = props.panelVisibility.isAssetsVisible && !props.panelVisibility.wasAssetsVisible;
    const newlyHidden = props.panelVisibility.wasAssetsVisible && !props.panelVisibility.isAssetsVisible;
    const isConsoleVisible = props.panelVisibility.isConsoleVisible;
    const isAssetsVisible = props.panelVisibility.isAssetsVisible;
    const areBothVisible = isConsoleVisible && isAssetsVisible;
    const newlyVisibleConsole = props.panelVisibility.isConsoleVisible && !props.panelVisibility.wasConsoleVisible;
    const newlyHiddenConsole = !props.panelVisibility.isConsoleVisible && props.panelVisibility.wasConsoleVisible;

    if(newlyVisible && isConsoleVisible) {
        classPanel = "grow-from-top";
    } else if(newlyVisible) {
        classPanel = isConsoleVisible ? "enter-from-top" : "enter-from-right";
    } else if(newlyHidden) {
        classPanel = isConsoleVisible ? "exit-to-top" : "exit-to-right";
    } else if(isAssetsVisible && newlyVisibleConsole) {
        classPanel = "shrink-to-top";
    } else if(isAssetsVisible && newlyHiddenConsole) {
        classPanel = "grow-to-bottom";
    } else if(areBothVisible) {
        classPanel = "panel-top";
    } else if(!isAssetsVisible) {
        classPanel = "panel-hidden";
    }

    return (
        <div className={`panel panel-assets ${classPanel}`}>
            <div className="panel-header">Assets</div>
            <div className="panel-content">
                <div className="panel-label">Thing 1</div>
                <div className="panel-label">Thing 2</div>
                <div className="panel-label">Thing 3</div>
                <div className="panel-label">Thing 4</div>
                <div className="panel-label">Thing 5</div>
                <div className="panel-label">Thing 6</div>
                <div className="panel-label">Thing 7</div>
                <div className="panel-label">Thing 8</div>
                <div className="panel-label">Thing 9</div>
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
