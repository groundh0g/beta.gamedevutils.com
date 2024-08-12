import './App.css'
import NavBar from './Components/NavBar';
import SettingsPanel from "./Components/Panels/SettingsPanel.tsx";
import AssetsPanel from "./Components/Panels/Assets/AssetsPanel.tsx";
import ConsolePanel from "./Components/Panels/ConsolePanel.tsx";
import AboutPanel from "./Components/Panels/AboutPanel.tsx";
import {DefaultPanelVisibility, PanelVisibility} from "./Components/Panels/_Types.ts";
import {Dispatch, useState} from "react";

import WorkspacePanel from "./Components/Panels/Workspace/WorkspacePanel.tsx";
import WorkspaceToolbar from "./Components/Panels/Workspace/WorkspaceToolbar.tsx";
import Console from "./utils/Console.ts";
import {useDispatch} from "react-redux";
import TourNavBar from "./Tutorials/TourNavBar.tsx";
import GUI from "./utils/UserInterface.ts";
import {UnknownAction} from "@reduxjs/toolkit";

export const Logged = [""];
const BeginApp = Date.now();

// ----------------------------
// TODO: remove this demo logic
// ----------------------------
let dispatch: Dispatch<UnknownAction>;
let counter = 0;
setInterval(() => {
    if(dispatch) {
        GUI.SetProgress(dispatch, counter);
        counter += 0.1;
        if (counter > 1.1) counter = -0.1;
    }
}, 500);
// ----------------------------
// ----------------------------

export default function App() {
    const [panelVisibility, setPanelVisibility] = useState(DefaultPanelVisibility);
    dispatch = useDispatch();

    const setWasPanelVisible = (panelVisibility: PanelVisibility) => {
        panelVisibility.wasAssetsVisible = panelVisibility.isAssetsVisible;
        panelVisibility.wasConsoleVisible = panelVisibility.isConsoleVisible;
        panelVisibility.wasSettingsVisible = panelVisibility.isSettingsVisible;
        panelVisibility.wasAboutVisible = panelVisibility.isAboutVisible;
        panelVisibility.wasTourVisible = panelVisibility.isTourVisible;
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

    const toggleTourOverlay = () => {
        const newPanelVisibility = Object.assign({}, panelVisibility);
        setWasPanelVisible(newPanelVisibility);
        newPanelVisibility.isTourVisible = !panelVisibility.isTourVisible;
        setPanelVisibility(newPanelVisibility);
    };

    if(Logged.indexOf("AppLaunch") < 0) {
        Console.Log(dispatch, "Starting application ...");
        Console.Log(dispatch, "GameDevUtils.com");
        Console.Log(dispatch, "Spritesheet Designer, v0.3.0");
        Console.Log(dispatch, `Loaded in ${(Date.now() - BeginApp) / 1000.0} seconds.`);
        // Console.Error(dispatch, "Yes, we have no bananas!");
        // Console.Error(dispatch, "This is a longer message. I just wanted to see if the CSS will allow it to wrap as expected.");
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
                toggleTourOverlay={toggleTourOverlay}
            ></NavBar>
            <SettingsPanel panelVisibility={panelVisibility}/>
            <AboutPanel panelVisibility={panelVisibility}/>
            <AssetsPanel panelVisibility={panelVisibility}/>
            <ConsolePanel panelVisibility={panelVisibility}/>
            <WorkspaceToolbar panelVisibility={panelVisibility}/>
            <WorkspacePanel panelVisibility={panelVisibility}/>
            <TourNavBar panelVisibility={panelVisibility} toggleTourOverlay={toggleTourOverlay} stepMax={12} />
        </>
    )
}
