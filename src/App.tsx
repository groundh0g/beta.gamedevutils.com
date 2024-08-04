import './App.css'
import NavBar from './Components/NavBar';
import SettingsPanel from "./Components/Panels/SettingsPanel.tsx";
import AssetsPanel from "./Components/Panels/Assets/AssetsPanel.tsx";
import ConsolePanel from "./Components/Panels/ConsolePanel.tsx";
import AboutPanel from "./Components/Panels/AboutPanel.tsx";
import {DefaultPanelVisibility, PanelVisibility} from "./Components/Panels/_Types.ts";
import {useState} from "react";

import WorkspacePanel from "./Components/Panels/Workspace/WorkspacePanel.tsx";
import WorkspaceToolbar from "./Components/Panels/Workspace/WorkspaceToolbar.tsx";
import Console from "./utils/Console.ts";
import {useDispatch} from "react-redux";

export const Logged = [""];
const BeginApp = Date.now();

export default function App() {
    const [panelVisibility, setPanelVisibility] = useState(DefaultPanelVisibility);
    const dispatch = useDispatch();

    const setWasPanelVisible = (panelVisibility: PanelVisibility) => {
        panelVisibility.wasAssetsVisible = panelVisibility.isAssetsVisible;
        panelVisibility.wasConsoleVisible = panelVisibility.isConsoleVisible;
        panelVisibility.wasSettingsVisible = panelVisibility.isSettingsVisible;
        panelVisibility.wasAboutVisible = panelVisibility.isAboutVisible;
    }

    const toggleAssetsPanel = () => {
        const newPanelVisibility = Object.assign({}, panelVisibility);
        setWasPanelVisible(newPanelVisibility);
        newPanelVisibility.isAssetsVisible = !panelVisibility.isAssetsVisible;
        setPanelVisibility(newPanelVisibility);
    };

    const toggleConsolePanel = () => {
        const newPanelVisibility = Object.assign({}, panelVisibility);
        setWasPanelVisible(newPanelVisibility);
        newPanelVisibility.isConsoleVisible = !panelVisibility.isConsoleVisible;
        setPanelVisibility(newPanelVisibility);
    };

    const toggleSettingsPanel = () => {
        const newPanelVisibility = Object.assign({}, panelVisibility);
        setWasPanelVisible(newPanelVisibility);
        newPanelVisibility.isSettingsVisible = !panelVisibility.isSettingsVisible;
        setPanelVisibility(newPanelVisibility);
    };

    const toggleAboutPanel = () => {
        const newPanelVisibility = Object.assign({}, panelVisibility);
        setWasPanelVisible(newPanelVisibility);
        newPanelVisibility.isAboutVisible = !panelVisibility.isAboutVisible;
        setPanelVisibility(newPanelVisibility);
    };

    if(Logged.indexOf("AppLaunch") < 0) {
        Console.Log(dispatch, "Starting application ...");
        Console.Log(dispatch, "GameDevUtils.com");
        Console.Log(dispatch, "Spritesheet Designer, v0.3.0");
        Console.Log(dispatch, `Loaded in ${(Date.now() - BeginApp) / 1000.0} seconds.`);
        Console.Error(dispatch, "Yes, we have no bananas!");
        Console.Error(dispatch, "This is a longer message. I just wanted to see if the CSS will allow it to wrap as expected.");
        Logged.push("AppLaunch");
    }

    return (
        <>
            <NavBar
                panelVisibility={panelVisibility}
                toggleAssetsPanel={toggleAssetsPanel}
                toggleConsolePanel={toggleConsolePanel}
                toggleSettingsPanel={toggleSettingsPanel}
                toggleAboutPanel={toggleAboutPanel}
            ></NavBar>
            <SettingsPanel panelVisibility={panelVisibility}/>
            <AboutPanel panelVisibility={panelVisibility}/>
            <AssetsPanel panelVisibility={panelVisibility}/>
            <ConsolePanel panelVisibility={panelVisibility}/>
            <WorkspaceToolbar panelVisibility={panelVisibility}/>
            <WorkspacePanel panelVisibility={panelVisibility}/>
        </>
    )
}
