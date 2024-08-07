import '../Panel.css';
import '../PanelAnimations.css';
import './AssetsPanel.css';
import {PanelVisibility} from "../_Types.ts";
import AssetsPanelMiniToolbar from "./AssetsPanelMiniToolbar.tsx";
import AssetsItem from "./AssetItem.tsx";
import {useDispatch, useSelector} from "react-redux";
import {ImageMap, swapAssets} from "../../../features/projectSlice.ts";
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
    const dispatch = useDispatch();

    const [selectedAssets, setSelectedAssets] = useState([] as string[]);
    const selectToggle = (name: string) => {
        if(selectedAssets.includes(name)) {
            const newArray = selectedAssets.filter(asset => !asset.includes(name));
            setSelectedAssets(newArray);
        } else {
            const newArray = [] as string[];
            selectedAssets.map(value => {
                if(value !== name) newArray.push(value);
            });
            newArray.push(name);
            setSelectedAssets(newArray);
        }
    };

    const selectAll = (deselect?: boolean) => {
        const keys: string[] = Object.keys(assets);
        if(deselect) {
            setSelectedAssets([]);
        } else if(selectedAssets.length < Object.keys(assets).length) {
            setSelectedAssets(keys.map(value => value));
        } else {
            setSelectedAssets([]);
        }
    };

    const orderAsset = (name: string, isUp: boolean) => {
        isUp = !isUp;
        console.log(name, isUp);
        const newAssets = Object.assign({}, assets);
        if(selectedAssets.includes(name)) {
            const keys = Object.keys(assets);
            if(isUp) {
                const targetAsset = Object.assign({}, newAssets[name]);
                const targetIndex = targetAsset.ordinal;
                if(targetIndex < Object.keys(newAssets).length - 1) {
                    const destAssetKey = keys.filter(key => newAssets[key].ordinal === targetAsset.ordinal + 1);
                    dispatch(swapAssets(`${name}|${destAssetKey[0]}`));
                }
            } else {
                const targetAsset = Object.assign({}, assets[name]);
                const targetIndex = targetAsset.ordinal;
                if(targetIndex > 0) {
                    const destAssetKey = keys.filter(key => newAssets[key].ordinal === targetAsset.ordinal - 1);
                    dispatch(swapAssets(`${name}|${destAssetKey[0]}`));
                }
            }
        }
    }

    const assetsItems = [];
    const sortedKeys = Object.keys(assets).sort((a: string, b: string) => {
        const ordinalA = assets[a].ordinal;
        const ordinalB = assets[b].ordinal;
        return ordinalA < ordinalB ? -1 : (ordinalA > ordinalB ? 1 : (a < b ? -1 : (a > b ? 1 : 0)));
    });
    for(const key of sortedKeys) {
        assetsItems.push(
            <AssetsItem
                name={key}
                key={key}
                selected={selectedAssets.includes(key)}
                selectToggle={selectToggle}
                dataUrl={assets[key].origUrl}
            />
        );
    }

    return (
        <div className={`panel panel-assets ${classPanel}`}>
            <div className="panel-header"><AssetsPanelMiniToolbar selectedAssets={selectedAssets} selectAll={selectAll} orderAsset={orderAsset} /></div>
            <div className="panel-content">
                <div className="panel-label instruction">Project assets are shown here.</div>
                { assetsItems }
            </div>
        </div>
    );
}
