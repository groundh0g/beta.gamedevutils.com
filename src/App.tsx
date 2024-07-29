import './App.css'
import NavBar from './Components/NavBar';
import SettingsPanel from "./Components/Panels/SettingsPanel.tsx";
import AssetsPanel from "./Components/Panels/AssetsPanel.tsx";
import ConsolePanel from "./Components/Panels/ConsolePanel.tsx";
import AboutPanel from "./Components/Panels/AboutPanel.tsx";
import {DefaultPanelVisibility, PanelVisibility} from "./Components/Panels/_Types.ts";
import {useState} from "react";

import WorkspacePanel from "./Components/Panels/Workspace/WorkspacePanel.tsx";
import WorkspaceToolbar from "./Components/Panels/Workspace/WorkspaceToolbar.tsx";

export default function App() {
    const [panelVisibility, setPanelVisibility] = useState(DefaultPanelVisibility);

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
