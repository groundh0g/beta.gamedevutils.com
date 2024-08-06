import './AssetsPanelMiniToolbar.css';
import NavBarButton from "../../NavBarButton.tsx";
import DialogDeleteImages from "./DialogDeleteImages.tsx";
import {useState} from "react";
import DialogAddImages from "./DialogAddImages.tsx";
// import {PanelVisibility} from "../_Types.ts";

export type AssetsPanelMiniToolbarProps = {
    selectAll: () => void,
    selectedAssets: string[],
    orderAsset: (name: string, isUp: boolean) => void,
};

export default function AssetsPanelMiniToolbar(props: AssetsPanelMiniToolbarProps) {
    const [isFileDialogShown, setIsFileDialogShown] = useState(false);
    const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
    // const [selectedAssets, setSelectedAssets] = useState([] as string[]);

    // if(selectedAssets.length === 0) {
    //     setSelectedAssets(["hello.png", "run-2.png"]);
    // }

    return (
        <>
            <DialogDeleteImages selected={props.selectedAssets} show={isDeleteDialogShown} onConfirm={() => {
                setIsDeleteDialogShown(false);
            }} onCancel={() => {
                setIsDeleteDialogShown(false);
            }}/>
            <DialogAddImages show={isFileDialogShown} onConfirm={() => {
                setIsFileDialogShown(false);
            }} onCancel={() => {
                setIsFileDialogShown(false);
            }}/>
            <div className="panel-assets-mini-toolbar">
                <span>
                    <NavBarButton title="Move Image(s) Up" icon="chevron-up" onClick={() => {
                        if(props.selectedAssets.length) {
                            props.orderAsset(props.selectedAssets[0], true);
                        }
                    }} />
                    <NavBarButton title="Move Image(s) Down" icon="chevron-down" onClick={() => {
                        if(props.selectedAssets.length) {
                            props.orderAsset(props.selectedAssets[0], false);
                        }
                    }} />
                    <NavBarButton title="Group Images" icon="object-group" onClick={() => {}} />
                </span>
                <span>Assets</span>
                <span>
                    <NavBarButton title="Add Image(s)" icon="plus" onClick={() => {
                        setIsFileDialogShown(true);
                    }} />
                    <NavBarButton title="Select/Deselect All Image(s)" icon="check-double" onClick={() => {
                        props.selectAll();
                    }} />
                    <NavBarButton title="Delete Image(s)" icon="trash-alt" onClick={() => {
                        setIsDeleteDialogShown(true);
                    }} />
                </span>
            </div>
        </>
    );
}
