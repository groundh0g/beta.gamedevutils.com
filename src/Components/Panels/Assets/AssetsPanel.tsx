import '../Panel.css';
import '../PanelAnimations.css';
import './AssetsPanel.css';
import {PanelVisibility} from "../_Types.ts";
import AssetsPanelMiniToolbar from "./AssetsPanelMiniToolbar.tsx";
import AssetsItem from "./AssetItem.tsx";
import {useSelector} from "react-redux";
import {ImageMap} from "../../../features/projectSlice.ts";
import {useState} from "react";

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

    const assets = useSelector(state => (state as any).project.assets as ImageMap);

    const [selectedAssets, setSelectedAssets] = useState([] as string[]);
    const selectToggle = (name: string) => {
        if(selectedAssets.includes(name)) {
            const newArray = selectedAssets.filter(asset => !asset.includes(name));
            setSelectedAssets(newArray);
        } else {
            const newArray = [] as string[];
            selectedAssets.map(value => newArray.push(value));
            setSelectedAssets(newArray);
        }
    };

    const assetsItems = [];
    for(const key in assets) {
        assetsItems.push(
            <AssetsItem
                name={`${key}`}
                selected={selectedAssets.includes(key)}
                selectToggle={selectToggle}
                dataUrl={assets[key]}
            />
        );
    }

    return (
        <div className={`panel panel-assets ${classPanel}`}>
            <div className="panel-header"><AssetsPanelMiniToolbar/></div>
            <div className="panel-content">
                <div className="panel-label instruction">Project assets are shown here.</div>
                { assetsItems }
            </div>
        </div>
    );
}
