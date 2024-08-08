import './Panel.css';
import './PanelAnimations.css';
import './AboutPanel.css';
import {PanelVisibility} from "./_Types.ts";

export type AboutPanelProps = {
    panelVisibility: PanelVisibility,
};

export default function AboutPanel(props: AboutPanelProps) {
    let classPanel = "";

    const newlyVisible = props.panelVisibility.isAboutVisible && !props.panelVisibility.wasAboutVisible;
    const newlyHidden = props.panelVisibility.wasAboutVisible && !props.panelVisibility.isAboutVisible;
    const newlyVisibleSettings = props.panelVisibility.isSettingsVisible && !props.panelVisibility.wasSettingsVisible;
    const newlyHiddenSettings = props.panelVisibility.wasSettingsVisible && !props.panelVisibility.isSettingsVisible;
    const isAboutVisible = props.panelVisibility.isAboutVisible;
    const isSettingsVisible = props.panelVisibility.isSettingsVisible;
    const areBothVisible = isAboutVisible && isSettingsVisible;
    const wereBothVisible = props.panelVisibility.wasAboutVisible && props.panelVisibility.wasSettingsVisible;

    if(isAboutVisible && newlyHiddenSettings) {
        classPanel = "grow-to-top";
    } else if(isAboutVisible && newlyVisibleSettings) {
        classPanel = "shrink-to-bottom";
    } else if(newlyVisible) {
        classPanel = isSettingsVisible ? "enter-from-bottom" : "enter-from-left";
    } else if(newlyHidden) {
        classPanel = isSettingsVisible ? "exit-to-bottom" : "exit-to-left";
    } else if(areBothVisible || wereBothVisible) {
        classPanel = "panel-bottom";
    } else if(!isAboutVisible) {
        classPanel = "panel-hidden";
    }

    return (
        <div className={`panel panel-about ${classPanel}`}>
            <div className="panel-header">About</div>
            <div className="panel-content">
                <div className="panel-label logo"><i className={"fa fa-gamepad"}></i></div>
                <div className="panel-label center"><strong>GameDevUtils.com</strong></div>
                <div className="panel-label center">v0.3.0</div>
                <div className="panel-label center wrap small">... a suite of tools that I made for my game programming
                    students.
                </div>
                <div className="panel-label">
                    <hr/>
                </div>
                <div className="panel-label center wrap small">Available for most modern browsers
                </div>
                <div className="panel-label logo">
                    <i className={"fab fa-chrome"}></i>&nbsp;
                    <i className={"fab fa-firefox"}></i>&nbsp;
                    <i className={"fab fa-edge"}></i>&nbsp;
                </div>
                <div className="panel-label logo">
                    <i className={"fab fa-opera"}></i>&nbsp;
                    <i className={"fab fa-safari"}></i>&nbsp;
                </div>
                <div className="panel-label center wrap small">with desktop and
                    command-line apps<br/>for the three major OSes.
                </div>
                <div className="panel-label logo">
                    <i className={"fab fa-apple"}></i>&nbsp;
                    <i className={"fab fa-windows"}></i>&nbsp;
                    <i className={"fab fa-linux"}></i>&nbsp;
                </div>
                <div className="panel-label center wrap small">Core functionality also available<br/>as a NodeJS module.
                </div>
                <div className="panel-label logo">
                    <i className={"fab fa-node"}></i>
                </div>
                <div className="panel-label">
                    <hr/>
                </div>
                <div className="panel-label center">&copy; 2024 - Joseph B. Hall</div>
                <div className="panel-label center"><i className={"fab fa-twitter"}></i> @groundh0g</div>
                <div className="panel-label">
                    <hr/>
                </div>
                <div className="panel-label center"><i className={"fas fa-coffee"}></i> Buy me a coffee.</div>
                <div className="panel-label center"><i className={"fab fa-paypal"}></i> Support the project.</div>
            </div>
        </div>
    );
}
