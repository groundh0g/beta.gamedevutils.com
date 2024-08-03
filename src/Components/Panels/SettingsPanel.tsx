import './Panel.css';
import './PanelAnimations.css';
import './SettingsPanel.css';
import {PanelVisibility} from "./_Types.ts";
import ToggleButton from "../ToggleButton.tsx";
import InputText from "../InputText.tsx";
import PanelHeader from "../PanelHeader.tsx";
import {useState} from "react";
import InputSelect from "../InputSelect.tsx";

export type SettingsPanelProps = {
    panelVisibility: PanelVisibility,
};

const createPanelShowStates = (): any => {
    return {};
}

export default function SettingsPanel(props: SettingsPanelProps) {
    const [panelShowStates, setPanelShowStates] = useState(() => createPanelShowStates());

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

    const showHideContent = (contentId: string) => {
        var element = document.querySelector(`#${contentId}`) as HTMLDivElement;
        if(element) {
            const copy = Object.assign({}, panelShowStates);
            if(element.classList.contains("shown")) {
                element.classList.remove("shown");
                element.classList.add("hidden");
                // TODO: change icon
                copy[contentId] = false;
                setPanelShowStates(copy);
            } else {
                element.classList.remove("hidden");
                element.classList.add("shown");
                // TODO: change icon
                copy[contentId] = true;
                setPanelShowStates(copy);
            }
        }
    };

    const makePanelId = (groupName: string) => `PanelHeader-${groupName}-content`;

    return (
        <div className={`panel panel-settings ${classPanel}`}>
            <div className="panel-header">Settings</div>
            <div className="panel-content">

                <div className="panel-label instruction">Configure project settings here.</div>

                <PanelHeader title="Spritesheet Publish Options" label="Output" groupName="output" isShown={panelShowStates[makePanelId("output")]} showHideContent={showHideContent}>
                    <div className="panel-label"><InputText label="Filename" title="Filename" field="name" /></div>
                    <div className="panel-label"><InputSelect label="Image Format" title="Image Format" field="imageFormat" /></div>
                    <div className="panel-label"><InputSelect label="Data Format" title="Data Format" field="dataFormat" /></div>
                    <div className="panel-label"><ToggleButton label="Strip Extension" title="Strip Extension" field="stripExtension" /></div>
                </PanelHeader>

                <PanelHeader title="Spritesheet Packing Options" label="Algorithm" groupName="algorithm" isShown={panelShowStates[makePanelId("algorithm")]} showHideContent={showHideContent}>
                    <div className="panel-label"><InputSelect label="Sprite Packer" title="Sprite Packer" field="spritePacker"/></div>
                    <div className="panel-label"><InputSelect label="Sort By" title="Sort By" field="sortBy"/></div>
                    <div className="panel-label"><ToggleButton label="Allow Rotate" title="Allow Rotate" field="allowRotate"/></div>
                </PanelHeader>

                <PanelHeader title="Spritesheet Size Options" label="Dimensions" groupName="dimensions" isShown={panelShowStates[makePanelId("dimensions")]} showHideContent={showHideContent}>
                    <div className="panel-label"><InputText label="Width" title="Spritesheet Width" field="width"/></div>
                    <div className="panel-label"><InputText label="Height" title="Spritesheet Height" field="height"/></div>
                    <div className="panel-label"><InputSelect label="Size Mode" title="Size Mode" field="sizeMode"/></div>
                    <div className="panel-label"><ToggleButton label="Power of 2" title="Size Constraint" field="powerOf2"/></div>
                    <div className="panel-label"><ToggleButton label="Force Square" title="Size Constraint" field="forceSquare"/></div>
                    <div className="panel-label"><ToggleButton label="Include @2x" title="Create 2x Sprites" field="includeAt2x"/></div>
                </PanelHeader>

                <PanelHeader title="Spritesheet Padding Options" label="Padding" groupName="padding" isShown={panelShowStates[makePanelId("padding")]} showHideContent={showHideContent}>
                    <div className="panel-label"><InputText label="Border Padding" title="Border Padding" field="borderPadding"/></div>
                    <div className="panel-label"><InputText label="Shape Padding" title="Shape Padding" field="shapePadding"/></div>
                    <div className="panel-label"><InputText label="Inner Padding" title="Inner Padding" field="innerPadding"/></div>
                </PanelHeader>

                <PanelHeader title="Apply Filters to Sprites" label="Filters" groupName="filters" isShown={panelShowStates[makePanelId("filters")]} showHideContent={showHideContent}>
                    <div className="panel-label"><ToggleButton label="Clean Alpha" title="Clean Alpha" field="cleanAlpha" /></div>
                    <div className="panel-label"><ToggleButton label="ColorMask" title="Color Mask" field="colorMask" /></div>
                    <div className="panel-label"><ToggleButton label="Alias Sprites" title="Alias Sprites" field="aliasSprites" /></div>
                    <div className="panel-label"><ToggleButton label="Debug Mode" title="Debug Mode" field="debugMode" /></div>
                    <div className="panel-label"><ToggleButton label="Trim Sprites" title="Trim Sprites" field="trimSprites" /></div>
                    <div className="panel-label"><InputText label="Trim Threshold" title="Trim Threshold" field="trimThreshold" /></div>
                </PanelHeader>

                <PanelHeader title="Advenced Settings" label="Advanced" groupName="advanced" isShown={panelShowStates[makePanelId("advanced")]} showHideContent={showHideContent}>
                    <div className="panel-label"><ToggleButton label="Use GIF Frames" title="Extract Frames from Animated GIFs" field="extractFrames" /></div>
                    <div className="panel-label"><ToggleButton label="ZIP Project" title="Compress Project File" field="compressProject" /></div>
                </PanelHeader>

                <div className="panel-header">Test Scroll</div>

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
