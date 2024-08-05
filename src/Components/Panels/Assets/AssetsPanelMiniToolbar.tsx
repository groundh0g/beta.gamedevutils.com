import './AssetsPanelMiniToolbar.css';
import NavBarButton from "../../NavBarButton.tsx";
import DialogDeleteImages from "./DialogDeleteImages.tsx";
import {useState} from "react";
import DialogAddImages from "./DialogAddImages.tsx";

export default function AssetsPanelMiniToolbar() {
    const [isFileDialogShown, setIsFileDialogShown] = useState(false);
    const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
    const [selectedAssets, setSelectedAssets] = useState([] as string[]);

    if(selectedAssets.length === 0) {
        setSelectedAssets(["hello.png", "run-2.png"]);
    }

    return (
        <>
            <DialogDeleteImages selected={selectedAssets} show={isDeleteDialogShown} onConfirm={() => {
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
                    <NavBarButton title="Move Image(s) Up" icon="chevron-up" onClick={() => {}} />
                    <NavBarButton title="Move Image(s) Down" icon="chevron-down" onClick={() => {}} />
                    <NavBarButton title="Group Images" icon="object-group" onClick={() => {}} />
                </span>
                <span>Assets</span>
                <span>
                    <NavBarButton title="Add Image(s)" icon="plus" onClick={() => {
                        setIsFileDialogShown(true);
                    }} />
                    <NavBarButton title="Select/Deselect All Image(s)" icon="check-double" onClick={() => {}} />
                    <NavBarButton title="Delete Image(s)" icon="trash-alt" onClick={() => {
                        setIsDeleteDialogShown(true);
                    }} />
                </span>
            </div>
        </>
    );
}
