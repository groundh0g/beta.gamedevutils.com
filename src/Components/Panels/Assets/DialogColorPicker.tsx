import './DialogColorPicker.css';
import {useDispatch, useSelector} from "react-redux";
import GUI from "../../../utils/UserInterface.ts";
import {THUMBNAIL_BACKGROUNDS} from "../../../features/_Constants.ts";

export type DialogColorPickerProps = {
    show: boolean,
    onConfirm: () => void,
    onCancel: () => void,
};

export default function DialogColorPicker(props: DialogColorPickerProps) {
    const dialog = document.querySelector(`#DialogColorPicker`) as HTMLDialogElement;
    const isShown = props.show;

    const dispatch = useDispatch();

    if(isShown) {
        dialog.showModal();
    }

    const selected = useSelector(state => (state as any).project.screen.thumbnailBackground as string);
    const options = THUMBNAIL_BACKGROUNDS.map((name) => {
            return (
                <div className={`color-palette-option color-palette__${name}`} key={`thumbnail-option___${name}`} onClick={() => {
                    GUI.SetThumbnailBackground(dispatch, name);
                    dialog.close();
                    props.onConfirm();
                }}><span>{name === selected ? "✓" : " "}</span></div>
            );
        });

    return (
        <dialog id="DialogColorPicker">
            <p>Select a background color for the assets panel thumbnails.</p>

            <div className="color-palette">
                {options}
            </div>

            <a className="link-button" href="#null" onClick={() => {
                dialog.close();
                props.onCancel();
            }}>Cancel</a>
        </dialog>
    );
}
