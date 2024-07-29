import './Panel.css';
import './PanelAnimations.css';
import './SettingsPanel.css';
import {PanelVisibility} from "./_Types.ts";

export type SettingsPanelProps = {
    panelVisibility: PanelVisibility,
};

export default function SettingsPanel(props: SettingsPanelProps) {
    let classPanel = "";

    const newlyVisible = props.panelVisibility.isSettingsVisible && !props.panelVisibility.wasSettingsVisible;
    const newlyHidden = props.panelVisibility.wasSettingsVisible && !props.panelVisibility.isSettingsVisible;
    const isAboutVisible = props.panelVisibility.isAboutVisible;
    const isSettingsVisible = props.panelVisibility.isSettingsVisible;
    const areBothVisible = isAboutVisible && isSettingsVisible;
    const newlyVisibleAbout = props.panelVisibility.isAboutVisible && !props.panelVisibility.wasAboutVisible;
    const newlyHiddenAbout = !props.panelVisibility.isAboutVisible && props.panelVisibility.wasAboutVisible;

    if(newlyVisible && isAboutVisible) {
        classPanel = "grow-from-top";
    } else if(newlyVisible) {
        classPanel = isAboutVisible ? "enter-from-top" : "enter-from-left";
    } else if(newlyHidden) {
        classPanel = isAboutVisible ? "exit-to-top" : "exit-to-left";
    } else if(isSettingsVisible && newlyVisibleAbout) {
        classPanel = "shrink-to-top";
    } else if(isSettingsVisible && newlyHiddenAbout) {
        classPanel = "grow-to-bottom";
    } else if(areBothVisible) {
        classPanel = "panel-top";
    } else if(!isSettingsVisible) {
        classPanel = "panel-hidden";
    }

    return (
        <div className={`panel panel-settings ${classPanel}`}>
            <div className="panel-header">Settings</div>
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
