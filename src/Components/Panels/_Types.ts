export type PanelVisibility = {
    isAssetsVisible: boolean,
    wasAssetsVisible: boolean,
    isConsoleVisible: boolean,
    wasConsoleVisible: boolean,
    isSettingsVisible: boolean,
    wasSettingsVisible: boolean,
    isAboutVisible: boolean,
    wasAboutVisible: boolean,
};

export const DefaultPanelVisibility: PanelVisibility = {
    isAssetsVisible: true,
    wasAssetsVisible: true,
    isConsoleVisible: false,
    wasConsoleVisible: false,
    isSettingsVisible: true,
    wasSettingsVisible: true,
    isAboutVisible: false,
    wasAboutVisible: false,
};