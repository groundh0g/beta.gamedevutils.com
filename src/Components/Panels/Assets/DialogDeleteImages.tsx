import './DialogDeleteImages.css';

export type DialogDeleteImagesProps = {
    selected: string[],
    show: boolean,
    onConfirm: (value: string[]) => void,
    onCancel: () => void,
};



export default function DialogDeleteImages(props: DialogDeleteImagesProps) {
    const dialog = document.querySelector(`#DialogDeleteImages`) as HTMLDialogElement;
    const assets = props.selected;
    const isShown = props.show && assets.length;

    if(isShown) {
        dialog.showModal();
    }

    return (
        <dialog id="DialogDeleteImages">
            <p>You are deleting {assets.length} asset{assets.length === 1 ? "" : "s"} from the project.</p>
            <p>Are you sure you want to do this?</p>
            <a className="link-button" href="#null" onClick={() => {
                dialog.close();
                props.onCancel();
            }}>Cancel</a>
            <a className="link-button primary" href="#null" onClick={() => {
                dialog.close(assets.join("|"));
                props.onConfirm(assets);
            }}>Confirm</a>
        </dialog>
    );
}
