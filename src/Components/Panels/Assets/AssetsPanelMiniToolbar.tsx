import './AssetsPanelMiniToolbar.css';
import NavBarButton from "../../NavBarButton.tsx";
import DialogDeleteImages from "./DialogDeleteImages.tsx";
import {useState} from "react";
import DialogAddImages from "./DialogAddImages.tsx";
import {removeImages} from "../../../features/appSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {ImageMap} from "../../../features/_Types.ts";

export type AssetsPanelMiniToolbarProps = {
    selectAll: (deselect?: boolean) => void,
    selectedAssets: string[],
    orderAsset: (name: string, isUp: boolean) => void,
};

export default function AssetsPanelMiniToolbar(props: AssetsPanelMiniToolbarProps) {
    const [isFileDialogShown, setIsFileDialogShown] = useState(false);
    const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false);
    // const [selectedAssets, setSelectedAssets] = useState([] as string[]);

    const assets = useSelector(state => (state as any).project.assets as ImageMap);
    const keys = Object.keys(assets);
    const dispatch = useDispatch();

    const isUpDisabled =
        props.selectedAssets.length !== 1 ||
        keys.length < 2 ||
        assets[props.selectedAssets[0]].ordinal == 0;
    const isDownDisabled =
        props.selectedAssets.length !== 1 ||
        keys.length < 2 ||
        assets[props.selectedAssets[0]].ordinal == keys.length - 1;

    return (
        <>
            <DialogDeleteImages selected={props.selectedAssets} show={isDeleteDialogShown} onConfirm={() => {
                dispatch(removeImages(props.selectedAssets.join("|")));
                props.selectAll(true);
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
                    <NavBarButton
                        title="Move Image(s) Up"
                        icon="chevron-up"
                        isDisabled={isUpDisabled}
                        onClick={() => {
                            if(props.selectedAssets.length) {
                                props.orderAsset(props.selectedAssets[0], true);
                            }
                    }} />
                    <NavBarButton
                        title="Move Image(s) Down"
                        icon="chevron-down"
                        isDisabled={isDownDisabled}
                        onClick={() => {
                            if(props.selectedAssets.length) {
                                props.orderAsset(props.selectedAssets[0], false);
                            }
                    }} />
                    <NavBarButton title="Group Images" icon="object-group" isDisabled={true} onClick={() => {}} />
                </span>
                <span>Assets</span>
                <span>
                    <NavBarButton title="Add Image(s)" icon="plus" onClick={() => {
                        setIsFileDialogShown(true);
                    }} />
                    <NavBarButton title="Select/Deselect All Image(s)" icon="check-double" onClick={() => {
                        props.selectAll();
                    }} />
                    <NavBarButton
                        title="Delete Image(s)"
                        icon="trash-alt"
                        isDisabled={props.selectedAssets.length < 1}
                        onClick={() => {
                            setIsDeleteDialogShown(true);
                    }} />
                </span>
            </div>
        </>
    );
}
